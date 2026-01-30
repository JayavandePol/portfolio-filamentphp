FROM php:8.4-fpm-alpine

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

# Set working directory
WORKDIR /var/www/html

# --- BUILD STEP 1: Dependencies ---
# Copy composer files first to leverage cache
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# Copy node files
COPY package.json package-lock.json ./
RUN npm ci

# --- BUILD STEP 2: Application Code ---
# Copy the rest of the application
COPY . .

# Build assets
RUN npm run build

# Permissions and Directory Creation (MUST be before artisan commands)
RUN mkdir -p storage/framework/sessions \
    storage/framework/views \
    storage/framework/cache \
    bootstrap/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 storage bootstrap/cache

# Run composer post-autoload-dump (important for discovery)
RUN composer dump-autoload --optimize

# Copy startup script
COPY docker/run.sh /usr/local/bin/start-container
RUN sed -i 's/\r$//' /usr/local/bin/start-container && chmod +x /usr/local/bin/start-container

# Expose port
EXPOSE 9000

# Default command
CMD ["start-container"]
