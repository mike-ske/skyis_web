

# // ==========================================
# // QUICK SETUP SCRIPT FOR NEW PROJECTS
# // ==========================================

# // Create: setup-emails.sh
#!/bin/bash

echo "Setting up Skyis Email System..."

# 1. Create required directories
mkdir -p resources/views/emails
mkdir -p app/Mail
mkdir -p app/Services
mkdir -p app/Jobs

# 2. Install packages
composer require laravel/sanctum guzzlehttp/guzzle

# 3. Setup queue tables
php artisan queue:table
php artisan migrate

# 4. Create mail classes
php artisan make:mail WelcomeEmail
php artisan make:mail EmailVerification  
php artisan make:mail PasswordResetEmail
php artisan make:mail LoginAlertEmail
php artisan make:mail PasswordChangedEmail

# 5. Create service
php artisan make:service EmailService

# 6. Create jobs
php artisan make:job SendWelcomeEmailJob
php artisan make:job SendLoginAlertJob

# 7. Create commands
php artisan make:command TestEmailsCommand
php artisan make:command EmailStatsCommand

# 8. Clear caches
php artisan config:clear
php artisan config:cache

echo "✓ Email system setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your .env file with SendGrid credentials"
echo "2. Add DNS records for your domain"
echo "3. Create email templates in resources/views/emails/"
echo "4. Test your setup with: php artisan email:test your-email@example.com"
echo ""

// ==========================================
// ENVIRONMENT VARIABLES REFERENCE
// ==========================================


#Add to .env file:

# SendGrid Configuration
MAIL_MAILER=smtp
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=SG.your-sendgrid-api-key-here
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="Skyis"

# App Configuration
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Queue Configuration
QUEUE_CONNECTION=database
# OR use Redis for better performance:
# QUEUE_CONNECTION=redis
# REDIS_HOST=127.0.0.1
# REDIS_PORT=6379
# REDIS_PASSWORD=null

# Optional: Email tracking
MAIL_LOG_CHANNEL=stack
MAIL_TRACKING_ENABLED=true

# // ==========================================
# // FINAL PRODUCTION CHECKLIST
# // ==========================================
