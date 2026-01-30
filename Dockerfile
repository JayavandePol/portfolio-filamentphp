FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev \
    postgresql-dev \
    icu-dev \
    nodejs \
    npm

# Install PHP extensions
RUN docker-php-ext-configure intl \
    && docker-php-ext-install \
    pd_pgsql \
    pgsql \
    pdo \
    pdo_pgsql \
    bcmath \
    gd \
    intl \
    zip \
    opcache

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy startup script
COPY docker/run.sh /usr/local/bin/start-container
RUN sed -i 's/\r$//' /usr/local/bin/start-container && chmod +x /usr/local/bin/start-container

# Set working directory
WORKDIR /var/www/html

# Expose port
EXPOSE 9000

# Default command
CMD ["start-container"]
