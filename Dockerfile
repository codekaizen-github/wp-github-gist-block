FROM php:8.2 AS build
ARG PLUGIN_SLUG
ARG NODE_VERSION=22

RUN apt-get update && apt-get install -y curl unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Download and install fnm:
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir "$HOME/.fnm" \
	&& cp "$HOME/.fnm/fnm" /usr/bin && fnm install $NODE_VERSION \
	&& echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> "$HOME/.bashrc"

COPY . /${PLUGIN_SLUG}
WORKDIR /${PLUGIN_SLUG}

# Run this command but with fnm loaded into context
RUN bash -c "source \"$HOME/.bashrc\" && fnm use $NODE_VERSION && composer install --no-dev --no-interaction --optimize-autoloader"

FROM build AS compress
ARG PLUGIN_SLUG

# Use zip instead and have the root be the repository root
RUN apt-get update && apt-get install -y zip
RUN cd / && zip -r /${PLUGIN_SLUG}.zip ${PLUGIN_SLUG}

FROM alpine:latest AS archive
ARG PLUGIN_SLUG

COPY --from=compress /${PLUGIN_SLUG}.zip /${PLUGIN_SLUG}.zip

