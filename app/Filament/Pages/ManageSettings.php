<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Actions\Action;
use Filament\Forms\Contracts\HasForms;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Schemas\Schema;

class ManageSettings extends Page implements HasForms
{
    use InteractsWithForms;

    protected static string | \BackedEnum | null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected string $view = 'filament.pages.manage-settings';

    protected static string | \UnitEnum | null $navigationGroup = 'Settings';

    protected static ?string $title = 'Site Settings';

    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'site_favicon' => Setting::get('site_favicon'),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                FileUpload::make('site_favicon')
                    ->label('Site Favicon')
                    ->image()
                    ->acceptedFileTypes(['image/png', 'image/jpeg', 'image/x-icon', 'image/vnd.microsoft.icon'])
                    ->directory('settings')
                    ->visibility('public'),
            ])
            ->statePath('data');
    }

    protected function getFormActions(): array
    {
        return [
            Action::make('save')
                ->label('Save Changes')
                ->submit('save'),
        ];
    }

    public function save(): void
    {
        $data = $this->form->getState();

        Setting::set('site_favicon', $data['site_favicon']);

        Notification::make()
            ->title('Settings saved successfully.')
            ->success()
            ->send();
    }
}
