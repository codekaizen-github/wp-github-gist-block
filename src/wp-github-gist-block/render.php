<?php
// Server-side render for WP GitHub Gist Block (fetches Gist content and CSS via GitHub API)
if (empty($attributes['gistId'])): ?>
    <div class="wp-github-gist-block-error">No Gist ID provided.</div>
<?php
    return;
endif;
$gist_id = esc_attr($attributes['gistId']);
$api_url = "https://api.github.com/gists/{$gist_id}";

// Set up a stream context with a user agent (GitHub API requires it)
$context = stream_context_create([
    'http' => [
        'header' => "User-Agent: WP-GitHub-Gist-Block\r\nAccept: application/vnd.github.v3+json\r\n"
    ]
]);

$response = @file_get_contents($api_url, false, $context);
if ($response === false): ?>
    <div class="wp-github-gist-block-error">Could not fetch Gist from GitHub API.</div>
<?php
    return;
endif;
$data = json_decode($response, true);
if (empty($data['files'])): ?>
    <div class="wp-github-gist-block-error">No files found in this Gist.</div>
<?php
    return;
endif;
?>
<?php
// Instantiate the Highlighter.
$hl = new \CodeKaizen\WPGitHubGistBlock\Highlight\Highlighter();
?>
<div class="wp-github-gist-block-list">
    <a href="<?php echo $data['html_url'] ?? ''; ?>"><?php echo $data['description'] ?? ''; ?></a>
    <?php foreach ($data['files'] as $filename => $file):
        $content = !empty($file['content']) ? $file['content'] : '';
        $language = !empty($file['language']) ? esc_html($file['language']) : '';
        $language_to_lower = strtolower($language);
        $content_highlighted = $hl->highlight($language_to_lower, $content);
        error_log("Here is my unhighlighted content: " . $content);
        error_log("Here is my content: " . $content_highlighted->value);
    ?>
        <div class="wp-github-gist-block-file">
            <div class="wp-github-gist-block-filename"><strong><?php echo esc_html($filename); ?></strong></div>
            <pre><code class="language-<?php echo $language_to_lower; ?> gist"><?php echo $content_highlighted->value; ?></code></pre>
        </div>
    <?php endforeach; ?>
</div>
