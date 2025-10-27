<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use App\Models\User;

class TestEmail extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'email:test {email}';

    /**
     * The console command description.
     */
    protected $description = 'Send a test welcome email to verify email configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $this->info("📧 Sending test email to: {$email}");
        $this->newLine();
        
        try {
            // Create a temporary user object for testing
            $testUser = new User();
            $testUser->name = 'Test User';
            $testUser->email = $email;
            $testUser->id = 999999; // Temporary ID
            
            // Display mail configuration
            $this->info('Mail Configuration:');
            $this->line('- Driver: ' . config('mail.default'));
            $this->line('- Host: ' . config('mail.mailers.smtp.host'));
            $this->line('- Port: ' . config('mail.mailers.smtp.port'));
            $this->line('- From: ' . config('mail.from.address'));
            $this->newLine();
            
            // Send the email
            $this->info('Sending email...');
            Mail::to($email)->send(new WelcomeEmail($testUser));
            
            $this->newLine();
            $this->info('✅ Email sent successfully!');
            $this->info('📬 Check your inbox at: ' . $email);
            $this->info('📁 Also check spam/junk folder if not in inbox');
            
            return Command::SUCCESS;
            
        } catch (\Exception $e) {
            $this->newLine();
            $this->error('❌ Email failed to send!');
            $this->error('Error: ' . $e->getMessage());
            $this->newLine();
            $this->warn('💡 Troubleshooting tips:');
            $this->line('1. Check your .env file for correct MAIL_* settings');
            $this->line('2. Verify Zoho Mail credentials are correct');
            $this->line('3. Check Laravel logs: storage/logs/laravel.log');
            $this->line('4. Ensure port 587 is not blocked by firewall');
            
            return Command::FAILURE;
        }
    }
}