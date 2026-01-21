#Installation
Install the package via composer and install
composer require jeffgreco13/filament-breezy
php artisan breezy:install
Add Breezy to your Filament Panel
Add Breezy to a panel by adding the class to your Filament Panel's plugin() or plugins([]) method.

use Jeffgreco13\FilamentBreezy\BreezyCore;
 
public function panel(Panel $panel): Panel
{
    return $panel
        ->plugins([
            BreezyCore::make()
        ])
}
Integrate Tailwind classes
Filament recommends developers to create a custom theme to better support a plugin's additional Tailwind classes. After you have created your custom theme, add Breezy's views to your theme's theme.css file usually located in resources/css/filament/admin/theme.css:

@source '../../../../vendor/jeffgreco13/filament-breezy/resources/**/*';
Optionally, you can publish the views
php artisan vendor:publish --tag="filament-breezy-views"
#Usage & Configuration
#Update the auth guard
Breezy will use the authGuard set on the Filament Panel that you create. You may update the authGuard as you please:

use Jeffgreco13\FilamentBreezy\BreezyCore;
 
class CustomersPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ...
            ->authGuard('customers')
            ->plugin(
                BreezyCore::make()
            )
    }
}
NOTE: you must ensure that the model used in your Guard extends the Authenticatable class.

#My Profile
Enable the My Profile page with configuration options.

NOTE: if you are using avatars,

BreezyCore::make()
    ->myProfile(
        shouldRegisterUserMenu: true, // Sets the 'account' link in the panel User Menu (default = true)
        userMenuLabel: 'My Profile', // Customizes the 'account' link label in the panel User Menu (default = null)
        shouldRegisterNavigation: false, // Adds a main navigation item for the My Profile page (default = false)
        navigationGroup: 'Settings', // Sets the navigation group for the My Profile page (default = null)
        hasAvatars: false, // Enables the avatar upload form component (default = false)
        slug: 'my-profile' // Sets the slug for the profile page (default = 'my-profile')
    )
#Custom My Profile page class
You can also use a custom My Profile page class by extending the default one, and registering it with the plugin.

BreezyCore::make()
    ->myProfile()
    ->customMyProfilePage(AccountSettingsPage::class),
#Using avatars in your Panel
The instructions for using custom avatars is found in the Filament v4 docs under Setting up user avatars.

Here is a possible implementation using the example from the docs:

use Illuminate\Support\Facades\Storage;
use Filament\Models\Contracts\HasAvatar;
use Illuminate\Foundation\Auth\User as Authenticatable;
 
class User extends Authenticatable implements FilamentUser, HasAvatar
{
    // ...
 
    public function getFilamentAvatarUrl(): ?string
    {
        return $this->avatar_url ? Storage::url($this->avatar_url) : null;
    }
}
#Customize the avatar upload component
use Filament\Forms\Components\FileUpload;
 
BreezyCore::make()
    ->avatarUploadComponent(fn($fileUpload) => $fileUpload->disableLabel())
    // OR, replace with your own component
    ->avatarUploadComponent(fn() => FileUpload::make('avatar_url')->disk('profile-photos'))
#Add column to table
If you wish to have your own avatar, you need to create a column on the users table named avatar_url. It is reccomended that you create a new migration for it, and add the column there:

php artisan make:migration add_avatar_url_column_to_users_table
<?php
 
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
 
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar_url')->nullable();
        });
    }
 
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatar_url');
        });
    }
};
#Add column to user model
protected $fillable = [
    ...
    'avatar_url',
    ...
];
#Customize password update
You can customize the validation rules for the update password component by passing an array of validation strings, or an instance of the Illuminate\Validation\Rules\Password class.

use Illuminate\Validation\Rules\Password;
 
BreezyCore::make()
    ->passwordUpdateRules(
        rules: [Password::default()->mixedCase()->uncompromised(3)], // you may pass an array of validation rules as well. (default = ['min:8'])
        requiresCurrentPassword: true, // when false, the user can update their password without entering their current password. (default = true)
    )
