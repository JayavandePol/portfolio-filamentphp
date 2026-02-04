<?php

namespace App\Listeners;

use App\Services\DiscordWebhookService;
use daacreators\CreatorsTicketing\Events\TicketCreated;
use daacreators\CreatorsTicketing\Events\TicketReplyAdded;
use daacreators\CreatorsTicketing\Events\TicketStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogTicketToDiscord implements ShouldQueue
{
    use InteractsWithQueue;

    public function __construct(protected DiscordWebhookService $discord)
    {
    }

    public function handle($event): void
    {
        if ($event instanceof TicketCreated) {
            $this->handleTicketCreated($event);
        } elseif ($event instanceof TicketStatusChanged) {
            $this->handleTicketStatusChanged($event);
        } elseif ($event instanceof TicketReplyAdded) {
            $this->handleTicketReplyAdded($event);
        }
    }

    protected function handleTicketCreated(TicketCreated $event): void
    {
        $ticket = $event->ticket;
        $url = config('app.url') . "/admin/tickets/{$ticket->id}";
        $message = "🎫 **New Ticket Created** <@550802964923678720>";
        
        $embed = [
            'title' => "Ticket: #{$ticket->id} - {$ticket->title}",
            'url' => $url,
            'description' => $ticket->content ?? 'No content provided',
            'color' => 5814783, // Blue
            'fields' => [
                [
                    'name' => 'User',
                    'value' => $ticket->user->name ?? 'Unknown',
                    'inline' => true,
                ],
                [
                    'name' => 'Priority',
                    'value' => $ticket->priority?->getLabel() ?? 'Normal',
                    'inline' => true,
                ],
            ],
            'timestamp' => now()->toIso8601String(),
        ];

        $this->discord->sendTicketLog($message, [$embed]);
    }

    protected function handleTicketStatusChanged(TicketStatusChanged $event): void
    {
        $ticket = $event->ticket;
        $url = config('app.url') . "/admin/tickets/{$ticket->id}";
        $message = "🔄 **Ticket Status Updated** <@550802964923678720>";

        $embed = [
            'title' => "Ticket: #{$ticket->id}",
            'url' => $url,
            'description' => "Status changed from `{$event->oldStatus}` to `{$ticket->status}`",
            'color' => 16776960, // Yellow
            'timestamp' => now()->toIso8601String(),
        ];
        
        $this->discord->sendTicketLog($message, [$embed]);
    }

    protected function handleTicketReplyAdded(TicketReplyAdded $event): void
    {
        $reply = $event->reply;
        $ticket = $event->ticket;
        $url = config('app.url') . "/admin/tickets/{$ticket->id}";

        $message = "💬 **New Reply to Ticket** <@550802964923678720>";

        $embed = [
            'title' => "Ticket: #{$ticket->id}",
            'url' => $url,
            'description' => str($reply->content)->limit(200),
            'color' => 5763719, // Green
             'fields' => [
                [
                    'name' => 'User',
                    'value' => $reply->user->name ?? 'Unknown',
                    'inline' => true,
                ],
            ],
            'timestamp' => now()->toIso8601String(),
        ];

        $this->discord->sendTicketLog($message, [$embed]);
    }
}
