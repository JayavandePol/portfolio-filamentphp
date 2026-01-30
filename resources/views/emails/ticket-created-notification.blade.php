<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Ticket Created</title>
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
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
        }

        .content {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 0 0 10px 10px;
        }

        .ticket-info {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #667eea;
        }

        .info-row {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e9ecef;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .label {
            font-weight: 600;
            color: #495057;
            display: inline-block;
            width: 120px;
        }

        .value {
            color: #212529;
        }

        .message-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            white-space: pre-wrap;
            word-wrap: break-word;
        }

        .button {
            display: inline-block;
            padding: 12px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: 600;
        }

        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #dee2e6;
            color: #6c757d;
            font-size: 14px;
        }

        .priority {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .priority-high {
            background: #fee;
            color: #c00;
        }

        .priority-medium {
            background: #ffeaa7;
            color: #d63031;
        }

        .priority-low {
            background: #dfe6e9;
            color: #2d3436;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1 style="margin: 0; font-size: 24px;">🎫 New Ticket Created</h1>
    </div>

    <div class="content">
        <p>A new support ticket has been submitted and requires your attention.</p>

        <div class="ticket-info">
            <div class="info-row">
                <span class="label">Ticket ID:</span>
                <span class="value">#{{ $ticket->id }}</span>
            </div>
            <div class="info-row">
                <span class="label">Title:</span>
                <span class="value">{{ $ticket->title }}</span>
            </div>
            <div class="info-row">
                <span class="label">From:</span>
                <span class="value">{{ $ticket->requester->name ?? 'Unknown' }}
                    ({{ $ticket->requester->email ?? 'N/A' }})</span>
            </div>
            <div class="info-row">
                <span class="label">Priority:</span>
                <span class="priority priority-{{ strtolower($ticket->priority->name ?? 'low') }}">
                    {{ $ticket->priority->name ?? 'Low' }}
                </span>
            </div>
            <div class="info-row">
                <span class="label">Status:</span>
                <span class="value">{{ $ticket->status->name ?? 'Open' }}</span>
            </div>
            <div class="info-row">
                <span class="label">Created:</span>
                <span class="value">{{ $ticket->created_at->format('M d, Y \a\t H:i') }}</span>
            </div>
        </div>

        @if($ticket->message)
            <h3 style="color: #495057; margin-top: 20px;">Message:</h3>
            <div class="message-box">{{ $ticket->message }}</div>
        @endif

        <div style="text-align: center;">
            <a href="{{ config('app.url') }}/admin/tickets/{{ $ticket->id }}" class="button">
                View Ticket
            </a>
        </div>
    </div>

    <div class="footer">
        <p>This is an automated notification from {{ config('app.name') }}.</p>
        <p>Please do not reply directly to this email.</p>
    </div>
</body>

</html>