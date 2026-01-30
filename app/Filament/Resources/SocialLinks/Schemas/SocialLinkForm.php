<?php

namespace App\Filament\Resources\SocialLinks\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class SocialLinkForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)->schema([
                    Select::make('platform')
                        ->required()
                        ->options([
                            'GitHub' => 'GitHub',
                            'LinkedIn' => 'LinkedIn',
                            'Twitter' => 'Twitter',
                            'Instagram' => 'Instagram',
                            'Facebook' => 'Facebook',
                            'YouTube' => 'YouTube',
                            'Dribbble' => 'Dribbble',
                            'Behance' => 'Behance',
                            'Other' => 'Other',
                        ])
                        ->searchable(),

                    TextInput::make('url')
                        ->required()
                        ->url()
                        ->maxLength(255)
                        ->placeholder('https://github.com/username'),
                ]),

                Grid::make(3)->schema([
                    \Filament\Forms\Components\Select::make('icon')
                        ->label('Icon')
                        ->options(\App\Support\LucideIcons::all())
                        ->searchable()
                        ->placeholder('Search for an icon...')
                        ->helperText('Select a Lucide icon for this platform'),

                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0),

                    Toggle::make('is_visible')
                        ->default(true)
                        ->inline(false),
                ]),
            ]);
    }
}
