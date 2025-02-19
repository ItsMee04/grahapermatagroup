<?php

namespace Database\Seeders;

use Carbon\Carbon;
use App\Models\Pegawai;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PegawaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pegawai::create([
            'nip'               =>  'P100120',
            'nama'              =>  'DIMAS ANUGERAH ADIBRATA',
            'jeniskelamin_id'   =>  1,
            'agama_id'          =>  1,
            'tempat'            =>  'CILACAP',
            'tanggal'           =>  '1996-09-15',
            'jabatan_id'        =>  1,
            'kontak'            =>  '085842230721',
            'alamat'            =>  'SOKAWERA, PURBALINGGA',
            'image'             =>  'admin.png',
            'status'            =>  1,
        ]);
    }
}
