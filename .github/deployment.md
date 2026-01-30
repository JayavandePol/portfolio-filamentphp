# Deployment Guide: aaPanel

This guide provides a step-by-step process for deploying the **jayavandepol.nl** portfolio (Laravel + Filament + Inertia.js) on a server managed by **aaPanel**.

## 1. Prerequisites

Ensure your aaPanel has the following software installed via the **App Store**:
- **Nginx** (any version, 1.22+ recommended)
- **PHP 8.2 or 8.3**
  - Required Extensions: `fileinfo`, `redis`, `exif`, `intl`, `gd`, `imagick`
- **MySQL 8.0+**
- **Node.js Version Manager** (install Node 20+)
- **Redis** (optional but recommended for caching)

---

## 2. Create Website & Database

1. In aaPanel, go to **Website** > **Add site**.
2. Enter your domain (e.g., `jayavandepol.nl`).
3. Select **MySQL** and give it a name/password.
4. Set **PHP Version** to 8.2 or 8.3.
5. Click **Submit**.

---

## 3. Deployment via Git (Recommended)

1. Open the site's directory in aaPanel's **Command Line** or use **SSH**.
2. Remove the default files (if any):
   ```bash
   rm -rf /www/wwwroot/jayavandepol.nl/*
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/USERNAME/REPO_NAME.git .
   ```

---

## 4. Environment Configuration

1. Copy the `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Edit `.env` and update:
   - `APP_ENV=production`
   - `APP_DEBUG=false`
   - `APP_URL=https://jayavandepol.nl`
   - **Database details** (created in step 2)

---

## 5. Install Dependencies & Build

Run these commands in the site's root directory:

```bash
# Install PHP dependencies
composer install --no-dev --optimize-autoloader

# Generate App Key
php artisan key:generate

# Install Node dependencies
npm install

# Build frontend assets
npm run build

# Run migrations
php artisan migrate --force

# Optimize Laravel
php artisan optimize
```

---

## 6. aaPanel Site Configuration

After the files are ready, you must configure the site settings in aaPanel:

### Web Root
Go to **Website** > **Settings** (for your site) > **Site directory**:
- **Running directory**: Select `/public` and click **Save**.

### URL Rewrite
Go to **Website** > **Settings** > **URL rewrite**:
- Select the **laravel** template from the dropdown.
- Click **Save**.

### SSL
Go to **Website** > **Settings** > **SSL**:
- Use **Let's Encrypt** to generate a free certificate.
- Enable **Force HTTPS**.

---

## 7. Permissions

Laravel requires certain directories to be writable by the web server (usually `www` user):

```bash
chown -R www:www /www/wwwroot/jayavandepol.nl
chmod -R 775 /www/wwwroot/jayavandepol.nl/storage
chmod -R 775 /www/wwwroot/jayavandepol.nl/bootstrap/cache
```

---

## 8. Queue Worker (Supervisor)

For features like email notifications or background jobs, you need a background worker:
1. Install **Supervisor** from the aaPanel App Store.
2. Go to **Supervisor** > **Add Daemon**.
3. Settings:
   - **Name**: `portfolio-worker`
   - **User**: `www`
   - **Run Directory**: `/www/wwwroot/jayavandepol.nl`
   - **Command**: `php artisan queue:work`
4. Click **Confirm**.

---

## 9. Final Checks

1. Visit your domain to ensure everything is working.
2. Check logs if there are issues: `storage/logs/laravel.log`.
3. If using Filament, ensure your admin user is created:
   ```bash
   php artisan make:filament-user
   ```
