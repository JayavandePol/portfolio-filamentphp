#!/bin/sh

cd /var/www/html

# Run migrations
echo "Running migrations..."
php artisan migrate --force

# Storage link
echo "Creating storage link..."
php artisan storage:link

# Cache optimization (runtime)
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

echo "Starting PHP-FPM..."
php-fpm
