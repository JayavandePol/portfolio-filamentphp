<?php

namespace App\Listeners;

use App\Mail\TicketStatusChanged as TicketStatusChangedMail;
use daacreators\CreatorsTicketing\Events\TicketStatusChanged;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Events\Attributes\Listener;
use Illuminate\Support\Facades\Mail;

#[Listener]
class SendTicketStatusChangedNotification implements ShouldHandleEventsAfterCommit
{
    public function handle(TicketStatusChanged $event): void
    {
        // Only send emails for Answered, Resolved, or Closed statuses
        $notifiableStatuses = ['Answered', 'Resolved', 'Closed'];

        if (!in_array($event->newStatus->name, $notifiableStatuses)) {
            return;
        }

        // Send email to the ticket requester
        if ($event->ticket->requester && $event->ticket->requester->email) {
            Mail::to($event->ticket->requester->email)
                ->send(new TicketStatusChangedMail($event->ticket, $event->newStatus));
        }
    }
}
