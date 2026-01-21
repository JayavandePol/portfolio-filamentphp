# Dockploy Docker Compose Setup Guide

This guide explains how to deploy this Laravel application on Dockploy using Docker Compose.

## Prerequisites

- Dockploy instance running
- Domain name configured (optional but recommended)
- Git repository access

## Project Structure

This is a Laravel 12 application with:
- **Backend**: Laravel 12 with PHP 8.2+
- **Frontend**: Inertia.js + Vite
- **Admin Panel**: Filament 4.0
- **Database**: SQLite (default) or MySQL/PostgreSQL

## Docker Compose Configuration

Create a `docker-compose.yml` file in your project root:

```yaml
version: '3.8'

services:
  app:
    image: php:8.3-fpm-alpine
    container_name: jayavandepol-app
    working_dir: /var/www/html
    volumes:
      - .:/var/www/html
      - ./storage:/var/www/html/storage
      - ./bootstrap/cache:/var/www/html/bootstrap/cache
    environment:
      - APP_ENV=${APP_ENV:-production}
      - APP_DEBUG=${APP_DEBUG:-false}
      - APP_KEY=${APP_KEY}
      - DB_CONNECTION=${DB_CONNECTION:-sqlite}
      - DB_DATABASE=/var/www/html/database/database.sqlite
    networks:
      - app-network
    command: >
      sh -c "
        apk add --no-cache nodejs npm git unzip libpng-dev libzip-dev &&
        docker-php-ext-install pdo pdo_mysql gd zip &&
        curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer &&
        composer install --no-dev --optimize-autoloader &&
        npm ci &&
        npm run build &&
        php artisan config:cache &&
        php artisan route:cache &&
        php artisan view:cache &&
        php artisan migrate --force &&
        php artisan storage:link &&
        php-fpm
      "

  nginx:
    image: nginx:alpine
    container_name: jayavandepol-nginx
    ports:
      - "${PORT:-80}:80"
    volumes:
      - .:/var/www/html
      - ./docker/nginx/nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app
    networks:
      - app-network

  # Optional: MySQL Database (uncomment if not using SQLite)
  # mysql:
  #   image: mysql:8.0
  #   container_name: jayavandepol-mysql
  #   environment:
  #     MYSQL_DATABASE: ${DB_DATABASE:-laravel}
  #     MYSQL_ROOT_PASSWORD: ${DB_PASSWORD:-secret}
  #     MYSQL_USER: ${DB_USERNAME:-laravel}
  #     MYSQL_PASSWORD: ${DB_PASSWORD:-secret}
  #   volumes:
  #     - mysql-data:/var/lib/mysql
  #   networks:
  #     - app-network

networks:
  app-network:
    driver: bridge

# volumes:
#   mysql-data:
```

## Nginx Configuration

Create `docker/nginx/nginx.conf`:

```nginx
server {
    listen 80;
    server_name _;
    root /var/www/html/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass app:9000;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Dockerfile (Alternative Approach)

If you prefer a single Dockerfile approach, create this `Dockerfile`:

```dockerfile
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    nginx \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql gd zip

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction
RUN npm ci && npm run build

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Copy nginx config
COPY docker/nginx/nginx.conf /etc/nginx/http.d/default.conf

# Copy supervisor config
COPY docker/supervisor/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
```

Create `docker/supervisor/supervisord.conf`:

```ini
[supervisord]
nodaemon=true
user=root
logfile=/var/log/supervisor/supervisord.log
pidfile=/var/run/supervisord.pid

[program:php-fpm]
command=php-fpm -F
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true

[program:nginx]
command=nginx -g 'daemon off;'
stdout_logfile=/dev/stdout
stdout_logfile_maxbytes=0
stderr_logfile=/dev/stderr
stderr_logfile_maxbytes=0
autorestart=true
```

## Environment Variables for Dockploy

Configure these environment variables in your Dockploy project settings:

```env
APP_NAME="Jaya van de Pol"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=sqlite
# Or for MySQL:
# DB_CONNECTION=mysql
# DB_HOST=mysql
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=laravel
# DB_PASSWORD=secret

SESSION_DRIVER=database
QUEUE_CONNECTION=database
CACHE_STORE=database

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

