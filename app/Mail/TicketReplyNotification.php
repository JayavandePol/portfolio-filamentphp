<?php

namespace App\Mail;

use daacreators\CreatorsTicketing\Models\Ticket;
use daacreators\CreatorsTicketing\Models\TicketReply;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketReplyNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Ticket $ticket,
        public TicketReply $reply
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New Reply on Ticket #{$this->ticket->ticket_uid}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket-reply-notification',
        );
    }
}
