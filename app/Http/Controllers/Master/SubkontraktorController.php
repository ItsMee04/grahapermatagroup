<?php

namespace App\Http\Controllers\Master;

use Illuminate\Http\Request;
use App\Models\Subkontraktor;
use App\Http\Controllers\Controller;

class SubkontraktorController extends Controller
{
    public function getSubkontraktor()
    {
        $subkontraktor = Subkontraktor::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Sub Kontraktor Berhasil Ditemukan', 'Data' => $subkontraktor]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'subkontraktor' =>  'required',
        ], $messages);

        $subkontraktor = Subkontraktor::create([
            'subkontraktor' => $request->subkontraktor,
            'status'        => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Sub Kontraktor Berhasil Disimpan']);
    }

    public function show($id)
    {
        $subkontraktor = Subkontraktor::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Sub Kontraktor Berhasil Ditemukan', 'Data' => $subkontraktor]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'subkontraktor' =>  'required',
        ], $messages);

        $subkontraktor = Subkontraktor::findOrFail($id);

        $subkontraktor->update([
            'subkontraktor' =>  $request->subkontraktor,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Sub Kontraktor Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $subkontraktor = Subkontraktor::where('id', $id)->first();

        if ($subkontraktor) {
            Subkontraktor::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Sub Kontraktor Berhasil Dihapus']);
    }
}
