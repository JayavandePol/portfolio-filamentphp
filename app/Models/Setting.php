<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Setting extends Model
{
    protected $fillable = ['key', 'value'];

    protected $primaryKey = 'key';
    public $incrementing = false;
    protected $keyType = 'string';

    // Helper to get a setting
    public static function get(string $key, $default = null)
    {
        $setting = self::find($key);
        return $setting ? $setting->value : $default;
    }

    // Helper to set a setting
    public static function set(string $key, $value)
    {
        return self::updateOrCreate(
            ['key' => $key],
            ['value' => $value]
        );
    }
}
