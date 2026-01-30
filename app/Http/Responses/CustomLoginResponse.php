<?php

namespace App\Http\Responses;

use Filament\Pages\Dashboard;
use Illuminate\Http\RedirectResponse;
use Livewire\Features\SupportRedirects\Redirector;
use Filament\Http\Responses\Auth\LoginResponse as BaseLoginResponse;

class CustomLoginResponse extends BaseLoginResponse
{
    public function toResponse($request): RedirectResponse|Redirector
    {
        // Redirect admin to admin panel
        if (auth()->user()->email === 'jayavandepol@hotmail.com') {
            return redirect()->to(Dashboard::getUrl(panel: 'admin'));
        }

        // Redirect regular users to dashboard panel
        return parent::toResponse($request);
    }
}
