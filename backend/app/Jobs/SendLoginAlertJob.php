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

class SendLoginAlertJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;
    protected $loginData;

    public function __construct(User $user, array $loginData)
    {
        $this->user = $user;
        $this->loginData = $loginData;
    }

    public function handle(EmailService $emailService)
    {
        $emailService->sendLoginAlert($this->user, $this->loginData);
    }

    public function failed(\Throwable $exception)
    {
        \Log::error('Login alert job failed', [
            'user_id' => $this->user->id,
            'error' => $exception->getMessage()
        ]);
    }
}

