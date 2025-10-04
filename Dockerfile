# syntax=docker/dockerfile:1.7-labs
FROM php:8.2 AS dependencies
ARG NODE_VERSION=22
RUN apt-get update && apt-get install -y curl unzip
# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
# Download and install fnm:
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir "$HOME/.fnm" \
	&& cp "$HOME/.fnm/fnm" /usr/bin
RUN fnm install $NODE_VERSION \
	&& echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> "$HOME/.bashrc"

FROM dependencies AS build
ARG NODE_VERSION=22
COPY . /workspace
WORKDIR /workspace
# Run this command but with fnm loaded into context
RUN bash -c "source \"$HOME/.bashrc\" && fnm use $NODE_VERSION && npm ci && npm run build && composer install --no-dev --no-interaction --optimize-autoloader"

FROM ghcr.io/codekaizen-github/wp-package-deploy-oras AS deploy
# Remove .git, node_modules, ts, and src
COPY \
	--from=build \
	--exclude=.git \
	--exclude=node_modules \
	--exclude=ts \
	--exclude=src \
	--exclude=strauss.phar \
	--exclude=Dockerfile \
	--exclude=tsconfig.json \
	--exclude=package.json \
	--exclude=package-lock.json \
	--exclude=composer.json \
	--exclude=composer.lock \
	--exclude=webpack.config.js \
	/workspace /package

FROM dependencies AS dev
ARG NODE_VERSION=22

USER root

RUN apt-get update && apt-get install -y \
	git \
	vim \
	less \
	sudo \
	default-mysql-client \
	&& rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install mysqli pdo pdo_mysql

# Install WP CLI
RUN curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
	&& php wp-cli.phar --info \
	&& chmod +x wp-cli.phar \
	&& mv wp-cli.phar /usr/local/bin/wp

# Give www-data a log in shell and make a sudoer
RUN chsh -s /bin/bash www-data \
	&& mkdir -p /etc/sudoers.d \
	&& echo "www-data ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/www-data \
	&& chmod 0440 /etc/sudoers.d/www-data \
	&& sudo mkdir -p /home/www-data \
	&& sudo chown www-data:www-data /home/www-data \
	&& sudo chmod 755 /home/www-data \
	&& sudo usermod -d /home/www-data www-data

USER www-data

RUN fnm install $NODE_VERSION && echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> "$HOME/.bashrc"

