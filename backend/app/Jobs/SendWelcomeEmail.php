<?php

// ==========================================
// 5. QUEUE JOBS FOR EMAIL PROCESSING
// ==========================================

namespace App\Jobs;

use App\Models\User;
use Illuminate\Bus\Queueable;
use App\Services\EmailService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendWelcomeEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }



    public function handle()
    {
        Mail::to($this->user->email)
            ->send(new \App\Mail\WelcomeEmail($this->user));
    }

    public function failed(\Throwable $exception)
    {
        // Log the failure
        \Log::error('Welcome email failed for user: ' . $this->user->id, [
            'error' => $exception->getMessage()
        ]);
    }



}

