<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SettingAbsensi extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'settingabsensi';
    protected $fillable =
    [
        'checkin',
        'checkout',
        'status'
    ];
}
