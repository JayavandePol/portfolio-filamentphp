<?php

namespace App\Providers;

use App\Models\SocialLink;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Share social links with all Inertia views
        Inertia::share([
            'socialLinks' => fn () => SocialLink::where('is_visible', true)
                ->orderBy('sort_order')
                ->orderBy('platform')
                ->get(['id', 'platform', 'url', 'icon']),
        ]);
    }
}
