<?php


namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string|string>>
     */
    protected $listen = [
        \Illuminate\Mail\Events\MessageSending::class => [
            \App\Listeners\LogEmailEvents::class . '@handleMessageSending',
        ],
        \Illuminate\Mail\Events\MessageSent::class => [
            \App\Listeners\LogEmailEvents::class . '@handleMessageSent',
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        parent::boot();

        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false; // set to true if you want auto-discovery instead of manual $listen
    }
}
