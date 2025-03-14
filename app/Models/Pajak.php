<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pajak extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'pajak';
    protected $fillable =
    [
        'id',
        'konsumen_id',
        'lokasipajak_id',
        'hargatransaksi',
        'nominalpph',
        'tanggalinputpph',
        'image_inputpph',
        'tanggalbayarpph',
        'tanggallaporpph',
        'image_laporpph',
        'nominalppnkeluar',
        'tanggalinputppn',
        'image_inputppn',
        'tanggalbayarppn',
        'tanggallaporppn',
        'image_laporppn',
        'nominalppnmasuk',
        'tanggalinputlaporppn',
        'keterangan',
        'user_id',
        'status'
    ];

    /**
     * Get the marketing that owns the Pajak
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function marketing(): BelongsTo
    {
        return $this->belongsTo(Marketing::class, 'konsumen_id', 'id');
    }

    /**
     * Get the lokasipajak that owns the Pajak
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasipajak(): BelongsTo
    {
        return $this->belongsTo(LokasiPajak::class, 'lokasipajak_id', 'id');
    }

    /**
     * Get the user that owns the Pajak
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
