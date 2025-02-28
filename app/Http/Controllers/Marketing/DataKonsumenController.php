<?php

namespace App\Http\Controllers\Marketing;

use App\Models\DataKonsumen;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DataKonsumenController extends Controller
{
    public function getDataKonsumen()
    {
        $konsumen = DataKonsumen::with(['marketing'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Konsumen Berhasil Ditemukan', 'Data' => $konsumen]);
    }

    public function getDataKonsumenByLokasi($id)
    {
        $konsumen = DataKonsumen::with(['marketing'])->where('status', 1)->where('lokasi_id', $id)->get();

        return response()->json(['success' => true, 'message' => 'Data Konsumen Lokasi ' . $id . ' Berhasil Ditemukan', 'Data' => $konsumen]);
    }

    public function storeDataKonsumen(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
            'mimes'    => ':attribute format wajib menggunakan PNG/JPG',
        ];

        $credentials = $request->validate([
            'konsumen'      => 'required',
            'ajbnotaris'    => 'required',
            'ajbbank'       => 'required',
            'ttddirektur'   => 'required',
            'sertifikat'    => 'required',
            'keterangan'    => 'required',
            'image_bukti'   => 'mimes:png,jpg,jpeg'
        ], $messages);

        if ($request->file('image_bukti')) {
            $file = $request->file('image_bukti');
            $imageBukti = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/ImageBukti'), $imageBukti); // Simpan di public/uploads/ImageSurvei
        }

        $konsumen = DataKonsumen::create([
            'konsumen_id'   => $request->konsumen,
            'lokasi_id'     => $request->lokasi,
            'ajbnotaris'    => $request->ajbnotaris,
            'ajbbank'       => $request->ajbbank,
            'ttddirektur'   => $request->ttddirektur,
            'sertifikat'    => $request->sertifikat,
            'keterangan'    => $request->keterangan,
            'image_bukti'   => $imageBukti,
            'user_id'       => Auth::user()->id,
            'status'        => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Konsumen Berhasil Disimpan']);
    }

    public function showDataKonsumen($id)
    {
        $dataKonsumen = DataKonsumen::with(['lokasi'])->findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Berkas Konsumen Berhasil Ditemukan', 'Data' => $dataKonsumen]);
    }
}
