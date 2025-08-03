<?php

/**
 * Assets Class
 *
 * @package WpGithubGistBlock
 */

// Exit if accessed directly.
if (! defined('ABSPATH')) {
    exit;
}

/**
 * Assets Class
 */
class WP_Github_Gist_Block_Assets
{
    /**
     * Initialize the class
     */
    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
        add_action('enqueue_block_editor_assets', array($this, 'enqueue_styles'));
    }

    /**
     * Enqueue styles
     */
    public function enqueue_styles()
    {
        // Get settings
        $settings = WP_Github_Gist_Block_Admin_Settings::get_settings();

        // If highlight style is set, enqueue it
        if (! empty($settings['highlight_style'])) {
            $style_path = 'vendor/scrivo/highlight.php/styles/' . $settings['highlight_style'];
            $style_url = plugins_url($style_path, WP_GITHUB_GIST_BLOCK_PLUGIN_FILE);
            $style_path_full = plugin_dir_path(WP_GITHUB_GIST_BLOCK_PLUGIN_FILE) . $style_path;

            // Check if file exists before enqueueing
            if (file_exists($style_path_full)) {
                // Generate a handle with a prefix and sanitized filename
                $handle = 'wp-github-gist-block-' . sanitize_title($settings['highlight_style']);

                wp_enqueue_style(
                    $handle,
                    $style_url,
                    array(),
                    filemtime($style_path_full)
                );
            }
        }
    }
}
