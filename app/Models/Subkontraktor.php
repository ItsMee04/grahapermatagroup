<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subkontraktor extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'subkontraktor';
    protected $fillable =
    [
        'id',
        'subkontraktor',
        'status'
    ];
}
