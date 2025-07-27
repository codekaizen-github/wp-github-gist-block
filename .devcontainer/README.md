# WordPress Development Environment with DevContainer

This setup provides a local WordPress development environment using VS Code's DevContainer feature.

## Features

- Complete WordPress environment with MariaDB
- Development plugin directory mounted at `/wp-content/plugins/wp-github-gist-block`
- PHPMyAdmin for database management
- WP-CLI for WordPress command-line operations
- PHP development extensions for VS Code

## Getting Started

1. Install [Docker](https://www.docker.com/products/docker-desktop) and [VS Code](https://code.visualstudio.com/)
2. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension in VS Code
3. Open this folder in VS Code
4. When prompted, click "Reopen in Container" or run the "Remote-Containers: Reopen in Container" command
5. Wait for the container to build and WordPress to initialize

## Accessing the Environment

- WordPress site: http://localhost:8080
- PHPMyAdmin: http://localhost:8081
  - Username: `wordpress`
  - Password: `wordpress`

## WordPress Admin

- URL: http://localhost:8080/wp-admin
- Username: `admin`
- Password: `password`

## Using WP-CLI

You can run WP-CLI commands using the wp-cli service:

```bash
docker-compose exec wp-cli wp <command>
```

Example:

```bash
docker-compose exec wp-cli wp plugin list
```

## Development Workflow

1. The plugin files are mounted from your host machine, so any changes you make will be immediately reflected in the WordPress environment.
2. You can develop and test your plugin in a real WordPress environment without needing to manually set up WordPress locally.

## Notes

- The WordPress and database data is stored in Docker volumes, so it persists between container restarts.
- If you need to reset the environment, you can delete the volumes and restart the container.
