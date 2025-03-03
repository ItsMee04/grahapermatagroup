<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Produksi extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'produksi';
    protected $fillable =
    [
        'konsumen_id',
        'lokasi_id',
        'tipe_id',
        'blok_id',
        'hargaborongan',
        'nilaiborongan',
        'keterangan',
        'tambahan',
        'potongan',
        'progresrumah',
        'tanggalspk',
        'spk',
        'tanggaltermin1',
        'nominaltermin1',
        'tanggaltermin2',
        'nominaltermin2',
        'tanggaltermin3',
        'nominaltermin3',
        'tanggaltermin4',
        'nominaltermin4',
        'tanggalretensi',
        'nominalretensi',
        'listrik',
        'air',
        'sisa',
        'subkon_id',
        'mandor',
        'user_id',
        'statusproses',
        'status',
    ];

    /**
     * Get the marketing that owns the Produksi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function marketing(): BelongsTo
    {
        return $this->belongsTo(Marketing::class, 'konsumen_id', 'id');
    }

    /**
     * Get the lokasi that owns the Produksi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasi(): BelongsTo
    {
        return $this->belongsTo(Lokasi::class, 'lokasi_id', 'id');
    }

    /**
     * Get the tipe that owns the Produksi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function tipe(): BelongsTo
    {
        return $this->belongsTo(Tipe::class, 'tipe', 'id');
    }

    /**
     * Get the blok that owns the Produksi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function blok(): BelongsTo
    {
        return $this->belongsTo(Blok::class, 'blok_id', 'id');
    }

    /**
     * Get the subkontraktor that owns the Produksi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function subkontraktor(): BelongsTo
    {
        return $this->belongsTo(Subkontraktor::class, 'subkon_id', 'id');
    }

    /**
     * Get the user that owns the Produksi
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
