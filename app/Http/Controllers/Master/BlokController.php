<?php

namespace App\Http\Controllers\Master;

use App\Models\Blok;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BlokController extends Controller
{
    public function getBlok()
    {
        $blok = Blok::with(['lokasi', 'tipe'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Blok Berhasil Ditemukan', 'Data' => $blok]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'    =>  'required',
            'tipe'      =>  'required',
            'blok'      =>  'required'
        ], $messages);

        $blok = Blok::create([
            'lokasi_id' => $request->lokasi,
            'tipe_id'   => $request->tipe,
            'blok'      => $request->blok,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Blok Berhasil Disimpan']);
    }

    public function show($id)
    {
        $blok = Blok::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Blok Berhasil Ditemukan', 'Data' => $blok]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'    =>  'required',
            'tipe'      =>  'required',
            'blok'      =>  'required'
        ], $messages);

        $blok = Blok::findOrFail($id);

        $blok->update([
            'lokasi_id' =>  $request->lokasi,
            'tipe_id'   =>  $request->tipe,
            'blok'      =>  $request->blok,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Blok Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $blok = Blok::where('id', $id)->first();

        if ($blok) {
            Blok::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Blok Berhasil Dihapus']);
    }
}
