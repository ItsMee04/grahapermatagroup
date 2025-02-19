<?php

namespace App\Http\Controllers\Master;

use App\Models\Jabatan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JabatanController extends Controller
{
    public function getJabatan()
    {
        $jabatan = Jabatan::where('status', 1)->where('jabatan', '!=', 'SUPER ADMIN')->get();

        return response()->json(['success' => true, 'message' => 'Data Jabatan Berhasil Ditemukan', 'Data' => $jabatan]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'jabatan' =>  'required',
        ], $messages);

        $jabatan = Jabatan::create([
            'jabatan'   => $request->jabatan,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Jabatan Berhasil Disimpan']);
    }

    public function show($id)
    {
        $jabatan = Jabatan::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Jabatan Berhasil Ditemukan', 'Data' => $jabatan]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'jabatan' =>  'required',
        ], $messages);

        $jabatan = Jabatan::findOrFail($id);

        $jabatan->update([
            'jabatan' =>  $request->jabatan,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Jabatan Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $jabatan = Jabatan::where('id', $id)->first();

        if ($jabatan) {
            Jabatan::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Jabatan Berhasil Dihapus']);
    }
}
