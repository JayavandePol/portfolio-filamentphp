<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectAdminToDashboard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // If user is logged in and is admin, redirect to admin panel
        if (auth()->check() && auth()->user()->email === 'jayavandepol@hotmail.com') {
            return redirect()->to(\Filament\Pages\Dashboard::getUrl(panel: 'admin'));
        }

        return $next($request);
    }
}
