<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\LokasiPajak;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\FuncCall;

class LokasiPajakController extends Controller
{
    public function getLokasiPajak()
    {
        $lokasi = LokasiPajak::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Lokasi Pajak Berhasil Ditemukan', 'Data' => $lokasi]);
    }

    public function storeLokasiPajak(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'           =>  'required',
        ], $messages);

        $lokasi = LokasiPajak::create([
            'lokasi' => $request->lokasi,
            'status' => 1,
        ]);
        return response()->json(['success' => true, 'message' => 'Data Lokasi Pajak Berhasil Disimpan']);
    }

    public function showLokasiPajak($id)
    {
        $lokasi = LokasiPajak::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Lokasi Pajak Berhasil Ditemukan', 'Data' => $lokasi]);
    }

    public function updateLokasiPajak(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'           =>  'required',
        ], $messages);

        $lokasi = LokasiPajak::findOrFail($id);

        $lokasi->update($request->all());

        return response()->json(['success' => true, 'message' => 'Data Lokasi Pajak Berhasil Disimpan']);
    }

    public function deleteLokasiPajak($id)
    {
        $lokasi = LokasiPajak::where('id', $id)->first();

        if ($lokasi) {
            LokasiPajak::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Lokasi Pajak Berhasil Dihapus']);
    }
}
