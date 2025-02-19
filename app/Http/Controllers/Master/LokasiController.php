<?php

namespace App\Http\Controllers\Master;

use App\Models\Lokasi;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LokasiController extends Controller
{
    public function index()
    {
        return view('master.lokasi');
    }

    public function loadLokasi()
    {
        $lokasi = Lokasi::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Lokasi Proyek Berhasil Ditemukan', 'Data' => $lokasi]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'           =>  'required',
        ], $messages);

        $lokasi = Lokasi::create([
            'lokasi' => $request->lokasi,
            'status' => 1,
        ]);
        return response()->json(['success' => true, 'message' => 'Data Lokasi Proyek Berhasil Disimpan']);
    }

    public function show($id)
    {
        $lokasi = Lokasi::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Lokasi Proyek Berhasil Ditemukan', 'Data' => $lokasi]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'lokasi'           =>  'required',
        ], $messages);

        $lokasi = Lokasi::findOrFail($id);

        $lokasi->update($request->all());

        return response()->json(['success' => true, 'message' => 'Data Lokasi Proyek Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $lokasi = Lokasi::where('id', $id)->first();

        if ($lokasi) {
            Lokasi::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Lokasi Proyek Berhasil Dihapus']);
    }
}
