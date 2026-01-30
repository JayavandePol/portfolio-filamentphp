<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Jeffgreco13\FilamentBreezy\Traits\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Database\Eloquent\Builder;

class User extends Authenticatable implements FilamentUser, MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable, Prunable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Get the prunable model query.
     * Verwijdert gebruikers die zich registreerden maar niet binnen 1 uur verifieerden.
     */
    public function prunable(): Builder
    {
        return self::where('email_verified_at', null)
            ->where('created_at', '<=', now()->subHour());
    }

    public function canAccessPanel(Panel $panel): bool
    {
        // For the Admin Panel (id: 'admin')
        if ($panel->getId() === 'admin') {
            // ONLY admins can access
            return $this->email === 'jayavandepol@hotmail.com';
        }

        // For the User Dashboard (id: 'dashboard')
        if ($panel->getId() === 'dashboard') {
            return true;
        }

        return true;
    }
}
