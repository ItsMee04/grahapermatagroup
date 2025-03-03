<?php

namespace App\Http\Controllers\Produksi;

use App\Http\Controllers\Controller;
use App\Models\Marketing;
use Illuminate\Http\Request;

class PembangunanController extends Controller
{
    public function getPembangunan()
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])->whereNotNull('tanggalbooking')->whereNot('status', 2)->get();

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Ditemukan', 'Data' => $pembangunan]);
    }
}
