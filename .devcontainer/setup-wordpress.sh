#!/bin/bash

# This script runs after the container is created to set up WordPress
# It activates the plugin and configures basic WordPress settings

# Wait for WordPress to be ready
echo "Waiting for WordPress to be ready..."
sleep 10

# Install WordPress
wp core install --url=http://localhost:8080 --title="WordPress Development Site" --admin_user=admin --admin_password=password --admin_email=admin@example.com --allow-root

# Update permalink structure
wp option update permalink_structure '/%postname%/' --allow-root

# Activate the plugin
wp plugin activate wp-github-gist-block --allow-root

# Create a test page with the block (optional)
wp post create --post_type=page --post_title="Test Gist Block" --post_status=publish --allow-root

echo "WordPress setup completed!"
