<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $verificationUrl;

    /**
     * Create a new message instance.
     */
    public function __construct(User $user)
    {
        $this->user = $user;

        // Generate signed verification URL
        $this->verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            [
                'id' => $user->getKey(),
                'hash' => sha1($user->getEmailForVerification()),
            ]
        );
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('Welcome to Skyis Fashion! 🎉')
                    ->markdown('emails.auth.welcome')
                    ->with([
                        'user' => $this->user,
                        'verificationUrl' => $this->verificationUrl,
                        'dashboardUrl' => url('/dashboard'),
                        'helpCenterUrl' => url('/help-center'),
                        'termsUrl' => url('/terms'),
                        'privacyUrl' => url('/privacy'),
                        'unsubscribeUrl' => url('/unsubscribe'),
                    ]);
    }
}
