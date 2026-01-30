<?php

namespace App\Listeners;

use App\Mail\TicketReplyNotification as TicketReplyNotificationMail;
use daacreators\CreatorsTicketing\Events\TicketReplyAdded;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Events\Attributes\Listener;
use Illuminate\Support\Facades\Mail;

#[Listener]
class SendTicketReplyNotification implements ShouldHandleEventsAfterCommit
{
    public function handle(TicketReplyAdded $event): void
    {
        \Log::info('TicketReplyAdded event fired', [
            'ticket_id' => $event->ticket->id,
            'reply_user_id' => $event->reply->user_id,
            'ticket_user_id' => $event->ticket->user_id,
            'match' => $event->reply->user_id === $event->ticket->user_id,
        ]);

        // Only notify admin when the ticket creator (user_id) replies
        // Don't notify when admin/agent replies
        // Note: ticket->user_id is the requester (ticket creator)
        if ($event->reply->user_id === $event->ticket->user_id) {
            \Log::info('Sending reply notification to admin');
            Mail::to('info@jayavandepol.nl')
                ->send(new TicketReplyNotificationMail($event->ticket, $event->reply));
        } else {
            \Log::info('Skipping notification - reply is from admin/agent');
        }
    }
}
