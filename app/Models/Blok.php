<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Lokasi;

class Blok extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'blok';
    protected $fillable =
    [
        'id',
        'lokasi_id',
        'tipe_id',
        'blok',
        'status'
    ];

    /**
     * Get the lokasi that owns the Blok
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasi(): BelongsTo
    {
        return $this->belongsTo(Lokasi::class, 'lokasi_id', 'id');
    }

    /**
     * Get the tipe that owns the Blok
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tipe(): BelongsTo
    {
        return $this->belongsTo(Tipe::class, 'tipe_id', 'id');
    }
}
