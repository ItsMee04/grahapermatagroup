<?php

namespace App\Http\Controllers\Master;

use App\Models\Rekening;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RekeningController extends Controller
{
    public function getRekening()
    {
        $rekening = Rekening::with(['lokasi'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Rekening Berhasil Ditemukan', 'Data' => $rekening]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'bank'             =>  'required',
            'nomor'            =>  'required',
            'lokasi'           =>  'required',
        ], $messages);

        $rekening = Rekening::create([
            'bank'              => $request->bank,
            'nomor_rekening'    =>  $request->nomor,
            'lokasi_id'         => $request->lokasi,
            'status'            => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Rekening Berhasil Disimpan']);
    }

    public function show($id)
    {
        $rekening = Rekening::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Rekening Berhasil Ditemukan', 'Data' => $rekening]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'bank'             =>  'required',
            'nomor'            =>  'required',
            'lokasi'           =>  'required',
        ], $messages);

        $rekening = Rekening::findOrFail($id);

        $rekening->update([
            'bank'              =>  $request->bank,
            'nomor_rekening'    =>  $request->nomor,
            'lokasi_id'         =>  $request->lokasi,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Rekening Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $rekening = Rekening::where('id', $id)->first();

        if ($rekening) {
            Rekening::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Rekening Berhasil Dihapus']);
    }
}
