<?php

namespace App\Http\Controllers\Marketing;

use Carbon\Carbon;
use App\Models\Marketing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class MarketingController extends Controller
{
    public function getCalonKonsumen()
    {
        $calonkonsumen = Marketing::with(['metodepembayaran', 'lokasi', 'tipe', 'blok'])->where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Calon Konsumen Berhasil Ditemukan', 'Data' => $calonkonsumen]);
    }

    public function getCalonKonsumenByLokasi($id)
    {
        $calonkonsumen = Marketing::with(['metodepembayaran', 'lokasi', 'tipe', 'blok'])->where('status', 1)->where('lokasi_id', $id)->get();

        return response()->json(['success' => true, 'message' => 'Data Calon Konsumen Lokasi ' . $id . ' Berhasil Ditemukan', 'Data' => $calonkonsumen]);
    }

    public function storeCalonKonsumen(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
            'mimes'    => ':attribute format wajib menggunakan PNG/JPG',
        ];

        $credentials = $request->validate([
            'konsumen'          =>  'required',
            'kontak'            =>  'required',
            'alamat'            =>  'required',
            'progres'           =>  'required',
            'metodepembayaran'  =>  'required',
            'lokasi'            =>  'required',
            'tipe'              =>  'required',
            'blok'              =>  'required',
            'tanggalkomunikasi' =>  'required',
            'sumber'            =>  'required',
            'image_survei'      =>  'mimes:png,jpg,jpeg'
        ], $messages);

        if ($request->file('image_survei')) {
            $file = $request->file('image_survei');
            $imageSurvei = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('storage/ImageSurvei'), $imageSurvei); // Simpan di public/uploads/ImageSurvei
        }

        $calonkonsumen = Marketing::create([
            'konsumen'              => $request->konsumen,
            'kontak'                => $request->kontak,
            'alamat'                => $request->alamat,
            'progres'               => $request->progres,
            'metodepembayaran_id'   => $request->metodepembayaran,
            'lokasi_id'             => $request->lokasi,
            'tipe_id'               => $request->tipe,
            'blok_id'               => $request->blok,
            'tanggalkomunikasi'     => $request->tanggalkomunikasi,
            'sumber'                => $request->sumber,
            'image_survey'          => $imageSurvei,
            'user_id'               => Auth::user()->id,
            'status'                => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Calon Konsumen Berhasil Disimpan']);
    }

    public function showBerkasCalonKonsmen($id)
    {
        $berkasCalonKonsumen = Marketing::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Berkas Calon Konsumen Berhasil Ditemukan', 'Data' => $berkasCalonKonsumen]);
    }

    public function updateBerkasCalonKonsumen(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib diisi !!!',
            'mimes'    => ':attribute format wajib menggunakan PNG/JPG',
            'max'      => ':attribute ukuran maksimal 1MB',
        ];

        $credentials = $request->validate([
            'image_ktp'             => 'mimes:png,jpg,jpeg|max:1024',
            'image_kk'              => 'mimes:png,jpg,jpeg|max:1024',
            'image_npwp'            => 'mimes:png,jpg,jpeg|max:1024',
            'image_slipgaji'        => 'mimes:png,jpg,jpeg|max:1024',
            'image_tambahan'        => 'mimes:png,jpg,jpeg|max:1024',
            'image_buktibooking'    => 'mimes:png,jpg,jpeg|max:1024',
            'image_sp3bank'         => 'mimes:png,jpg,jpeg|max:1024'
        ], $messages);

        $marketing = Marketing::where('id', $id)->first();

        if (!$marketing) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $dataToUpdate = [];

        // Struktur folder penyimpanan
        $folders = [
            'image_ktp'          => 'imageKTP',
            'image_kk'           => 'imageKK',
            'image_npwp'         => 'imageNPWP',
            'image_slipgaji'     => 'imageSlipGaji',
            'image_tambahan'     => 'imageTambahan',
            'image_buktibooking' => 'imageBuktiBooking',
            'image_sp3bank'      => 'imageSP3BANK',
        ];

        // Field yang membutuhkan tanggal otomatis saat diupload
        $tanggalFields = [
            'image_buktibooking' => 'tanggalbooking',
            'image_sp3bank'      => 'tanggalsp3'
        ];

        foreach ($folders as $key => $folder) {
            if ($request->hasFile($key)) {
                $file = $request->file($key);
                $filename = time() . '_' . $file->getClientOriginalName(); // Nama unik
                $destinationPath = public_path("storage/{$folder}"); // Path tujuan di dalam public/storage/

                // Buat folder jika belum ada
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                // Hapus file lama jika ada
                if (!empty($marketing->$key)) {
                    $oldFilePath = storage_path("app/public/{$folder}/" . $marketing->$key);
                    if (file_exists($oldFilePath) && !is_dir($oldFilePath)) {
                        unlink($oldFilePath);
                    }
                }

                // Pindahkan file baru ke folder tujuan
                $file->move($destinationPath, $filename);

                // Simpan hanya nama file di database
                $dataToUpdate[$key] = $filename;

                // Jika field butuh tanggal, update juga
                if (isset($tanggalFields[$key])) {
                    $dataToUpdate[$tanggalFields[$key]] = now()->toDateString();
                }
            }
        }

        // Update data di database hanya jika ada perubahan
        if (!empty($dataToUpdate)) {
            $marketing->update($dataToUpdate);
        }

        return response()->json([
            'success' => true,
            'message' => 'Berkas berhasil diperbarui',
            'data' => $dataToUpdate
        ]);
    }


    public function updateBerkasKomunikasiCalonKonsumen(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib diisi !!!',
            'mimes'    => ':attribute format wajib menggunakan PNG/JPG',
            'max'      => ':attribute ukuran maksimal 1MB',
        ];

        $credentials = $request->validate([
            'image_survei'             => 'mimes:png,jpg,jpeg|max:1024',
        ], $messages);

        $marketing = Marketing::where('id', $id)->first();

        if (!$marketing) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        if ($request->hasFile('image_survei')) {
            $file = $request->file('image_survei');
            $filename = time() . '_' . $file->getClientOriginalName(); // Nama unik
            $storagePath = "storage/ImageSurvei/";
            $destinationPath = public_path($storagePath);

            // Buat folder jika belum ada
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0777, true);
            }

            // Hapus file lama jika ada
            if (!empty($marketing->image_survey)) {
                $oldFilePath = public_path($marketing->image_survey);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }

            // Simpan file baru
            $file->move($destinationPath, $filename);
            $marketing->image_survey = $filename;
            $marketing->save();
        }

        return response()->json(['success' => true, 'message' => 'Berkas komunikasi berhasil diperbarui']);
    }
}
