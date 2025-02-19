<?php

namespace Database\Seeders;

use App\Models\JenisKelamin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JenisKelaminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'LAKI - LAKI',
            'PEREMPUAN',
        ];

        foreach ($data as $value) {
            JenisKelamin::create([
                'jeniskelamin'  => $value,
                'status'        => 1
            ]);
        }
    }
}
