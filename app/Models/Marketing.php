<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marketing extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'marketing';
    protected $fillable =
    [
        'konsumen',
        'alamat',
        'kontak',
        'progres',
        'lokasi_id',
        'tipe_id',
        'blok_id',
        'metodepembayaran_id',
        'image_ktp',
        'image_kk',
        'image_npwp',
        'image_slipgaji',
        'image_tambahan',
        'image_buktibooking',
        'image_sp3bank',
        'image_survey',
        'tanggalsp3',
        'tanggalkomunikasi',
        'tanggalbooking',
        'sumber',
        'user_id',
        'status'
    ];
}
