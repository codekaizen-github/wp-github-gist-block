FROM php:8.2 AS build
ARG PACKAGE_SLUG
ARG NODE_VERSION=22

RUN apt-get update && apt-get install -y curl unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Download and install fnm:
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir "$HOME/.fnm" \
	&& cp "$HOME/.fnm/fnm" /usr/bin && fnm install $NODE_VERSION \
	&& echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> "$HOME/.bashrc"

COPY . /${PACKAGE_SLUG}
WORKDIR /${PACKAGE_SLUG}

# Run this command but with fnm loaded into context
RUN bash -c "source \"$HOME/.bashrc\" && fnm use $NODE_VERSION && composer install --no-dev --no-interaction --optimize-autoloader"

FROM build AS compress
ARG PACKAGE_SLUG

# Use zip instead and have the root be the repository root
RUN apt-get update && apt-get install -y zip
RUN cd / && zip -r /${PACKAGE_SLUG}.zip ${PACKAGE_SLUG}

FROM alpine:latest AS archive
ARG PACKAGE_SLUG

COPY --from=compress /${PACKAGE_SLUG}.zip /${PACKAGE_SLUG}.zip

