<?php

namespace App\Http\Controllers\Marketing;

use App\Http\Controllers\Controller;
use App\Models\Marketing;
use Illuminate\Http\Request;

class MarketingController extends Controller
{
    public function getCalonKonsumen()
    {
        $calonkonsumen = Marketing::with(['metodepembayaran'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Calon Konsumen Berhasil Ditemukan', 'Data' => $calonkonsumen]);
    }

    public function getCalonKonsumenByLokasi($id)
    {
        $calonkonsumen = Marketing::with(['metodepembayaran'])->where('status', 1)->where('lokasi_id', $id)->get();

        return response()->json(['success' => true, 'message' => 'Data Calon Konsumen Lokasi ' . $id . ' Berhasil Ditemukan', 'Data' => $calonkonsumen]);
    }
}
