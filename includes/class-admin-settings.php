<?php

/**
 * Admin Settings Class
 *
 * @package WpGithubGistBlock
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Admin Settings Class
 */
class WP_Github_Gist_Block_Admin_Settings
{
    /**
     * Option name for settings
     *
     * @var string
     */
    private $option_name = 'wp_github_gist_block_settings';

    /**
     * Initialize the class
     */
    public function __construct()
    {
        add_action('admin_menu', array($this, 'add_settings_page'));
        add_action('admin_init', array($this, 'register_settings'));
    }

    /**
     * Add settings page to admin menu
     */
    public function add_settings_page()
    {
        add_options_page(
            __('GitHub Gist Block Settings', 'wp-github-gist-block'),
            __('GitHub Gist Block', 'wp-github-gist-block'),
            'manage_options',
            'wp-github-gist-block-settings',
            array($this, 'render_settings_page')
        );
    }

    /**
     * Register settings
     */
    public function register_settings()
    {
        register_setting(
            'wp_github_gist_block_settings_group',
            $this->option_name,
            array($this, 'sanitize_settings')
        );

        add_settings_section(
            'wp_github_gist_block_main_section',
            __('Appearance Settings', 'wp-github-gist-block'),
            array($this, 'render_section_description'),
            'wp-github-gist-block-settings'
        );

        add_settings_field(
            'highlight_style',
            __('Syntax Highlighting Style', 'wp-github-gist-block'),
            array($this, 'render_style_dropdown'),
            'wp-github-gist-block-settings',
            'wp_github_gist_block_main_section'
        );
    }

    /**
     * Render section description
     */
    public function render_section_description()
    {
        echo '<p>' . esc_html__('Select the style for syntax highlighting in GitHub Gist blocks.', 'wp-github-gist-block') . '</p>';
    }

    /**
     * Get available stylesheet options
     *
     * @return array List of stylesheets
     */
    private function get_style_options()
    {
        $styles_dir = plugin_dir_path(dirname(__FILE__)) . 'vendor/scrivo/highlight.php/styles';
        $options = array();

        if (is_dir($styles_dir)) {
            $files = scandir($styles_dir);
            foreach ($files as $file) {
                if (pathinfo($file, PATHINFO_EXTENSION) === 'css') {
                    // Remove .css extension for display name
                    $display_name = str_replace('.css', '', $file);
                    // Convert dash to space and capitalize words for nicer display
                    $display_name = ucwords(str_replace('-', ' ', $display_name));
                    $options[$file] = $display_name;
                }
            }
            // Sort options alphabetically
            asort($options);
        }

        return $options;
    }

    /**
     * Render style dropdown field
     */
    public function render_style_dropdown()
    {
        $options = $this->get_style_options();
        $settings = get_option($this->option_name, array('highlight_style' => 'github.css'));
        $current_style = isset($settings['highlight_style']) ? $settings['highlight_style'] : 'github.css';

        echo '<select name="' . esc_attr($this->option_name) . '[highlight_style]">';

        // Add default option
        echo '<option value="">' . esc_html__('Select a style', 'wp-github-gist-block') . '</option>';

        foreach ($options as $file => $name) {
            echo '<option value="' . esc_attr($file) . '" ' . selected($current_style, $file, false) . '>' . esc_html($name) . '</option>';
        }

        echo '</select>';
        echo '<p class="description">' . esc_html__('Choose a style for syntax highlighting in code blocks.', 'wp-github-gist-block') . '</p>';
    }

    /**
     * Sanitize settings
     *
     * @param array $input Settings input.
     * @return array Sanitized settings.
     */
    public function sanitize_settings($input)
    {
        $sanitized_input = array();

        if (isset($input['highlight_style'])) {
            $sanitized_input['highlight_style'] = sanitize_text_field($input['highlight_style']);
        }

        return $sanitized_input;
    }

    /**
     * Render settings page
     */
    public function render_settings_page()
    {
?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('wp_github_gist_block_settings_group');
                do_settings_sections('wp-github-gist-block-settings');
                submit_button();
                ?>
            </form>
        </div>
<?php
    }

    /**
     * Get plugin settings
     *
     * @return array Plugin settings.
     */
    public static function get_settings()
    {
        return get_option('wp_github_gist_block_settings', array('highlight_style' => 'github.css'));
    }
}
