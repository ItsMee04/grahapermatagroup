<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pegawai extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at', 'deleted_at']; // Menyembunyikan created_at dan updated_at secara global
    protected $table    = 'pegawai';
    protected $fillable =
    [
        'nip',
        'nama',
        'jeniskelamin_id',
        'agama_id',
        'tempat',
        'tanggal',
        'jabatan_id',
        'kontak',
        'alamat',
        'image',
        'status'
    ];

    /**
     * Get the jeniskalmin that owns the Pegawai
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function jeniskalmin(): BelongsTo
    {
        return $this->belongsTo(JenisKelamin::class, 'jeniskelamin_id', 'id');
    }

    /**
     * Get the agama that owns the Pegawai
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function agama(): BelongsTo
    {
        return $this->belongsTo(Agama::class, 'agama_id', 'id');
    }

    /**
     * Get the jabatan that owns the Pegawai
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function jabatan(): BelongsTo
    {
        return $this->belongsTo(Jabatan::class, 'jabatan_id', 'id');
    }
}
