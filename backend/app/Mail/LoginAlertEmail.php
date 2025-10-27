<?php

// ==========================================
// 8. LOGIN ALERT MAILABLE
// ==========================================

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LoginAlertEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public array $loginData = []
    ) {}

    public function envelope()
    {
        return new Envelope(
            subject: 'New Login to Your Skyis Account',
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.login-alert',
            with: [
                'user' => $this->user,
                'loginData' => $this->loginData,
                'securityUrl' => env('FRONTEND_URL') . '/profile/security',
            ],
        );
    }
}