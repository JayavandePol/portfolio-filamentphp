<?php

namespace App\Filament\Resources\Projects\Schemas;

use App\Enums\ProjectStatus;
use App\Models\Category;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
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
                        TextInput::make('summary')
                            ->label('Summary')
                            ->helperText('Short description for project cards')
                            ->maxLength(300)
                            ->columnSpanFull(),
                        RichEditor::make('description')
                            ->label('Full Description')
                            ->helperText('Detailed project description for the project page')
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
                            ->disk('public')
                            ->directory('projects/heroes')
                            ->visibility('public')
                            ->columnSpanFull(),
                        Select::make('categories')
                            ->relationship('categories', 'name')
                            ->multiple()
                            ->preload()
                            ->searchable()
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
                        Toggle::make('is_featured')
                            ->label('Featured Project')
                            ->helperText('Featured projects appear on the homepage')
                            ->default(false),
                        TextInput::make('url')
                            ->label('Project URL')
                            ->url()
                            ->placeholder('https://example.com')
                            ->columnSpanFull(),
                    ]),
                Section::make('SEO')
                    ->schema([
                        TextInput::make('meta_title')
                            ->label('Meta Title')
                            ->maxLength(60)
                            ->helperText('Recommended: 50-60 characters'),
                        Textarea::make('meta_description')
                            ->label('Meta Description')
                            ->maxLength(160)
                            ->rows(3)
                            ->helperText('Recommended: 150-160 characters')
                            ->columnSpanFull(),
                        FileUpload::make('og_image')
                            ->label('Social Share Image (OG Image)')
                            ->image()
                            ->disk('public')
                            ->directory('projects/og')
                            ->visibility('public')
                            ->helperText('Recommended: 1200x630px')
                            ->columnSpanFull(),
                    ])
                    ->collapsed(),
            ]);
    }
}
