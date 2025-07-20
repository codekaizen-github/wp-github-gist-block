FROM php:8.2 AS build
ARG NODE_VERSION=22

RUN apt-get update && apt-get install -y curl unzip

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Download and install fnm:
RUN curl -fsSL https://fnm.vercel.app/install | bash -s -- --install-dir "$HOME/.fnm" \
	&& cp "$HOME/.fnm/fnm" /usr/bin && fnm install $NODE_VERSION \
	&& echo 'eval "$(fnm env --use-on-cd --shell bash)"' >> "$HOME/.bashrc"

COPY . /plugin
WORKDIR /plugin

# Run this command but with fnm loaded into context
RUN bash -c "source \"$HOME/.bashrc\" && fnm use $NODE_VERSION && composer install --no-dev --no-interaction --optimize-autoloader"

FROM build AS compress

# Use zip instead and have the root be the repository root
RUN apt-get update && apt-get install -y zip
RUN zip -r /plugin.zip .

FROM alpine:latest AS archive

COPY --from=compress /plugin.zip /plugin.zip

