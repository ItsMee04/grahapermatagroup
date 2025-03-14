<?php

namespace App\Http\Controllers\Pajak;

use App\Http\Controllers\Controller;
use App\Models\Pajak;
use Illuminate\Http\Request;

class PajakController extends Controller
{
    public function getRekapitulasiPajak()
    {
        $pajak = Pajak::with(['marketing', 'lokasipajak'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Rekapitulasi Pajak Berhasil Ditemukan', 'Data' => $pajak]);
    }

    public function getRekapitulasiPajakByLokasi($id)
    {
        $pajak = Pajak::with(['marketing', 'lokasipajak'])->where('lokasipajak_id', $id)->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Rekapitulasi Pajak Berhasil Ditemukan', 'Data' => $pajak]);
    }
}
