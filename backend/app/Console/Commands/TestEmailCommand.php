<?php

// ==========================================
// EMAIL TEST COMMAND (app/Console/Commands/TestEmailsCommand.php)
// ==========================================

namespace App\Console\Commands;

use App\Models\User;
use App\Services\EmailService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class TestEmailsCommand extends Command
{
    protected $signature = 'email:test 
                            {email : The email address to send test emails to}
                            {--type=all : Type of email to test (welcome, verify, reset, login-alert, password-changed, all)}
                            {--user-id= : Specific user ID to use for testing}';

    protected $description = 'Test email functionality and templates';

    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    public function handle()
    {
        $email = $this->argument('email');
        $type = $this->option('type');
        $userId = $this->option('user-id');

        $this->info("Starting email tests for: {$email}");
        $this->newLine();

        // Get or create test user
        $user = $this->getTestUser($email, $userId);

        if (!$user) {
            $this->error('Failed to create test user');
            return 1;
        }

        $this->info("Using test user: {$user->name} ({$user->email})");
        $this->newLine();

        // Test configuration first
        if (!$this->testConfiguration()) {
            $this->error('Email configuration test failed');
            return 1;
        }

        // Run specific test or all tests
        switch ($type) {
            case 'welcome':
                $this->testWelcomeEmail($user);
                break;
            case 'verify':
                $this->testVerificationEmail($user);
                break;
            case 'reset':
                $this->testPasswordResetEmail($user);
                break;
            case 'login-alert':
                $this->testLoginAlertEmail($user);
                break;
            case 'password-changed':
                $this->testPasswordChangedEmail($user);
                break;
            case 'all':
            default:
                $this->testAllEmails($user);
                break;
        }

        $this->newLine();
        $this->info('Email testing completed!');
        $this->info('Check your inbox and spam folder for test emails.');
        
        return 0;
    }

    protected function testConfiguration()
    {
        $this->info('Testing email configuration...');

        try {
            // Test basic mail configuration
            $mailer = config('mail.default');
            $host = config("mail.mailers.{$mailer}.host");
            $port = config("mail.mailers.{$mailer}.port");
            $username = config("mail.mailers.{$mailer}.username");
            $fromAddress = config('mail.from.address');

            $this->line("  Mailer: {$mailer}");
            $this->line("  Host: {$host}");
            $this->line("  Port: {$port}");
            $this->line("  Username: {$username}");
            $this->line("  From Address: {$fromAddress}");

            if (empty($host) || empty($fromAddress)) {
                $this->error('  ✗ Email configuration incomplete');
                return false;
            }

            $this->info('  ✓ Email configuration looks good');
            return true;

        } catch (\Exception $e) {
            $this->error("  ✗ Configuration error: {$e->getMessage()}");
            return false;
        }
    }

    protected function getTestUser($email, $userId = null)
    {
        if ($userId) {
            $user = User::find($userId);
            if ($user) {
                return $user;
            }
        }

        // Find existing user or create test user
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $user = User::create([
                'name' => 'Test User',
                'first_name' => 'Test',
                'last_name' => 'User',
                'email' => $email,
                'password' => bcrypt('test123!'),
                'email_verified_at' => now(),
            ]);
        }

        return $user;
    }

    protected function testAllEmails(User $user)
    {
        $this->info('Testing all email templates...');
        $this->newLine();

        $this->testWelcomeEmail($user);
        sleep(2); // Prevent rate limiting

        $this->testVerificationEmail($user);
        sleep(2);

        $this->testPasswordResetEmail($user);
        sleep(2);

        $this->testLoginAlertEmail($user);
        sleep(2);

        $this->testPasswordChangedEmail($user);
    }

    protected function testWelcomeEmail(User $user)
    {
        $this->info('Testing Welcome Email...');
        
        try {
            Mail::to($user->email)->send(new \App\Mail\WelcomeEmail($user));
            $this->info('  ✓ Welcome email sent successfully');
        } catch (\Exception $e) {
            $this->error("  ✗ Welcome email failed: {$e->getMessage()}");
        }
    }

    protected function testVerificationEmail(User $user)
    {
        $this->info('Testing Email Verification...');
        
        try {
            $verificationUrl = 'https://yourdomain.com/verify-email?token=test-token-123';
            Mail::to($user->email)->send(new \App\Mail\EmailVerification($user, $verificationUrl));
            $this->info('  ✓ Verification email sent successfully');
        } catch (\Exception $e) {
            $this->error("  ✗ Verification email failed: {$e->getMessage()}");
        }
    }

    protected function testPasswordResetEmail(User $user)
    {
        $this->info('Testing Password Reset Email...');
        
        try {
            $resetUrl = 'https://yourdomain.com/reset-password?token=test-reset-123&email=' . urlencode($user->email);
            Mail::to($user->email)->send(new \App\Mail\PasswordResetEmail($user, $resetUrl));
            $this->info('  ✓ Password reset email sent successfully');
        } catch (\Exception $e) {
            $this->error("  ✗ Password reset email failed: {$e->getMessage()}");
        }
    }

    protected function testLoginAlertEmail(User $user)
    {
        $this->info('Testing Login Alert Email...');
        
        try {
            $loginData = [
                'ip_address' => '192.168.1.100',
                'user_agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'login_time' => now(),
                'location' => 'New York, USA',
                'device' => 'Desktop',
            ];
            
            Mail::to($user->email)->send(new \App\Mail\LoginAlertEmail($user, $loginData));
            $this->info('  ✓ Login alert email sent successfully');
        } catch (\Exception $e) {
            $this->error("  ✗ Login alert email failed: {$e->getMessage()}");
        }
    }

    protected function testPasswordChangedEmail(User $user)
    {
        $this->info('Testing Password Changed Email...');
        
        try {
            Mail::to($user->email)->send(new \App\Mail\PasswordChangedEmail($user));
            $this->info('  ✓ Password changed email sent successfully');
        } catch (\Exception $e) {
            $this->error("  ✗ Password changed email failed: {$e->getMessage()}");
        }
    }
}

