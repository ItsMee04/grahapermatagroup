<?php

namespace App\Http\Controllers\Master;

use App\Models\Tipe;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TipeController extends Controller
{
    public function getTipe()
    {
        $tipe = Tipe::with(['lokasi'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Tipe Berhasil Ditemukan', 'Data' => $tipe]);
    }

    public function getTipeByLokasi($id)
    {
        $tipe = Tipe::with(['lokasi'])->where('status', 1)->where('lokasi_id', $id)->get();
        return response()->json(['success' => true, 'message' => 'Data Tipe Berhasil Ditemukan', 'Data' => $tipe]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'           =>  'required',
        ], $messages);

        $tipe = Tipe::create([
            'lokasi_id' => $request->lokasi,
            'tipe'      => $request->tipe,
            'status'    => 1,
        ]);
        return response()->json(['success' => true, 'message' => 'Data Tipe Berhasil Disimpan']);
    }

    public function show($id)
    {
        $tipe = Tipe::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Tipe Berhasil Ditemukan', 'Data' => $tipe]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'    =>  'required',
            'tipe'      =>  'required',
        ], $messages);

        $tipe = Tipe::findOrFail($id);

        $tipe->update([
            'lokasi_id' =>  $request->lokasi,
            'tipe'      =>  $request->tipe,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Tipe Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $tipe = Tipe::where('id', $id)->first();

        if ($tipe) {
            Tipe::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Tipe Berhasil Dihapus']);
    }
}
