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
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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

        .ticket-details {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .reply-content {
            background: #eff6ff;
            padding: 20px;
            border-left: 4px solid #3b82f6;
            border-radius: 4px;
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
            background: #3b82f6;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>New Ticket Reply</h1>
    </div>

    <div class="content">
        <p>Hello Admin,</p>

        <p>A user has replied to their support ticket:</p>

        <div class="ticket-details">
            <p><strong>Ticket ID:</strong> {{ $ticket->ticket_uid }}</p>
            <p><strong>Subject:</strong> {{ $ticket->title }}</p>
            <p><strong>From:</strong> {{ $reply->user->name }} ({{ $reply->user->email }})</p>
            <p><strong>Date:</strong> {{ $reply->created_at->format('F j, Y g:i A') }}</p>
        </div>

        <div class="reply-content">
            <p><strong>Reply:</strong></p>
            {!! nl2br(e($reply->message)) !!}
        </div>

        <center>
            <a href="{{ url('/admin/tickets/' . $ticket->id) }}" class="button">View & Respond</a>
        </center>
    </div>

    <div class="footer">
        <p>This is an automated notification from {{ config('app.name') }}</p>
    </div>
</body>

</html>