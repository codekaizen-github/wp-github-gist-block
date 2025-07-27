
<?php
class Autoupdater
{
	/**
	 * The plugin current version
	 * @var string
	 */
	public $current_version;
	/**
	 * The plugin remote update path
	 * @var string
	 */
	public $update_path;
	/**
	 * Plugin Slug (plugin_directory/plugin_file.php)
	 * @var string
	 */
	public $plugin_slug;
	/**
	 * Plugin name (plugin_file)
	 * @var string
	 */
	public $slug;
	/**
	 * Initialize a new instance of the WordPress Auto-Update class
	 * @param string $plugin_file
	 * @param string $update_path
	 * @param string $plugin_slug
	 */
	function __construct($plugin_file)
	{
		if (! function_exists('get_plugin_data')) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugin_data = get_plugin_data($plugin_file);
		// Set the class public variables
		$this->current_version = isset($plugin_data['Version']) ? $plugin_data['Version'] : '1.0';
		$this->update_path = isset($plugin_data['UpdateURI']) ? $plugin_data['UpdateURI'] : '';
		$this->plugin_slug = plugin_basename(__FILE__);
		list($t1, $t2) = explode('/', $this->plugin_slug);
		$this->slug = str_replace('.php', '', $t2);
		// define the alternative API for updating checking
		add_filter('pre_set_site_transient_update_plugins', array(&$this, 'check_update'));
		// Define the alternative response for information checking
		add_filter('plugins_api', array(&$this, 'check_info'), 10, 3);
	}
	/**
	 * Add our self-hosted autoupdate plugin to the filter transient
	 *
	 * @param $transient
	 * @return object $ transient
	 */
	public function check_update($transient)
	{
		if (empty($transient->checked)) {
			return $transient;
		}
		$meta = $this->get_remote_metadata();
		$remote_version = isset($meta['version']) ? $meta['version'] : false;
		if ($remote_version && version_compare($this->current_version, $remote_version, '<')) {
			$obj = new stdClass();
			$obj->slug = $this->slug;
			$obj->new_version = $remote_version;
			$obj->url = $this->update_path;
			$obj->package = $this->update_path . '/download';
			$transient->response[$this->plugin_slug] = $obj;
		}
		return $transient;
	}
	/**
	 * Add our self-hosted description to the filter
	 *
	 * @param boolean $false
	 * @param array $action
	 * @param object $arg
	 * @return bool|object
	 */
	public function check_info($false, $action, $arg)
	{
		if ($arg->slug === $this->slug) {
			$meta = $this->get_remote_metadata();
			return $meta ? (object) $meta : false;
		}
		return false;
	}

	/**
	 * Fetch and cache remote plugin metadata from the update_path endpoint.
	 * @return array|false
	 */
	protected function get_remote_metadata()
	{
		static $cached = null;
		if ($cached !== null) {
			return $cached;
		}
		$request = wp_remote_get($this->update_path . '/manifest');
		if (is_wp_error($request) || wp_remote_retrieve_response_code($request) !== 200) {
			return false;
		}
		$body = wp_remote_retrieve_body($request);
		$json = json_decode($body, true);
		if (!is_array($json) || !isset($json['annotations']['org.codekaizen-github.wp-plugin-deploy-oras.wp-plugin-metadata'])) {
			return false;
		}
		$meta_json = $json['annotations']['org.codekaizen-github.wp-plugin-deploy-oras.wp-plugin-metadata'];
		$meta = json_decode($meta_json, true);
		if (!is_array($meta)) {
			return false;
		}
		$cached = $meta;
		return $meta;
	}
}
