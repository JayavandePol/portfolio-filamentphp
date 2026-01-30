<?php

namespace App\Filament\Dashboard\Pages;

use Filament\Pages\Page;

class MyTickets extends Page
{
    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-ticket';

    protected string $view = 'filament.dashboard.pages.my-tickets';

    protected static ?string $navigationLabel = 'My Tickets';

    protected static ?string $title = 'Support Tickets';
}
