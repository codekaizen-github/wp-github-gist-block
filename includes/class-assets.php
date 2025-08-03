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
        add_action('init', array($this, 'register_block_styles'));
    }

    // The has_gist_block() method is no longer needed with wp_enqueue_block_style
    // as WordPress will automatically handle loading styles only when the block is used

    /**
     * Get the stylesheet URL and path for the selected highlight style
     *
     * @return array|false Style information or false if not available
     */
    private function get_style_info()
    {
        // Get settings
        $settings = WP_Github_Gist_Block_Admin_Settings::get_settings();

        // If highlight style is not set, return false
        if (empty($settings['highlight_style'])) {
            return false;
        }

        $style_path = 'vendor/scrivo/highlight.php/styles/' . $settings['highlight_style'];
        $style_url = plugins_url($style_path, WP_GITHUB_GIST_BLOCK_PLUGIN_FILE);
        $style_path_full = plugin_dir_path(WP_GITHUB_GIST_BLOCK_PLUGIN_FILE) . $style_path;

        // If the file doesn't exist, return false
        if (!file_exists($style_path_full)) {
            return false;
        }

        // Generate a handle with a prefix and sanitized filename
        $handle = 'wp-github-gist-block-' . sanitize_title($settings['highlight_style']);

        return [
            'handle' => $handle,
            'url' => $style_url,
            'path' => $style_path_full
        ];
    }

    /**
     * Register block styles using wp_enqueue_block_style
     */
    public function register_block_styles()
    {
        $style = $this->get_style_info();
        if (!$style) {
            return;
        }

        // Register the style for our block
        $block_name = 'create-block/wp-github-gist-block';

        // Using wp_enqueue_block_style to register style specifically for this block
        // This function automatically handles loading styles only when the block is used
        wp_enqueue_block_style(
            $block_name,
            array(
                'handle' => $style['handle'],
                'src'    => $style['url'],
                'path'   => $style['path'],
                'ver'    => filemtime($style['path']),
            )
        );
    }
}
