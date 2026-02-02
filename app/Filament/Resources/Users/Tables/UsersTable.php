<?php

namespace App\Filament\Resources\Users\Tables;

use App\Models\User;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Notifications\Notification;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('Email Address')
                    ->searchable()
                    ->sortable()
                    ->copyable(),
                TextColumn::make('email_verified_at')
                    ->label('Email Verified')
                    ->dateTime()
                    ->sortable()
                    ->badge()
                    ->color(fn($state) => $state ? 'success' : 'danger')
                    ->formatStateUsing(fn($state) => $state ? 'Verified' : 'Not Verified'),
                TextColumn::make('two_factor_secret')
                    ->label('2FA Enabled')
                    ->badge()
                    ->color(fn($state) => $state ? 'success' : 'gray')
                    ->formatStateUsing(fn($state) => $state ? 'Enabled' : 'Disabled'),
                TextColumn::make('created_at')
                    ->label('Registered')
                    ->dateTime()
                    ->sortable()
                    ->since(),
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TernaryFilter::make('email_verified_at')
                    ->label('Verified Users')
                    ->placeholder('All Users')
                    ->trueLabel('Verified Users')
                    ->falseLabel('Unverified Users')
                    ->queries(
                        true: fn(Builder $query) => $query->whereNotNull('email_verified_at'),
                        false: fn(Builder $query) => $query->whereNull('email_verified_at'),
                    ),
            ])
            ->actions([
                EditAction::make(),
                ActionGroup::make([
                    Action::make('verify')
                        ->label('Verify User')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->action(fn(User $record) => $record->markEmailAsVerified())
                        ->visible(fn(User $record) => ! $record->hasVerifiedEmail()),
                    Action::make('unverify')
                        ->label('Unverify User')
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->action(function (User $record) {
                            $record->update(['email_verified_at' => null]);
                        })
                        ->visible(fn(User $record) => $record->hasVerifiedEmail()),
                    Action::make('resend_verification')
                        ->label('Send Verification Email')
                        ->icon('heroicon-o-envelope')
                        ->action(function (User $record) {
                            $record->sendEmailVerificationNotification();
                            Notification::make()
                                ->title('Verification sent')
                                ->success()
                                ->send();
                        })
                        ->visible(fn(User $record) => ! $record->hasVerifiedEmail()),
                    Action::make('send_password_reset')
                        ->label('Send Password Reset')
                        ->icon('heroicon-o-key')
                        ->requiresConfirmation()
                        ->action(function (User $record) {
                            $status = \Illuminate\Support\Facades\Password::broker()->sendResetLink(
                                ['email' => $record->email]
                            );

                            if ($status === \Illuminate\Support\Facades\Password::RESET_LINK_SENT) {
                                Notification::make()
                                    ->title(__($status))
                                    ->success()
                                    ->send();
                            } else {
                                Notification::make()
                                    ->title(__($status))
                                    ->danger()
                                    ->send();
                            }
                        }),
                ]),

            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
