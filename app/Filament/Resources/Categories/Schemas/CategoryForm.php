<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state))),
                    
                    TextInput::make('slug')
                        ->required()
                        ->maxLength(255)
                        ->unique(ignoreRecord: true),
                ]),

                Textarea::make('description')
                    ->rows(3)
                    ->columnSpanFull(),

                Grid::make(3)->schema([
                    ColorPicker::make('color')
                        ->required()
                        ->default('#8b5cf6'),
                    
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
