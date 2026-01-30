<?php

namespace App\Http\Responses;

use Filament\Facades\Filament;
use Illuminate\Http\RedirectResponse;
use Filament\Http\Responses\Auth\LogoutResponse as BaseLogoutResponse;

class CustomLogoutResponse extends BaseLogoutResponse
{
    public function toResponse($request): RedirectResponse
    {
        // Always redirect to homepage after logout
        return redirect('/');
    }
}
