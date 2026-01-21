<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SocialLinksSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('social_links')->insert([
            [
                'platform' => 'GitHub',
                'url' => 'https://github.com/example',
                'icon' => 'Github',
                'sort_order' => 1,
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'LinkedIn',
                'url' => 'https://linkedin.com/in/example',
                'icon' => 'Linkedin',
                'sort_order' => 2,
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'Twitter',
                'url' => 'https://twitter.com/example',
                'icon' => 'Twitter',
                'sort_order' => 3,
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'Discord',
                'url' => 'https://discord.com/users/example',
                'icon' => 'Discord',
                'sort_order' => 4,
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'TikTok',
                'url' => 'https://tiktok.com/@example',
                'icon' => 'Tiktok',
                'sort_order' => 5,
                'is_visible' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
