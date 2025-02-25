<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Agama;
use Illuminate\Http\Request;

class AgamaController extends Controller
{
    public function getAgama()
    {
        $agama = Agama::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Agama Berhasil Ditemukan', 'Data' => $agama]);
    }

    public function storeAgama(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'agama' =>  'required',
        ], $messages);

        $agama = Agama::create([
            'agama'     => $request->agama,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Agama Berhasil Disimpan']);
    }

    public function showAgama($id)
    {
        $agama = Agama::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Agama Berhasil Ditemukan', 'Data' => $agama]);
    }

    public function updateAgama(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'agama' =>  'required',
        ], $messages);

        $agama = Agama::findOrFail($id);

        $agama->update([
            'agama' =>  $request->agama,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Agama Berhasil Disimpan']);
    }

    public function deleteAgama($id)
    {
        $agama = Agama::where('id', $id)->first();

        if ($agama) {
            Agama::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Agama Berhasil Dihapus']);
    }
}
