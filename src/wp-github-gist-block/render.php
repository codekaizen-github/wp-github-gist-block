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

// Fetch the Gist CSS for this particular Gist
$gist_css_url = "https://gist.github.com/{$gist_id}.css";
$gist_css = @file_get_contents($gist_css_url);
if ($gist_css !== false): ?>
    <style>
        <?php echo $gist_css; ?>
    </style>
<?php endif; ?>

<div class="wp-github-gist-block-list">
    <?php foreach ($data['files'] as $filename => $file):
        $language = !empty($file['language']) ? esc_html($file['language']) : '';
        $content = !empty($file['content']) ? esc_html($file['content']) : '';
    ?>
        <div class="wp-github-gist-block-file">
            <div class="wp-github-gist-block-filename"><strong><?php echo esc_html($filename); ?></strong></div>
            <pre><code class="language-<?php echo strtolower($language); ?> gist"><?php echo $content; ?></code></pre>
        </div>
    <?php endforeach; ?>
</div>
