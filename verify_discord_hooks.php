<?php

use App\Models\User;
use daacreators\CreatorsTicketing\Models\Ticket;
use daacreators\CreatorsTicketing\Events\TicketCreated;
use daacreators\CreatorsTicketing\Models\TicketReply;
use daacreators\CreatorsTicketing\Events\TicketReplyAdded;
use daacreators\CreatorsTicketing\Enums\TicketPriority; // Import Enum
use Illuminate\Auth\Events\Login;
use App\Listeners\LogTicketToDiscord;
use App\Listeners\LogAuthToDiscord;
use App\Services\DiscordWebhookService;

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "Starting verification...\n";

try {
    $discordService = new DiscordWebhookService();

    // 1. Test Ticket Listener
    echo "Testing LogTicketToDiscord listener...\n";
    $ticketListener = new LogTicketToDiscord($discordService);

    // Mock Ticket User
    $ticketUser = new User();
    $ticketUser->name = 'Ticket User';
    $ticketUser->email = 'ticket@example.com';
    $ticketUser->id = 888;
    // Need to set relation manually for partial hydration or just mock it cleanly?
    // User model works fine usually.

    // Mock Ticket
    $ticket = new Ticket();
    $ticket->id = 12345;
    $ticket->ticket_uid = '12345'; // Needed for title fallback
    // Set priority using Enum
    $ticket->priority = TicketPriority::HIGH;
    $ticket->status = 'Open'; // Status relationship might be tricky, but assuming status is basic or we can skip relational check in simple logging.
    
    // Set custom fields to populate title and content via accessors
    // We need to match what the 'title()' and 'content()' accessors look for.
    // They look for a 'form' via 'department'. We don't have department/forms mocked easily.
    // BUT they have fallbacks or check custom_fields directly if field names match certain keywords?
    // Inspect Ticket.php:
    // title(): 
    //   $form = $this->department?->forms()...
    //   if (!$form || !$this->custom_fields) return 'Ticket #' . $this->ticket_uid;
    //
    // So if no department/form, it returns Ticket #uid.
    // Ideally we want to test with a real title.
    // But mocking the whole Department->Form->Fields chain is complex in a script.
    // We can just rely on 'Ticket #uid' being returned for title, OR subclass Ticket to override accessors for testing? No, too much work.
    // Let's settle for 'Ticket #12345' as title.
    
    // custom_fields need to be valid array if accessed
    $ticket->custom_fields = ['some_field' => 'some_value']; 
    
    $ticket->setRelation('user', $ticketUser);

    // Ticket Created
    echo "  - Handling TicketCreated...\n";
    $ticketListener->handle(new TicketCreated($ticket));

    // Ticket Reply
    echo "  - Handling TicketReplyAdded...\n";
    $reply = new TicketReply();
    $reply->content = "This is a reply.";
    $reply->setRelation('user', $ticketUser);
    $reply->setRelation('ticket', $ticket);
    
    $ticketListener->handle(new TicketReplyAdded($reply));

    // 2. Test Auth Listener
    echo "Testing LogAuthToDiscord listener...\n";
    $authListener = new LogAuthToDiscord($discordService);

    echo "  - Handling Login...\n";
    $loginUser = new User();
    $loginUser->name = 'Auth User';
    $loginUser->email = 'auth@example.com';
    $loginUser->id = 777;
    
    $authListener->handle(new Login('web', $loginUser, false));

    echo "Verification completed successfully.\n";

} catch (\Exception $e) {
    echo "Error during verification: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
