<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/app.jsx'])
        @inertiaHead
        
        @php
            $favicon = \App\Models\Setting::get('site_favicon');
        @endphp
        @if($favicon)
            <link rel="icon" href="{{ \Illuminate\Support\Facades\Storage::url($favicon) }}">
        @endif
    </head>
    <body class="antialiased">
        @inertia
    </body>
</html>
