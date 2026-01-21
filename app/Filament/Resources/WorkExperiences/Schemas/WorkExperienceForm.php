<?php

namespace App\Filament\Resources\WorkExperiences\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class WorkExperienceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(2)->schema([
                    TextInput::make('company')
                        ->required()
                        ->maxLength(255),
                    
                    TextInput::make('position')
                        ->required()
                        ->maxLength(255),
                ]),

                FileUpload::make('logo')
                    ->image()
                    ->disk('public')
                    ->directory('work-experience')
                    ->visibility('public')
                    ->imageEditor()
                    ->columnSpanFull(),

                RichEditor::make('description')
                    ->toolbarButtons([
                        'bold',
                        'bulletList',
                        'italic',
                        'link',
                        'orderedList',
                    ])
                    ->columnSpanFull(),

                Grid::make(3)->schema([
                    DatePicker::make('start_date')
                        ->required()
                        ->native(false),
                    
                    DatePicker::make('end_date')
                        ->native(false)
                        ->hidden(fn ($get) => $get('is_current')),
                    
                    Toggle::make('is_current')
                        ->default(false)
                        ->live()
                        ->inline(false),
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
