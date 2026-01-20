<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Radio;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class TestimonialForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Author Information')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('author_name')
                                    ->label('Author Name')
                                    ->required()
                                    ->maxLength(255),
                                TextInput::make('company')
                                    ->label('Company')
                                    ->maxLength(255),
                            ]),
                        FileUpload::make('avatar_path')
                            ->label('Avatar')
                            ->image()
                            ->imageEditor()
                            ->circleCropper()
                            ->directory('testimonials/avatars')
                            ->maxSize(2048)
                            ->columnSpanFull(),
                    ]),
                Section::make('Testimonial Content')
                    ->schema([
                        Textarea::make('content')
                            ->label('Testimonial')
                            ->required()
                            ->rows(5)
                            ->maxLength(1000)
                            ->columnSpanFull(),
                        Grid::make(2)
                            ->schema([
                                Radio::make('rating')
                                    ->label('Rating')
                                    ->options([
                                        1 => '⭐ 1 Star',
                                        2 => '⭐⭐ 2 Stars',
                                        3 => '⭐⭐⭐ 3 Stars',
                                        4 => '⭐⭐⭐⭐ 4 Stars',
                                        5 => '⭐⭐⭐⭐⭐ 5 Stars',
                                    ])
                                    ->required()
                                    ->default(5)
                                    ->inline()
                                    ->inlineLabel(false),
                                ToggleButtons::make('is_visible')
                                    ->label('Visibility')
                                    ->boolean()
                                    ->grouped()
                                    ->default(false)
                                    ->icons([
                                        true => 'heroicon-o-eye',
                                        false => 'heroicon-o-eye-slash',
                                    ])
                                    ->colors([
                                        true => 'success',
                                        false => 'danger',
                                    ])
                                    ->required(),
                            ]),
                    ]),
            ]);
    }
}