# Ticketing Plugin
TICKETING_NAV_FIELD=email
TICKETING_NAV_ALLOWED=admin@yourdomain.com
```

## Deployment Steps in Dockploy

### Step 1: Create New Project

1. Log into your Dockploy dashboard
2. Click "New Project" → "Docker Compose"
3. Connect your Git repository

### Step 2: Configure Build Settings

1. **Repository**: Enter your Git repository URL
2. **Branch**: Select your deployment branch (e.g., `main` or `production`)
3. **Build Path**: Leave as `/` (root)
4. **Compose File**: `docker-compose.yml`

### Step 3: Set Environment Variables

Go to the "Environment" tab and add all the variables listed above.

**Important**: Generate a new `APP_KEY`:
```bash
php artisan key:generate --show
```

### Step 4: Configure Volumes (Important!)

In Dockploy, configure persistent volumes:

- `./storage` → `/var/www/html/storage`
- `./database` → `/var/www/html/database` (if using SQLite)
- `./bootstrap/cache` → `/var/www/html/bootstrap/cache`

### Step 5: Configure Domain

1. Go to "Domains" tab
2. Add your domain name
3. Enable SSL (Let's Encrypt)

### Step 6: Deploy

1. Click "Deploy" button
2. Monitor the build logs
3. Wait for the deployment to complete

## Post-Deployment Steps

### 1. Create Admin User

SSH into your container or use Dockploy's terminal:

```bash
docker compose exec app php artisan filament:make-user
```

Follow the prompts to create an admin user.

### 2. Run Migrations (if not auto-run)

```bash
docker compose exec app php artisan migrate --force
```

### 3. Clear Caches

```bash
docker compose exec app php artisan optimize:clear
docker compose exec app php artisan optimize
```

### 4. Set Storage Permissions

```bash
docker compose exec app chown -R www-data:www-data /var/www/html/storage
docker compose exec app chmod -R 775 /var/www/html/storage
```

## Access Your Application

- **Frontend**: `https://yourdomain.com`
- **Admin Panel**: `https://yourdomain.com/admin`
- **User Dashboard**: `https://yourdomain.com/dashboard`

## Troubleshooting

### Container Won't Start

Check logs in Dockploy:
```bash
docker compose logs -f app
```

### Permission Errors

```bash
docker compose exec app chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
docker compose exec app chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache
```

### Database Errors

If using SQLite, ensure the database file exists:
```bash
docker compose exec app touch /var/www/html/database/database.sqlite
docker compose exec app php artisan migrate --force
```

### Assets Not Loading

Rebuild assets:
```bash
docker compose exec app npm run build
```

### 500 Internal Server Error

Clear all caches:
```bash
docker compose exec app php artisan config:clear
docker compose exec app php artisan cache:clear
docker compose exec app php artisan route:clear
docker compose exec app php artisan view:clear
```

## Updating the Application

### Via Git Push

Dockploy can auto-deploy on git push (configure webhooks in settings).

### Manual Deploy

1. Go to your Dockploy project
2. Click "Redeploy"
3. Wait for the build to complete

### Zero-Downtime Updates

```bash
docker compose exec app php artisan down
docker compose exec app git pull
docker compose exec app composer install --no-dev --optimize-autoloader
docker compose exec app npm ci && npm run build
docker compose exec app php artisan migrate --force
docker compose exec app php artisan optimize
docker compose exec app php artisan up
```

## Performance Optimization

### 1. Enable OPcache

Add to your PHP configuration in the Dockerfile:

```dockerfile
RUN docker-php-ext-install opcache
COPY docker/php/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
```

Create `docker/php/opcache.ini`:
```ini
[opcache]
opcache.enable=1
opcache.memory_consumption=256
opcache.interned_strings_buffer=16
opcache.max_accelerated_files=10000
opcache.revalidate_freq=2
opcache.fast_shutdown=1
```

### 2. Use Redis for Cache (Optional)

Add to `docker-compose.yml`:

```yaml
  redis:
    image: redis:alpine
    container_name: jayavandepol-redis
    networks:
      - app-network
```

Update `.env`:
```env
CACHE_STORE=redis
SESSION_DRIVER=redis
REDIS_HOST=redis
```

### 3. Queue Workers

Add to `docker-compose.yml`:

```yaml
  queue:
    image: php:8.3-cli-alpine
    container_name: jayavandepol-queue
    working_dir: /var/www/html
    volumes:
      - .:/var/www/html
    command: php artisan queue:work --tries=3
    depends_on:
      - app
    networks:
      - app-network
```

## Backup Strategy

### Database Backup

For SQLite:
```bash
docker compose exec app cp /var/www/html/database/database.sqlite /var/www/html/storage/backups/database-$(date +%Y%m%d).sqlite
```

For MySQL:
```bash
docker compose exec mysql mysqldump -u root -p${DB_PASSWORD} ${DB_DATABASE} > backup.sql
```

### Full Backup

Include these directories in your backup:
- `storage/app`
- `database/database.sqlite` (if using SQLite)
- `.env` file

## Security Checklist

- ✅ Set `APP_DEBUG=false` in production
- ✅ Use strong `APP_KEY`
- ✅ Configure proper file permissions
- ✅ Enable HTTPS/SSL
- ✅ Set secure session configuration
- ✅ Configure CORS properly
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Enable rate limiting
- ✅ Configure CSP headers

## Monitoring

### Check Application Health

```bash
docker compose exec app php artisan about
```

### View Logs

```bash
docker compose logs -f app
docker compose logs -f nginx
```

### Laravel Logs

```bash
docker compose exec app tail -f storage/logs/laravel.log
```

## Support

For issues specific to:
- **Laravel**: [Laravel Documentation](https://laravel.com/docs)
- **Filament**: [Filament Documentation](https://filamentphp.com/docs)
- **Dockploy**: [Dockploy Documentation](https://dockploy.com/docs)

---

**Last Updated**: January 2026
