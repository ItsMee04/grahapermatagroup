<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DataKonsumen extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'datakonsumen';
    protected $fillable =
    [
        'konsumen_id',
        'lokasi_id',
        'ajbnotaris',
        'ajbbank',
        'ttddirektur',
        'sertifikat',
        'image_bukti',
        'keterangan',
        'user_id',
        'status'
    ];

    /**
     * Get the marketing that owns the DataKonsumen
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function marketing(): BelongsTo
    {
        return $this->belongsTo(Marketing::class, 'konsumen_id', 'id');
    }

    /**
     * Get the lokasi that owns the DataKonsumen
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasi(): BelongsTo
    {
        return $this->belongsTo(Lokasi::class, 'lokasi_id', 'id');
    }
}
