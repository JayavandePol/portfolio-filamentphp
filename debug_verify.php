<?php

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use daacreators\CreatorsTicketing\Models\Ticket;
use daacreators\CreatorsTicketing\Enums\TicketPriority;
use daacreators\CreatorsTicketing\Models\TicketReply;
use App\Models\User;

echo "Starting Enhanced Debug Verification...\n";

try {
    echo "1. Creating Discord Service... ";
    $discordService = new \App\Services\DiscordWebhookService();
    echo "OK\n";

    echo "2. Creating Listeners... ";
    $ticketListener = new \App\Listeners\LogTicketToDiscord($discordService);
    $authListener = new \App\Listeners\LogAuthToDiscord($discordService);
    echo "OK\n";

    echo "3. Mocking Data... ";
    $user = new User();
    $user->name = 'Test User';
    $user->email = 'test@example.com';
    $user->id = 888;

    $ticket = new Ticket();
    $ticket->id = 12345;
    $ticket->ticket_uid = '12345';
    $ticket->priority = TicketPriority::HIGH;
    $ticket->status = 'Open';
    $ticket->custom_fields = ['title' => 'Enhanced Webhook Test', 'content' => 'Testing mentions and URLs']; 
    $ticket->setRelation('user', $user);
    echo "OK\n";

    // Ticket Created
    echo "4. Triggering TicketCreated (Check for Mention & URL)... ";
    $event = new \daacreators\CreatorsTicketing\Events\TicketCreated($ticket, $user);
    $ticketListener->handle($event);
    echo "SENT\n";

    // Ticket Reply
    echo "5. Triggering TicketReplyAdded (Check for Mention & URL)... ";
    $reply = new TicketReply();
    $reply->content = "This is a reply verification.";
    $reply->setRelation('user', $user);
    $reply->setRelation('ticket', $ticket); // Reply listener needs ticket for URL
    
    $replyEvent = new \daacreators\CreatorsTicketing\Events\TicketReplyAdded($ticket, $reply);
    $ticketListener->handle($replyEvent);
    echo "SENT\n";

    // Auth Event (Check if it works now)
    echo "6. Triggering Auth Login (Check for success log)... ";
    $loginUser = new User();
    $loginUser->name = 'Auth User';
    $loginUser->email = 'auth@example.com';
    $loginUser->id = 777;
    
    $authListener->handle(new \Illuminate\Auth\Events\Login('web', $loginUser, false));
    echo "SENT\n";

    echo "\nVerification Completed. Check Discord Channel.\n";

} catch (\Throwable $e) {
    echo "\nFAILED: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
