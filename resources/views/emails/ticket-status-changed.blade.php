<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
            color: white;
            padding: 30px;
            border-radius: 8px 8px 0 0;
            text-align: center;
        }

        .content {
            background: #ffffff;
            padding: 30px;
            border: 1px solid #e5e7eb;
            border-top: none;
        }

        .status-badge {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            margin: 10px 0;
        }

        .status-answered {
            background: #10b981;
            color: white;
        }

        .status-resolved {
            background: #059669;
            color: white;
        }

        .status-closed {
            background: #6b7280;
            color: white;
        }

        .ticket-details {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 14px;
        }

        .button {
            display: inline-block;
            padding: 12px 24px;
            background: #f59e0b;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Ticket Status Updated</h1>
    </div>

    <div class="content">
        <p>Hello {{ $ticket->requester->name }},</p>

        <p>Your support ticket has been updated:</p>

        <div class="ticket-details">
            <p><strong>Ticket ID:</strong> {{ $ticket->ticket_uid }}</p>
            <p><strong>Subject:</strong> {{ $ticket->title }}</p>
            <p><strong>New Status:</strong>
                <span class="status-badge status-{{ strtolower($newStatus->name) }}">
                    {{ $newStatus->name }}
                </span>
            </p>
        </div>

        @if($newStatus->name === 'Answered')
            <p>We've answered your ticket! Please review the response and let us know if you need any further assistance.
            </p>
        @elseif($newStatus->name === 'Resolved')
            <p>Your ticket has been resolved. If you're satisfied with the solution, no further action is needed. If you
                still need help, feel free to reply to the ticket.</p>
        @elseif($newStatus->name === 'Closed')
            <p>This ticket has been closed. If you need further assistance, please create a new ticket.</p>
        @endif

        <center>
            <a href="{{ url('/dashboard/my-tickets') }}" class="button">View Ticket</a>
        </center>
    </div>

    <div class="footer">
        <p>This is an automated message from {{ config('app.name') }}</p>
        <p>Please do not reply directly to this email</p>
    </div>
</body>

</html>