<?php

namespace App\Listeners;

use App\Services\DiscordWebhookService;
use Illuminate\Auth\Events\Failed;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogAuthToDiscord implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct(protected DiscordWebhookService $discord)
    {
    }

    public function handle($event): void
    {
        if ($event instanceof Login) {
            $this->handleLogin($event);
        } elseif ($event instanceof Logout) {
            $this->handleLogout($event);
        } elseif ($event instanceof Failed) {
            $this->handleFailed($event);
        }
    }

    protected function handleLogin(Login $event): void
    {
        $user = $event->user;
        $message = "🔓 **User Logged In**";

        $embed = [
            'description' => "**{$user->name}** ({$user->email}) has logged in.",
            'color' => 3066993, // Green
            'timestamp' => now()->toIso8601String(),
        ];

        $this->discord->sendAuthLog($message, [$embed]);
    }

    protected function handleLogout(Logout $event): void
    {
        // $event->user might be null if session expired or other cases, but usually present on explicit logout
        $user = $event->user;
        
        if (!$user) {
            return;
        }

        $message = "🔒 **User Logged Out**";

        $embed = [
            'description' => "**{$user->name}** ({$user->email}) has logged out.",
            'color' => 15158332, // Red
            'timestamp' => now()->toIso8601String(),
        ];

        $this->discord->sendAuthLog($message, [$embed]);
    }

    protected function handleFailed(Failed $event): void
    {
        // $event->user might be null for failed login (invalid user)
        $email = $event->credentials['email'] ?? 'Unknown';
        
        $message = "⚠️ **Login Failed**";

        $embed = [
            'description' => "Failed login attempt for email: **{$email}**",
            'color' => 15105570, // Orange
            'timestamp' => now()->toIso8601String(),
        ];

        $this->discord->sendAuthLog($message, [$embed]);
    }
}
