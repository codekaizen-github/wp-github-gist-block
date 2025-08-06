<?php
/**
 * Fix strauss autoloader aliases
 * 
 * This script fixes the issue with duplicate namespaces in the autoloader aliases
 */

// Path to the autoloader aliases file
$aliasesFile = __DIR__ . '/vendor/composer/autoload_aliases.php';

// Check if the file exists
if (!file_exists($aliasesFile)) {
    echo "Autoloader aliases file not found at: $aliasesFile\n";
    exit(1);
}

// Read the content of the file
$content = file_get_contents($aliasesFile);

// Fix patterns for duplicate namespaces in extends
$patterns = [
    '/\'extends\' => \'CodeKaizen\\\\WPGitHubGistBlock\\\\Dependencies\\\\Highlight\\\\CodeKaizen\\\\WPGitHubGistBlock\\\\Dependencies\\\\([^\']+)\'/i',
    '/\'extends\' => \'CodeKaizen\\\\WPGitHubGistBlock\\\\Dependencies\\\\HighlightUtilities\\\\CodeKaizen\\\\WPGitHubGistBlock\\\\Dependencies\\\\([^\']+)\'/i',
];

$replacements = [
    '\'extends\' => \'CodeKaizen\\\\WPGitHubGistBlock\\\\Dependencies\\\\Highlight\\\\$1\'',
    '\'extends\' => \'CodeKaizen\\\\WPGitHubGistBlock\\\\Dependencies\\\\HighlightUtilities\\\\$1\'',
];

// Apply the fix
$fixedContent = preg_replace($patterns, $replacements, $content);

// Write the fixed content back to the file
file_put_contents($aliasesFile, $fixedContent);

echo "Autoloader aliases file has been fixed.\n";

// Now check if the current autoload_alias.php file is problematic and remove it
$aliasFile = __DIR__ . '/vendor/composer/autoload_alias.php';
if (file_exists($aliasFile)) {
    unlink($aliasFile);
    echo "Removed problematic autoload_alias.php file.\n";
}

echo "All fixes have been applied.\n";
