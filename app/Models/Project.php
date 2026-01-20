<?php

namespace App\Models;

use App\Enums\ProjectStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'hero_image',
        'status',
        'published_at',
        'url',
        'sort_order',
    ];

    protected $casts = [
        'status' => ProjectStatus::class,
        'published_at' => 'datetime',
        'sort_order' => 'integer',
    ];
}
