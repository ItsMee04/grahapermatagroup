<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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


    /**
     * Get the metodepembayaran that owns the Marketing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function metodepembayaran(): BelongsTo
    {
        return $this->belongsTo(MetodePembayaran::class, 'metodepembayaran_id', 'id');
    }

    /**
     * Get the lokasi that owns the Marketing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasi(): BelongsTo
    {
        return $this->belongsTo(Lokasi::class, 'lokasi_id', 'id');
    }

    /**
     * Get the tipe that owns the Marketing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tipe(): BelongsTo
    {
        return $this->belongsTo(Tipe::class, 'tipe_id', 'id');
    }

    /**
     * Get the blok that owns the Marketing
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function blok(): BelongsTo
    {
        return $this->belongsTo(Blok::class, 'blok_id', 'id');
    }

    /**
     * Get the produksi associated with the Marketing
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function produksi(): HasOne
    {
        return $this->hasOne(Produksi::class, 'konsumen_id', 'id');
    }
}
