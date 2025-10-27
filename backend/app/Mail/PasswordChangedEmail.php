<?php

// ==========================================
// 9. PASSWORD CHANGED MAILABLE
// ==========================================

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordChangedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user
    ) {}

    public function envelope()
    {
        return new Envelope(
            subject: 'Password Changed Successfully - Skyis',
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.password-changed',
            with: [
                'user' => $this->user,
                'securityUrl' => env('FRONTEND_URL') . '/profile/security',
            ],
        );
    }
}