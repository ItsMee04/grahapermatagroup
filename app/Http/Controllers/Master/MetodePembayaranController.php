<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\MetodePembayaran;
use Illuminate\Http\Request;

class MetodePembayaranController extends Controller
{
    public function getMetodePembayaran()
    {
        $pembayaran = MetodePembayaran::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Metode Pembayaran Berhasil Ditemukan', 'Data' => $pembayaran]);
    }

    public function storeMetodePembayaran(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'metodepembayaran' =>  'required',
        ], $messages);

        $pembayaran = MetodePembayaran::create([
            'pembayaran'    => $request->metodepembayaran,
            'status'        => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Metode Pembayaran Berhasil Disimpan']);
    }

    public function showMetodePembayaran($id)
    {
        $pembayaran = MetodePembayaran::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Metode Pembayaran Berhasil Ditemukan', 'Data' => $pembayaran]);
    }

    public function patchMetodePembayaran(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'metodepembayaran' =>  'required',
        ], $messages);

        $pembayaran = MetodePembayaran::findOrFail($id);

        $pembayaran->update([
            'pembayaran'   =>  $request->metodepembayaran,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Metode Pembayaran Berhasil Disimpan']);
    }

    public function deleteMetodePembayaran($id)
    {
        $pembayaran = MetodePembayaran::where('id', $id)->first();

        if ($pembayaran) {
            MetodePembayaran::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Metode Pembayaran Berhasil Dihapus']);
    }
}
