<?php

namespace App\Filament\Resources\Testimonials\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\TextSize;

class TestimonialInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Author')
                    ->schema([
                        Grid::make(3)
                            ->schema([
                                ImageEntry::make('avatar_path')
                                    ->label('Avatar')
                                    ->circular()
                                    ->defaultImageUrl(url('/images/placeholder-avatar.png'))
                                    ->columnSpan(1),
                                Grid::make(1)
                                    ->schema([
                                        TextEntry::make('author_name')
                                            ->label('Name')
                                            ->size(TextSize::Large)
                                            ->weight('bold'),
                                        TextEntry::make('company')
                                            ->label('Company')
                                            ->placeholder('—'),
                                    ])
                                    ->columnSpan(2),
                            ]),
                    ])
                    ->columns(3),
                Section::make('Review')
                    ->schema([
                        TextEntry::make('content')
                            ->label('Testimonial')
                            ->prose()
                            ->columnSpanFull(),
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('rating')
                                    ->label('Rating')
                                    ->formatStateUsing(fn (int $state): string => str_repeat('⭐', $state) . " ({$state}/5)"),
                                IconEntry::make('is_visible')
                                    ->label('Visibility Status')
                                    ->boolean()
                                    ->trueIcon('heroicon-o-eye')
                                    ->falseIcon('heroicon-o-eye-slash')
                                    ->trueColor('success')
                                    ->falseColor('danger'),
                            ]),
                    ]),
                Section::make('Metadata')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextEntry::make('created_at')
                                    ->label('Created')
                                    ->dateTime(),
                                TextEntry::make('updated_at')
                                    ->label('Last Updated')
                                    ->dateTime(),
                            ]),
                    ])
                    ->collapsed(),
            ]);
    }
}