#Exclude default My Profile components
If you don't want a default My Profile page component to be used, you can exclude them using the withoutMyProfileComponents helper.

BreezyCore::make()
    ->withoutMyProfileComponents([
        'update_password'
    ])
#Create custom My Profile components
You can create a custom Livewire components for the My Profile page and append them easily.

Create a new Livewire component in your project using:
php artisan make:livewire MyCustomComponent
Extend the MyProfileComponent class included with Breezy. This class implements Actions and Forms.
use Jeffgreco13\FilamentBreezy\Livewire\MyProfileComponent;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
 
class MyCustomComponent extends MyProfileComponent
{
    protected string $view = "livewire.my-custom-component";
    public array $only = ['my_custom_field'];
    public array $data;
    public $user;
    public $userClass;
 
    // this example shows an additional field we want to capture and save on the user
    public function mount()
    {
        $this->user = Filament::getCurrentPanel()->auth()->user();
        $this->userClass = get_class($this->user);
 
        $this->form->fill($this->user->only($this->only));
    }
 
    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('my_custom_field')
                    ->required()
            ])
            ->statePath('data');
    }
 
    // only capture the custome component field
    public function submit(): void
    {
        $data = collect($this->form->getState())->only($this->only)->all();
        $this->user->update($data);
        Notification::make()
            ->success()
            ->title(__('Custom component updated successfully'))
            ->send();
    }
}
Within your Livewire component's view, you can use Filament's <x-filament::section> Blade component to match the style:
<x-filament::section :aside="true" heading="Your title" description="This is the description">
    <form wire:submit.prevent="submit" class="space-y-6">
 
        {{ $this->form }}
 
        <div class="text-right">
            <x-filament::button type="submit" form="submit" class="align-right">
                Submit!
            </x-filament::button>
        </div>
    </form>
</x-filament::section>
Finally, register your new component with Breezy:
use App\Livewire\MyCustomComponent;
 
BreezyCore::make()
    ->myProfileComponents([MyCustomComponent::class])
#Override My Profile components
You may override the existing MyProfile components to replace them with your own:

use App\Livewire\MyCustomComponent;
 
BreezyCore::make()
    ->myProfileComponents([
        // 'personal_info' => ,
        'update_password' => MyCustomComponent::class, // replaces UpdatePassword component with your own.
        // 'two_factor_authentication' => ,
        // 'sanctum_tokens' =>
        // 'browser_sessions' =>
    ])
If you want to customize only the fields and notification in the personal info component, you can extend the original breezy component:

namespace App\Livewire;
 
use Filament\Forms;
use Filament\Notifications\Notification;
use Jeffgreco13\FilamentBreezy\Livewire\PersonalInfo;
 
class CustomPersonalInfo extends PersonalInfo
{
    public ?array $only = ['custom_name_field', 'custom_email_field'];
 
    // You can override the default components by returning an array of components.
    protected function getProfileFormComponents(): array
    {
        return [
            $this->getNameComponent(),
            $this->getEmailComponent(),
            $this->getCustomComponent(),
        ];
    }
 
    protected function getNameComponent(): Forms\Components\TextInput
    {
        return Forms\Components\TextInput::make('custom_name_field')
            ->required();
    }
 
    protected function getEmailComponent(): Forms\Components\TextInput
    {
        return Forms\Components\TextInput::make('custom_email_field')
            ->required();
    }
 
    protected function sendNotification(): void
    {
        Notification::make()
            ->success()
            ->title('Saved Data!')
            ->send();
    }
}
Now, as mentioned above, give this component to BreezyCore::make()->myProfileComponents to override the original and use your custom component.

#Sorting My Profile components
Custom MyProfile components can be sorted by setting their static $sort property. This property can be set for existing MyProfile components in any service provider:

TwoFactorAuthentication::setSort(4);
A lot of the time this won't be necessary, though, as the default sort order is spaced out in steps of 10, so there should be enough numbers to place any custom components in between.

