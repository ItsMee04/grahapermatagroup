<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'absensi';
    protected $fillable =
    [
        'checkin',
        'checkout',
        'latitude',
        'longitude',
        'image',
        'user_id',
        'status'
    ];
}