// ==========================================
// ADDITIONAL ARTISAN COMMANDS FOR EMAIL MANAGEMENT
// ==========================================

// Create: app/Console/Commands/EmailStatsCommand.php
namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class EmailStatsCommand extends Command
{
    protected $signature = 'email:stats {--days=7 : Number of days to get stats for}';
    protected $description = 'Get email delivery statistics from SendGrid';

    public function handle()
    {
        $days = $this->option('days');
        $apiKey = config('mail.mailers.smtp.password');
        
        if (!$apiKey || !str_starts_with($apiKey, 'SG.')) {
            $this->error('SendGrid API key not configured properly');
            return 1;
        }

        try {
            $startDate = now()->subDays($days)->format('Y-m-d');
            $endDate = now()->format('Y-m-d');

            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . $apiKey,
                'Content-Type' => 'application/json',
            ])->get('https://api.sendgrid.com/v3/stats', [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]);

            if ($response->successful()) {
                $stats = $response->json();
                $this->displayStats($stats, $days);
            } else {
                $this->error('Failed to fetch stats: ' . $response->body());
                return 1;
            }

        } catch (\Exception $e) {
            $this->error('Error fetching stats: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }

    protected function displayStats($stats, $days)
    {
        $this->info("Email Statistics (Last {$days} days)");
        $this->line(str_repeat('-', 40));

        if (empty($stats)) {
            $this->info('No email statistics available for this period.');
            return;
        }

        $totals = [
            'requests' => 0,
            'delivered' => 0,
            'opens' => 0,
            'clicks' => 0,
            'bounces' => 0,
            'spam_reports' => 0,
        ];

        foreach ($stats as $stat) {
            foreach ($stat['stats'] as $metric) {
                $totals['requests'] += $metric['metrics']['requests'] ?? 0;
                $totals['delivered'] += $metric['metrics']['delivered'] ?? 0;
                $totals['opens'] += $metric['metrics']['unique_opens'] ?? 0;
                $totals['clicks'] += $metric['metrics']['unique_clicks'] ?? 0;
                $totals['bounces'] += $metric['metrics']['bounces'] ?? 0;
                $totals['spam_reports'] += $metric['metrics']['spam_reports'] ?? 0;
            }
        }

        $this->line("Emails Sent: " . number_format($totals['requests']));
        $this->line("Delivered: " . number_format($totals['delivered']));
        $this->line("Opens: " . number_format($totals['opens']));
        $this->line("Clicks: " . number_format($totals['clicks']));
        $this->line("Bounces: " . number_format($totals['bounces']));
        $this->line("Spam Reports: " . number_format($totals['spam_reports']));

        if ($totals['requests'] > 0) {
            $deliveryRate = ($totals['delivered'] / $totals['requests']) * 100;
            $openRate = $totals['delivered'] > 0 ? ($totals['opens'] / $totals['delivered']) * 100 : 0;
            $clickRate = $totals['delivered'] > 0 ? ($totals['clicks'] / $totals['delivered']) * 100 : 0;

            $this->newLine();
            $this->line("Delivery Rate: " . number_format($deliveryRate, 2) . "%");
            $this->line("Open Rate: " . number_format($openRate, 2) . "%");
            $this->line("Click Rate: " . number_format($clickRate, 2) . "%");
        }
    }
}
