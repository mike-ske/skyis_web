<?php

// ==========================================
// 6. EMAIL VERIFICATION MAILABLE
// ==========================================

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public User $user,
        public string $verificationUrl
    ) {}

    public function envelope()
    {
        return new Envelope(
            subject: 'Verify Your Email Address - Skyis',
        );
    }

    public function content()
    {
        return new Content(
            view: 'emails.verify-email',
            with: [
                'user' => $this->user,
                'verificationUrl' => $this->verificationUrl,
            ],
        );
    }
    
    public function attachments(): array
    {
        return [];
    }
}

