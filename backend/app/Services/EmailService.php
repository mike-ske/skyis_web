<?php

// ==========================================
// 4. EMAIL SERVICE CLASS
// ==========================================

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\WelcomeEmail;
use App\Mail\EmailVerification;
use App\Mail\PasswordResetEmail;
use App\Mail\LoginAlertEmail;
use App\Mail\PasswordChangedEmail;
use Illuminate\Support\Facades\Log;

class EmailService
{
    /**
     * Send welcome email to new user
     */
    public function sendWelcomeEmail(User $user)
    {
        try {
            Mail::to($user->email)->send(new WelcomeEmail($user));
            
            \Log::info('Welcome email sent', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error('Welcome email failed', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Send email verification
     */
    public function sendEmailVerification(User $user, $verificationUrl)
    {
        try {
            Mail::to($user->email)->send(new EmailVerification($user, $verificationUrl));
            
            \Log::info('Verification email sent', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error('Verification email failed', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Send password reset email
     */
    public function sendPasswordReset(User $user, $resetUrl)
    {
        try {
            Mail::to($user->email)->send(new PasswordResetEmail($user, $resetUrl));
            
            \Log::info('Password reset email sent', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error('Password reset email failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Send login alert email
     */
    public function sendLoginAlert(User $user, $loginData = [])
    {
        try {
            Mail::to($user->email)->send(new LoginAlertEmail($user, $loginData));
            
            \Log::info('Login alert sent', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error('Login alert failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Send password changed notification
     */
    public function sendPasswordChangedNotification(User $user)
    {
        try {
            Mail::to($user->email)->send(new PasswordChangedEmail($user));
            
            \Log::info('Password changed notification sent', ['user_id' => $user->id]);
        } catch (\Exception $e) {
            \Log::error('Password changed notification failed', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
        }
    }
}