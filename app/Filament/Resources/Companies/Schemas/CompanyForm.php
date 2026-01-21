<?php

namespace App\Filament\Resources\Companies\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class CompanyForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)->schema([
                    TextInput::make('name')
                        ->required()
                        ->maxLength(255),
                    
                    TextInput::make('url')
                        ->url()
                        ->maxLength(255)
                        ->placeholder('https://example.com'),
                ]),

                FileUpload::make('logo')
                    ->image()
                    ->disk('public')
                    ->directory('companies')
                    ->visibility('public')
                    ->imageEditor()
                    ->columnSpanFull(),

                Grid::make(2)->schema([
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
