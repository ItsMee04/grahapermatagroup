<?php

namespace App\Http\Controllers\Produksi;

use App\Models\Produksi;
use App\Models\Marketing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PembangunanController extends Controller
{
    public function getPembangunan()
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])
            ->whereNotNull('tanggalbooking')
            ->whereHas('produksi', function ($query) {
                $query->whereNull('statusproses');
            })
            ->get();

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function getPembangunanByLokasi($id)
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])
            ->whereNotNull('tanggalbooking')
            ->whereHas('produksi', function ($query) {
                $query->whereNull('statusproses');
            })
            ->where('lokasi_id', $id)
            ->get();

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

        // Ambil nilai dari request
        $constharga = $request->hargaborongan;
        $consttipe  = $request->tipe;

        // Pisahkan angka pertama dari $tipee
        $constnilaitipe = explode('/', $consttipe);
        $constnilaitipereal = (int) $constnilaitipe[0]; // Ambil angka sebelum "/"

        // Hitung hasil perkalian
        $totalnilaiborongan = $constharga * $constnilaitipereal;

        $produksi->update([
            'hargaborongan' =>  $request->hargaborongan,
            'nilaiborongan' =>  $totalnilaiborongan,
            'keterangan'    =>  $request->keterangan,
            'user_id'       =>  Auth::user()->id,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Disimpan']);
    }

    public function updatePembangunanBowplang($id)
    {
        $pembangunanBowplang = Produksi::where('id', $id)->first();

        if ($pembangunanBowplang) {
            Produksi::where('id', $id)
                ->update([
                    'statusproses' => "ON PROSES",
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Dihapus']);
    }

    public function getProduksi()
    {
        $produksi = Produksi::with(['marketing', 'marketing.lokasi', 'marketing.blok', 'marketing.tipe', 'subkontraktor'])->where('statusproses', 'ON PROSES')->where('status', 1)->get();
        return response()->json(['success' => true, 'message' => 'Data Produksi Berhasil Ditemukan', 'Data' => $produksi]);
    }

    public function getProduksiByLokasi($id)
    {
        $produksi = Produksi::with(['marketing', 'marketing.lokasi', 'marketing.blok', 'marketing.tipe', 'subkontraktor'])
            ->whereHas('marketing', function ($query) use ($id) {
                $query->where('lokasi_id', $id); // Filter berdasarkan lokasi_id di tabel marketing
            })
            ->where('statusproses', 'ON PROSES')
            ->where('status', 1)
            ->get();
        return response()->json(['success' => true, 'message' => 'Data Produksi Berhasil Ditemukan', 'Data' => $produksi]);
    }

    public function showProduksi($id)
    {
        $produksi = Produksi::with(['marketing.lokasi', 'marketing.tipe', 'marketing.blok', 'marketing'])->findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Produksi Berhasil Ditemukan', 'Data' => $produksi]);
    }
}
