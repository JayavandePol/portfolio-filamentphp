<?php

namespace App\Mail;

use daacreators\CreatorsTicketing\Models\Ticket;
use daacreators\CreatorsTicketing\Models\TicketStatus;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TicketStatusChanged extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Ticket $ticket,
        public TicketStatus $newStatus
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Ticket #{$this->ticket->ticket_uid} Status Updated: {$this->newStatus->name}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.ticket-status-changed',
        );
    }
}
