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

        $ImageSurvei = '';

        if ($request->file('image_survei')) {
            $extension = $request->file('image_survei')->getClientOriginalExtension();
            $ImageSurvei = Carbon::now() . '.' . $extension;
            $request->file('image_survei')->storeAs('ImageSurvei', $ImageSurvei);
            $request['image_survei'] = $ImageSurvei;
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
            'image_survei'          => $ImageSurvei,
            'user_id'               => Auth::user()->id,
            'status'                => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Calon Konsumen Berhasil Disimpan']);
    }
}
