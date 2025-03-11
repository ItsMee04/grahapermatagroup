<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CashBesar extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'cashbesar';
    protected $fillable =
    [
        'lokasi_id',
        'konsumen_id',
        'rekening_id',
        'tanggal',
        'keterangan',
        'debit',
        'kredit',
        'jumlah',
        'buktibayar',
        'user_id',
        'status'
    ];

    /**
     * Get the lokasi that owns the CashBesar
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function lokasi(): BelongsTo
    {
        return $this->belongsTo(lokasi::class, 'lokasi_id', 'id');
    }

    /**
     * Get the marketing that owns the CashBesar
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function marketing(): BelongsTo
    {
        return $this->belongsTo(Marketing::class, 'konsumen_id', 'id');
    }

    /**
     * Get the rekening that owns the CashBesar
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function rekening(): BelongsTo
    {
        return $this->belongsTo(Rekening::class, 'rekening_id', 'id');
    }

    /**
     * Get the user that owns the CashBesar
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
