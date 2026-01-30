<?php

namespace App\Listeners;

use App\Mail\TicketCreatedNotification as TicketCreatedNotificationMail;
use daacreators\CreatorsTicketing\Events\TicketCreated;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Events\Attributes\Listener;
use Illuminate\Support\Facades\Mail;

#[Listener]
class SendTicketCreatedNotification implements ShouldHandleEventsAfterCommit
{
    public function handle(TicketCreated $event): void
    {
        \Log::info('TicketCreated event fired', [
            'ticket_id' => $event->ticket->id,
            'ticket_title' => $event->ticket->title,
            'requester_email' => $event->ticket->requester?->email ?? 'N/A',
        ]);

        try {
            // Send email to admin when a new ticket is created
            \Log::info('Attempting to send ticket creation email to info@jayavandepol.nl');
            Mail::to('info@jayavandepol.nl')
                ->send(new TicketCreatedNotificationMail($event->ticket));
            \Log::info('Ticket creation email sent successfully');
        } catch (\Exception $e) {
            \Log::error('Failed to send ticket creation email', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
        }
    }
}
