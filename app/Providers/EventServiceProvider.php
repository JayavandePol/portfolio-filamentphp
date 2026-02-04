<?php

namespace App\Providers;

use App\Listeners\SendTicketCreatedNotification;
use App\Listeners\SendTicketReplyNotification;
use App\Listeners\SendTicketStatusChangedNotification;
use daacreators\CreatorsTicketing\Events\TicketCreated;
use daacreators\CreatorsTicketing\Events\TicketReplyAdded;
use daacreators\CreatorsTicketing\Events\TicketStatusChanged;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        TicketCreated::class => [
            SendTicketCreatedNotification::class,
            \App\Listeners\LogTicketToDiscord::class,
        ],
        TicketStatusChanged::class => [
            SendTicketStatusChangedNotification::class,
            \App\Listeners\LogTicketToDiscord::class,
        ],
        TicketReplyAdded::class => [
            SendTicketReplyNotification::class,
            \App\Listeners\LogTicketToDiscord::class,
        ],
        \Illuminate\Auth\Events\Login::class => [
            \App\Listeners\LogAuthToDiscord::class,
        ],
        \Illuminate\Auth\Events\Logout::class => [
            \App\Listeners\LogAuthToDiscord::class,
        ],
        \Illuminate\Auth\Events\Failed::class => [
            \App\Listeners\LogAuthToDiscord::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
