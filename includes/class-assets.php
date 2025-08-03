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
        add_action('enqueue_block_assets', array($this, 'enqueue_styles'));
    }

    /**
     * Check if current post contains the GitHub Gist block
     *
     * @return bool Whether the current post contains a GitHub Gist block
     */
    private function has_gist_block()
    {
        // Check if we're on a singular page
        if (!is_singular()) {
            return false;
        }

        // Get the current post
        $post = get_post();
        if (!$post) {
            return false;
        }

        // Look for the block in the content
        $block_name = 'create-block/wp-github-gist-block';

        // Check if the post uses the block editor
        if (use_block_editor_for_post($post)) {
            return has_block($block_name, $post->post_content);
        }

        return false;
    }

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
     * Enqueue styles for both frontend and editor
     */
    public function enqueue_styles()
    {
        // For frontend, only load if we have the block in the post
        if (!is_admin() && !$this->has_gist_block()) {
            return;
        }

        $style = $this->get_style_info();
        if ($style) {
            wp_enqueue_style(
                $style['handle'],
                $style['url'],
                array(),
                filemtime($style['path'])
            );
        }
    }
}
