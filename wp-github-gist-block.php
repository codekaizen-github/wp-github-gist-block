<?php

/**
 * Plugin Name:       WP GitHub Gist Block
 * Description:       Embed GitHub Gists with syntax highlighting in WordPress.
 * Version:           0.1.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            CodeKaizen
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-github-gist-block
 * Update URI:        https://wp-plugin-registry.codekaizen.net/api/v1/ghcr.io/codekaizen-github/wp-github-gist-block/latest/
 *
 * @package CodeKaizen\WPGithubGistBlock
 */

add_action('admin_init', function () {
	// Check if user is on the Plugins page AND 'test' param is present
	if (
		isset($_GET['test']) &&
		$_GET['test'] == '1' &&
		isset($_GET['page']) === false && // not a subpage
		strpos($_SERVER['REQUEST_URI'], 'plugins.php') !== false &&
		current_user_can('update_plugins')
	) {
		// Delete the cached plugin update data
		delete_site_transient('update_plugins');

		// Force recheck by calling the update API
		if (function_exists('wp_update_plugins')) {
			wp_update_plugins();
		}

		// Optional: admin notice
		add_action('admin_notices', function () {
			echo '<div class="notice notice-success is-dismissible"><p>Plugin updates rechecked.</p></div>';
		});
	}
});


if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

// Define plugin constants
define('WP_GITHUB_GIST_BLOCK_PLUGIN_FILE', __FILE__);
define('WP_GITHUB_GIST_BLOCK_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('WP_GITHUB_GIST_BLOCK_PLUGIN_URL', plugin_dir_url(__FILE__));

// Require Composer autoloader if available
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
	require_once __DIR__ . '/vendor/autoload.php';
}
/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_wp_github_gist_block_block_init()
{
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if (function_exists('wp_register_block_types_from_metadata_collection')) {
		wp_register_block_types_from_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if (function_exists('wp_register_block_metadata_collection')) {
		wp_register_block_metadata_collection(__DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php');
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach (array_keys($manifest_data) as $block_type) {
		register_block_type(__DIR__ . "/build/{$block_type}");
	}
}
add_action('init', 'create_block_wp_github_gist_block_block_init');

add_action('init', function () {
	require_once('autoupdater.php');
	new Autoupdater(__FILE__);
});

// Initialize classes using namespaces
function wp_github_gist_block_init_classes()
{
	// Using namespaced classes from autoloader
	new \CodeKaizen\WPGithubGistBlock\AdminSettings();
	new \CodeKaizen\WPGithubGistBlock\Assets();
}
add_action('plugins_loaded', 'wp_github_gist_block_init_classes');
