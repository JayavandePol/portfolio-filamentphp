#Installation
You can install the package via composer:

composer require daacreators/creators-ticketing
After installation, publish the config file:

php artisan vendor:publish --tag=#61;"#34;creators-ticketing-config"#34;
#Setup: Filament Panel Integration
The plugin integration code should be added to your main Filament admin panel provider file, which is typically located at:

app/Providers/Filament/AdminPanelProvider.php
Open your AdminPanelProvider.php file and modify the panel() method as shown below:

use Filament\Panel;
use Filament\PanelProvider;
use daacreators\CreatorsTicketing\TicketingPlugin;
 
class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->gt;default()
            ->gt;plugins([
                TicketingPlugin::make(),
            ]);
    }
}
Run the migrations:

php artisan migrate
#Seeding Ticket Statuses
After running migrations, you can seed default ticket statuses using the provided seeder:

php artisan db:seed --class=daacreatorstors\\CreatorsTicketing\\Database\\Seeders\\TicketStatusSeeder
This will create the following default ticket statuses:

Open (Blue) - Default status for new tickets
In Progress (Amber) - Tickets being worked on
Answered (Green) - Tickets that have been answered
Pending (Purple) - Tickets waiting for response
Resolved (Green) - Tickets that have been resolved
Closed (Gray) - Closing status for completed tickets
The seeder uses updateOrCreate to prevent duplicates, so you can safely run it multiple times.

#Upgrading
#Upgrading from v1.1.8 to v1.1.9
⚠️ Important: Version v1.1.9 and introduces new fields to the database table. If you are upgrading from a previous version, you must run the migrations after updating the package to ensure the system functions correctly:

php artisan migrate
#Configuration
#Basic Configuration
Configure the package by setting values in your .env file or directly in the config/creators-ticketing.php file:

TICKETING_NAV_GROUP=#61;"#34;Creators Ticketing"#34;
 
USER_MODEL=#61;"#34;\App\Models\User"#34;
 
TICKETING_NAV_FIELD=#61;email
TICKETING_NAV_ALLOWED=#61;admin@#64;demo.com,manager@#64;demo.com
#Navigation Visibility
You can control who sees the ticketing resources in the admin panel by configuring the navigation visibility rules:

'#039;navigation_visibility'#039; =>61;> [
    '#039;field'#039; =>61;> '#039;email'#039;,
    '#039;allowed'#039; =>61;> ['#039;admin@site.com.com'#039;, '#039;manager@site.com.com'#039;]
],
#Multi-language Support
This plugin is fully localized and supports multiple languages out of the box. It automatically detects and uses your application's current locale configuration (ion (config/app.php).

Currently supported languages:

🇺🇸 English (en) - Default
🇪🇸 Spanish (es)
🇧🇷 Portuguese (Brazil) (pt_BR)
🇫🇷 French (fr)
🇩🇪 German (de)
🇸🇦 Arabic (ar)
🇨🇳 Chinese (Simplified) (zh_CN)
#Publishing Translations
If you wish to modify the texts or add a new language, you can publish the translation files:

php artisan vendor:publish --tag=#61;"#34;creators-ticketing-translations"#34;
#Usage
#Creating Forms
Go to the Forms section in the admin panel
Create a new form with custom fields
#Setting Up Departments
Navigate to the Filament admin panel
Go to the Departments section
Create departments and assign agents
Assign the form to specific departments
#Managing Tickets
Tickets can be managed through the Filament admin panel. You can:

View all tickets (New updates are marked with a "NEW" badge); badge)
Assign tickets to agents
Change ticket status
Add internal notes
Communicate with users
Track ticket activities
#Frontend Integration
To add the tickets and ticket submission form to your frontend:

@livewirewire('#039;creators-ticketing::ticket-submit-form'#039;)
#Dashboard Widget
The package includes a ticket statistics widget. Add it to your Filament dashboard:

use daacreators\CreatorsTicketing\Filament\Widgets\TicketStatsWidget;
 
class DashboardConfig extends Config
{
    public function widgets(): array
    {
        return [
            TicketStatsWidget::class,
        ];
    }
}
#Events System
The plugin dispatches events for major ticket actions, allowing you to extend functionality with custom listeners.

#Available Events
All events are located in the daacreators\CreatorsTicketing\Events namespace:

Event	Triggered When	Properties
TicketCreated	A new ticket is created	Ticket $ticket, ?User $user
TicketAssigned	Ticket is assigned/reassigned	Ticket $ticket, ?int $oldAssigneeId, ?int $newAssigneeId, ?User $assignedBy
TicketStatusChanged	Ticket status changes	Ticket $ticket, ?TicketStatus $oldStatus, TicketStatus $newStatus, ?User $changedBy
TicketPriorityChanged	Ticket priority changes	Ticket $ticket, TicketPriority $oldPriority, TicketPriority $newPriority, ?User $changedBy
TicketTransferred	Ticket moved to another department	Ticket $ticket, Department $oldDepartment, Department $newDepartment, ?User $transferredBy
TicketReplyAdded	Public reply added to ticket	Ticket $ticket, TicketReply $reply
InternalNoteAdded	Internal note added	Ticket $ticket, TicketReply $note
TicketClosed	Ticket status changed to closing status	Ticket $ticket, ?User $closedBy
TicketDeleted	Ticket is deleted	int $ticketId, string $ticketUid, ?User $deletedBy
Model Classes:

Ticket → daacreators\CreatorsTicketing\Models\Ticket
TicketStatus → daacreators\CreatorsTicketing\Models\TicketStatus
TicketReply → daacreators\CreatorsTicketing\Models\TicketReply
Department → daacreators\CreatorsTicketing\Models\Department
TicketPriority → daacreators\CreatorsTicketing\Enums\TicketPriority (Enum)
User → Your configured user model (default: App\Models\User)
Note: Properties marked with ? are nullable and may be null in certain contexts.

#Automation Rules
Automation rules allow you to automate actions on tickets based on specific events and conditions.

#Supported Events
Ticket created
Ticket updated
Status changed
Priority Changed
Ticket assigned
Reply Added
Internal Note Added
#Conditions
Department
Form
Status
Priority
Assignee
Requester
Created within X hours
Last activity within X hours
#Actions
Assign ticket to agent
Change ticket status
Change ticket priority
Transfer ticket to another department
Add internal note
Add public reply
#Managing Spam Filters
Navigate to Spam Filters in the admin panel
Click Create to add a new filter
Select the filter type and action (block/allow)
Add values (keywords, emails, IPs, or patterns)
Set priority (higher numbers execute first)
Optionally add a reason for internal reference
in config/creators-ticketing.php:

'#039;spam_protection'#039; =>61;> [
    '#039;enabled'#039; =>61;> env('#039;TICKETING_SPAM_PROTECTION'#039;, true),
    '#039;rate_limiting'#039; =>61;> [
        '#039;enabled'#039; =>61;> true,
        '#039;max_tickets_per_hour'#039; =>61;> 5,
        '#039;max_tickets_per_day'#039; =>61;> 20,
    ],
    '#039;content_filtering'#039; =>61;> [
        '#039;enabled'#039; =>61;> true,
        '#039;check_links'#039; =>61;> true,
        '#039;max_links_allowed'#039; =>61;> 3,
    ],
],
#Viewing Spam Logs
All blocked submissions are logged with complete details:

Date and time of attempt
User information
Email and IP address
Filter type that triggered
Matched value
Complete ticket data that was submitted
Access spam logs through Spam Logs in the admin panel.

#Security
The package includes built-in security features:

Private file storage for attachments
Permission-based access control
Department-level agent restrictions