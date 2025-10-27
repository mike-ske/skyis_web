<?php


// ==========================================
// 7. EMAIL MONITORING & LOGGING
// ==========================================

namespace App\Listeners;

use Illuminate\Mail\Events\MessageSending;
use Illuminate\Mail\Events\MessageSent;
use Illuminate\Support\Facades\Log;

class LogEmailEvents
{
    public function handleMessageSending(MessageSending $event)
    {
        Log::info('Email being sent', [
            'to' => $event->message->getTo(),
            'subject' => $event->message->getSubject(),
        ]);
    }

    public function handleMessageSent(MessageSent $event)
    {
        Log::info('Email sent successfully', [
            'to' => $event->message->getTo(),
            'subject' => $event->message->getSubject(),
        ]);
    }
}
