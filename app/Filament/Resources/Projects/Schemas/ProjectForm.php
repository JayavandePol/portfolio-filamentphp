<?php

namespace App\Filament\Resources\Projects\Schemas;

use App\Enums\ProjectStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProjectForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Project Details')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(fn (string $operation, $state, callable $set) => 
                                        $operation === 'create' ? $set('slug', Str::slug($state)) : null
                                    ),
                                TextInput::make('slug')
                                    ->required()
                                    ->maxLength(255)
                                    ->unique(ignoreRecord: true),
                            ]),
                        RichEditor::make('description')
                            ->label('Project Description')
                            ->toolbarButtons([
                                'bold',
                                'italic',
                                'link',
                                'bulletList',
                                'orderedList',
                                'h2',
                                'h3',
                            ])
                            ->columnSpanFull(),
                        FileUpload::make('hero_image')
                            ->label('Hero Image')
                            ->image()
                            ->imageEditor()
                            ->directory('projects/heroes')
                            ->columnSpanFull(),
                    ]),
                Section::make('Publication')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                Select::make('status')
                                    ->options([
                                        ProjectStatus::Draft->value => ProjectStatus::Draft->getLabel(),
                                        ProjectStatus::Published->value => ProjectStatus::Published->getLabel(),
                                        ProjectStatus::Archived->value => ProjectStatus::Archived->getLabel(),
                                    ])
                                    ->default(ProjectStatus::Draft->value)
                                    ->required(),
                                DateTimePicker::make('published_at')
                                    ->label('Publish Date'),
                                TextInput::make('sort_order')
                                    ->label('Sort Order')
                                    ->numeric()
                                    ->default(0)
                                    ->required(),
                            ]),
                        TextInput::make('url')
                            ->label('Project URL')
                            ->url()
                            ->placeholder('https://example.com')
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
