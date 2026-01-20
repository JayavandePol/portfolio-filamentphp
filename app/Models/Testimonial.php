<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_name',
        'company',
        'content',
        'rating',
        'is_visible',
        'avatar_path',
    ];

    protected $casts = [
        'rating' => 'integer',
        'is_visible' => 'boolean',
    ];
}
