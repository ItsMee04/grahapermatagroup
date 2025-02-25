<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\JenisKelamin;
use Illuminate\Http\Request;

class JenisKelaminController extends Controller
{
    public function getJenisKelamin()
    {
        $jeniskelamin = JenisKelamin::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Jenis Kelamin Berhasil Ditemukan', 'Data' => $jeniskelamin]);
    }

    public function storeJenisKelamin(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'jeniskelamin' =>  'required',
        ], $messages);

        $jeniskelamin = JenisKelamin::create([
            'jeniskelamin'  => $request->jeniskelamin,
            'status'        => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Jenis Kelamin Berhasil Disimpan']);
    }

    public function showJenisKelamin($id)
    {
        $jeniskelamin = JenisKelamin::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Jenis Kelamin Berhasil Ditemukan', 'Data' => $jeniskelamin]);
    }

    public function updateJenisKelamin(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'jeniskelamin' =>  'required',
        ], $messages);

        $jeniskelamin = JenisKelamin::findOrFail($id);

        $jeniskelamin->update([
            'jeniskelamin' =>  $request->jeniskelamin,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Jenis Kelamin Berhasil Disimpan']);
    }

    public function deleteJenisKelamin($id)
    {
        $jeniskelamin = JenisKelamin::where('id', $id)->first();

        if ($jeniskelamin) {
            JenisKelamin::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Jenis Kelamin Berhasil Dihapus']);
    }
}
