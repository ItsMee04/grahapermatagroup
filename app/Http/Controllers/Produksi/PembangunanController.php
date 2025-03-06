<?php

namespace App\Http\Controllers\Produksi;

use App\Http\Controllers\Controller;
use App\Models\Marketing;
use App\Models\Produksi;
use Illuminate\Http\Request;

class PembangunanController extends Controller
{
    public function getPembangunan()
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])->whereNotNull('tanggalbooking')->whereNot('status', 2)->get();

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function getPembangunanByLokasi($id)
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])->whereNotNull('tanggalbooking')->whereNot('status', 2)->where('lokasi_id', $id)->get();

        return response()->json(['success' => true, 'message' => 'Data Pembangunan By Lokasi Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function showPembangunan($id)
    {
        $pembangunan = Produksi::with(['marketing.lokasi', 'marketing.tipe', 'marketing.blok', 'marketing'])->findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function updatePembangunan(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
            'integer'  => ':attribute format wajib menggunakan PNG/JPG',
        ];

        $credentials = $request->validate([
            'hargaborongan' =>  'required|integer',
            'keterangan'    =>  'required',
        ], $messages);

        $produksi = Produksi::findOrFail($id);

        if (!$produksi) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $produksi->update([
            'hargaborongan' =>  $request->hargaborongan,
            'keterangan'    =>  $request->keterangan,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Disimpan']);
    }
}
