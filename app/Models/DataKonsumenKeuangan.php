<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DataKonsumenKeuangan extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'datakonsumenkeuangan';
    protected $fillable =
    [
        'konsumen_id',
        'hargabrosur',
        'diskon',
        'hargadeal',
        'uangmuka',
        'kpr',
        'user_id',
        'status'
    ];

    /**
     * Get the marketing that owns the DataKonsumenKeuangan
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function marketing(): BelongsTo
    {
        return $this->belongsTo(Marketing::class, 'konsumen_id', 'id');
    }

    /**
     * Get the user that owns the DataKonsumenKeuangan
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