#Two Factor Authentication
Add Jeffgreco13\FilamentBreezy\Traits\TwoFactorAuthenticatable to your Authenticatable model:
use Jeffgreco13\FilamentBreezy\Traits\TwoFactorAuthenticatable;
 
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, TwoFactorAuthenticatable;
    // ...
 
}
Enable Two Factor Authentication using the enableTwoFactorAuthentication() method on the Breezy plugin.
BreezyCore::make()
    ->enableTwoFactorAuthentication(
        force: false, // force the user to enable 2FA before they can use the application (default = false)
        action: CustomTwoFactorPage::class, // optionally, use a custom 2FA page
        authMiddleware: MustTwoFactor::class, // optionally, customize 2FA auth middleware or disable it to register manually by setting false
        scopeToPanel: true, // scope the 2FA only to the current panel (default = true)
    )
Adjust the 2FA page
The Breezy 2FA page can be swapped for a custom implementation (see above), same as the Filament auth pages. This allows, for example, to define a custom auth layout like so:

use Jeffgreco13\FilamentBreezy\Pages\TwoFactorPage;
 
class CustomTwoFactorPage extends TwoFactorPage
{
    protected static string $layout = 'custom.auth.layout.view';
}
#Sanctum Personal Access tokens
Since Laravel 11.x Sanctum is no longer included by default. If you don't already have the package installed follow the installation instructions here.

Enable the Sanctum token management component:

BreezyCore::make()
    ->enableSanctumTokens(
        permissions: ['my','custom','permissions'] // optional, customize the permissions (default = ["create", "view", "update", "delete"])
    )
#Password Confirmation Button Action
This button action will prompt the user to enter their password for sensitive actions (eg. delete). This action uses the same 'password_timeout' number of seconds found in config/auth.php.

use Jeffgreco13\FilamentBreezy\Actions\PasswordButtonAction;
use Filament\Support\Icons\Heroicon;
 
PasswordButtonAction::make('secure_action')->action('doSecureAction')
 
// Customize the icon, action, modalHeading and anything else.
PasswordButtonAction::make('secure_action')->label('Delete')->icon(Heroicon::ShieldCheck)->modalHeading('Confirmation')->action(fn() => $this->doAction())
#Browser Sessions
Sanctum’s Browser Sessions feature, which is disabled by default, allows users to manage their active sessions on different devices and remotely log out of other browser sessions, enhancing account security. To enable this feature, you must use the enableBrowserSessions method. This requires your session driver to be database.

#Enabling Browser Sessions
To enable the Browser Sessions feature, use the enableBrowserSessions method in BreezyCore:

BreezyCore::make()
    ->enableBrowserSessions(condition: true) // Enable the Browser Sessions feature (default = true)
#Viewing Active Sessions
On the user's profile page, active sessions are displayed with device information, including:

Browser and platform of the device
IP address
Last activity of the session
#Logging Out of Other Browser Sessions
Users can log out of other active sessions by entering their password for confirmation. This allows them to securely log out of all other active sessions on other devices.

#Additional Configuration
If you want to customize the component or modify its behavior, you can override the browser_sessions component in the myProfileComponents method:

BreezyCore::make()
    ->myProfileComponents([
        'browser_sessions' => \App\Livewire\CustomBrowserSessions::class, // Your custom component
    ])
#FAQ
How do 2FA sessions work across multiple panels?

By default, Breezy uses the same guard as defined on your Panel. The default is 'web'. Only panels that have registered the BreezyCore plugin will have access to 2FA. If multiple panels use 2FA, and share the same guard, the User only has to enter the OTP once for the duration of the session.

How does 2FA interact with MustVerifyEmail?

When 2FA is properly configured, and the User is prompted for the OTP code before email verification.

How long does the 2FA session last?

The 2FA session is the same as the Laravel session lifetime. Once the user is logged out, or the session expires, they will need to enter the OTP code again.