<?php

namespace App\Http\Controllers\Produksi;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\LaporanHarian;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LaporanHarianController extends Controller
{
    public function getLaporanHarian()
    {
        $laporan = LaporanHarian::with('user')->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Laporan Harian Berhasil Ditemukan', 'Data' => $laporan]);
    }

    public function storeLaporanHarian(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di pilih !!!',
        ];

        $credentials = $request->validate([
            'laporan'          =>  'required|string',
        ], $messages);

        $laporan = LaporanHarian::create([
            'tanggal'   =>  Carbon::now(), // Menggunakan Carbon untuk mendapatkan tanggal saat ini
            'laporan'   => $request->laporan,
            'user_id'   =>  Auth::user()->id,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Laporan Harian Berhasil Disimpan']);
    }

    public function showLaporanHarian($id)
    {
        $laporan = LaporanHarian::findOrFail($id);

        if (!$laporan) {
            return response()->json(['success' => false, 'message' => 'Data Hak Akses Tidak Ditemukan']);
        }

        return response()->json(['success' => true, 'message' => 'Data laporan Harian Berhasil Ditemukan', 'Data' => $laporan]);
    }

    public function updateLaporanHarian(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di pilih !!!',
        ];

        $credentials = $request->validate([
            'laporan'          =>  'required|string',
        ], $messages);

        $laporan = LaporanHarian::findOrFail($id);

        $laporan->update([
            'tanggal'   =>  Carbon::now(), // Menggunakan Carbon untuk mendapatkan tanggal saat ini
            'laporan'   => $request->laporan,
            'user_id'   =>  Auth::user()->id,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Laporan Harian Berhasil Disimpan']);
    }

    public function deleteLaporanHarian($id)
    {
        $laporan = LaporanHarian::where('id', $id)->first();

        if ($laporan) {
            LaporanHarian::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Laporan Berhasil Dihapus']);
    }
}
