<?php

namespace Database\Seeders;

use App\Models\Agama;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AgamaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            'ISLAM',
            'KRISTEN',
            'HINDU',
            'BUDHA',
            'KATHOLIK',
            'KONGHUCHU',
            'KEPERCAYAAN KEPADA TUHAN YANG MAHA ESA'
        ];

        foreach ($data as $value) {
            Agama::create([
                'agama'   => $value,
                'status'    => 1
            ]);
        }
    }
}
