<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DataKonsumenKeuangan2 extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'datakonsumenkeuangan2';
    protected $fillable =
    [
        'datakonsumenkeuangan_id',
        'tanggal',
        'keterangan',
        'biayamasuk',
        'biayakeluar',
        'user_id',
        'status'
    ];

    /**
     * Get the DataKonsumenKeuangan that owns the DataKonsumenKeuangan2
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function DataKonsumenKeuangan(): BelongsTo
    {
        return $this->belongsTo(DataKonsumenKeuangan::class, 'datakonsumenkeuangan_id', 'id');
    }

    /**
     * Get the user that owns the DataKonsumenKeuangan2
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
