<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\SettingAbsensi;
use Illuminate\Http\Request;

class AbsensiController extends Controller
{
    public function getSettingAbsensi()
    {
        $settingAbsensi = SettingAbsensi::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Setting Absensi Berhasil Ditemukan', 'Data' => $settingAbsensi]);
    }

    public function storeSettingAbsensi(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'checkin' =>  'required',
            'checkout' =>  'required',
        ], $messages);

        $settingAbsensi = SettingAbsensi::create([
            'checkin'   => $request->checkin,
            'checkout'  => $request->checkout,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Pengaturan Absensi Berhasil Disimpan']);
    }

    public function showSettingAbsensi($id)
    {
        $settingAbsensi = settingAbsensi::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Pengaturan Absensi Berhasil Ditemukan', 'Data' => $settingAbsensi]);
    }

    public function patchPengaturanAbsensi(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'checkin' =>  'required',
            'checkout' =>  'required',
        ], $messages);


        $settingAbsensi = settingAbsensi::findOrFail($id);

        $settingAbsensi->update([
            'checkin'   =>  $request->checkin,
            'checkout'  =>  $request->checkout,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Pengaturan Absensi Berhasil Disimpan']);
    }

    public function deleteSettingAbsensi($id)
    {
        $settingAbsensi = settingAbsensi::where('id', $id)->first();

        if ($settingAbsensi) {
            settingAbsensi::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Pengaturan Absensi Berhasil Dihapus']);
    }
}
