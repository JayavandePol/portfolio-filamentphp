#!/bin/sh

cd /var/www/html

# Ensure vendor exists
if [ ! -d "vendor" ]; then
    echo "Vendor directory not found. Installing dependencies..."
    composer install --no-dev --optimize-autoloader
fi

# Ensure assets are built (basic check)
if [ ! -d "public/build" ]; then
    echo "Build directory not found. Building assets..."
    npm ci
    npm run build
fi

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Setup storage link
php artisan storage:link

# Cache optimization
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Starting PHP-FPM..."
php-fpm
