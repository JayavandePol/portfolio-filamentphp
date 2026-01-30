<?php

namespace App\Filament\Dashboard\Widgets;

use Filament\Widgets\Widget;

class QuickLinksWidget extends Widget
{
    protected string $view = 'filament.dashboard.widgets.quick-links-widget';

    protected int|string|array $columnSpan = 'full';
}
