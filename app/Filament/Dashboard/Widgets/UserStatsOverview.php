<?php

namespace App\Filament\Dashboard\Widgets;

use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Facades\Auth;

class UserStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $user = Auth::user();
        $is2faEnabled = $user->hasEnabledTwoFactor();

        return [
            Stat::make('Account Security', $is2faEnabled ? 'Protected' : 'Unsecured')
                ->description($is2faEnabled ? 'Two-Factor Authentication Enabled' : 'Enable 2FA in Profile to secure account')
                ->descriptionIcon($is2faEnabled ? 'heroicon-m-shield-check' : 'heroicon-m-exclamation-triangle')
                ->color($is2faEnabled ? 'success' : 'danger'),

            // You could add more stats here, e.g. Open Tickets count if relevant
        ];
    }
}
