<?php

namespace App\Filament\Resources\Skills\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class SkillForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),

                    \Filament\Forms\Components\Select::make('icon')
                        ->label('Icon')
                        ->options(\App\Support\LucideIcons::all())
                        ->searchable()
                        ->placeholder('Search for an icon...')
                        ->helperText('Select a Lucide icon for this skill'),
                ]),

                Grid::make(2)->schema([
                    ColorPicker::make('color')
                        ->required()
                        ->default('#8b5cf6'),

                    TextInput::make('proficiency')
                        ->required()
                        ->numeric()
                        ->default(50)
                        ->minValue(0)
                        ->maxValue(100)
                        ->suffix('%')
                        ->helperText('Skill proficiency (0-100)'),
                ]),

                Grid::make(2)->schema([
                    TextInput::make('sort_order')
                        ->numeric()
                        ->default(0)
                        ->helperText('Lower numbers appear first'),

                    Toggle::make('is_visible')
                        ->default(true)
                        ->inline(false),
                ]),
            ]);
    }
}
