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
        $dataKonsumen = DataKonsumen::with(['lokasi', 'marketing', 'marketing.lokasi'])->findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Berkas Konsumen Berhasil Ditemukan', 'Data' => $dataKonsumen]);
    }

    public function updateDataKonsumen(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib diisi !!!',
            'mimes'    => ':attribute format wajib menggunakan PNG/JPG',
            'max'      => ':attribute ukuran maksimal 1MB',
        ];

        $credentials = $request->validate([
            'konsumen'      => 'required',
            'ajbnotaris'    => 'required',
            'ajbbank'       => 'required',
            'ttddirektur'   => 'required',
            'keterangan'    => 'required',
            'image_bukti'   => 'mimes:png,jpg,jpeg|max:1024',
        ], $messages);

        $konsumen = DataKonsumen::where('id', $id)->first();

        if (!$konsumen) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        // Update data lainnya
        $konsumen->konsumen_id = $request->konsumen;
        $konsumen->ajbnotaris  = $request->ajbnotaris;
        $konsumen->ajbbank     = $request->ajbbank;
        $konsumen->ttddirektur = $request->ttddirektur;
        $konsumen->keterangan  = $request->keterangan;

        // Jika ada file baru yang diunggah
        if ($request->hasFile('image_bukti')) {
            $file = $request->file('image_bukti');
            $filename = time() . '_' . $file->getClientOriginalName(); // Nama unik
            $storagePath = "storage/ImageBukti/";
            $destinationPath = public_path($storagePath);

            // Buat folder jika belum ada
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }

            // Hapus file lama jika ada
            if (!empty($konsumen->image_bukti)) {
                $oldFilePath = public_path($storagePath . $konsumen->image_bukti);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            // Simpan file baru
            $file->move($destinationPath, $filename);
            $konsumen->image_bukti = $filename;
        }

        // Simpan perubahan ke database
        $konsumen->save();

        return response()->json(['success' => true, 'message' => 'Data konsumen berhasil diperbarui']);
    }

    public function deleteDataKonsumen($id)
    {
        $konsumen = DataKonsumen::where('id', $id)->first();

        if ($konsumen) {
            DataKonsumen::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Konsumen Berhasil Dihapus']);
    }
}
