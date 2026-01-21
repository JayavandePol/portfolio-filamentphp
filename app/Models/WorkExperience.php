<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class WorkExperience extends Model
{
    protected $fillable = [
        'company',
        'position',
        'logo',
        'description',
        'start_date',
        'end_date',
        'is_current',
        'sort_order',
        'is_visible',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'is_visible' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function getLogoUrlAttribute()
    {
        return $this->logo ? Storage::disk('public')->url($this->logo) : null;
    }
}
