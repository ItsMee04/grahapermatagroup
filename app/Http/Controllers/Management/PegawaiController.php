<?php

namespace App\Http\Controllers\Management;

use App\Models\User;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PegawaiController extends Controller
{
    public function getPegawai()
    {
        $pegawai = Pegawai::with(['jabatan', 'jeniskelamin', 'agama'])->where('status', 1)->get();

        return response()->json(['success' => true, 'messaged' => 'Data Pegawai Berhasil Ditemukan', 'Data' => $pegawai]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
            'mimes'    => ':attribute format wajib menggunakan PNG/JPG',
            'unique'   => ':attribute sudah digunakan'
        ];

        $credentials = $request->validate([
            'nip'   => 'required|unique:pegawai',
            'image' => 'mimes:png,jpg,jpeg',
        ], $messages);

        $newAvatar = '';

        if ($request->file('image')) {
            $extension = $request->file('image')->getClientOriginalExtension();
            $newAvatar = $request->nip . '.' . $extension;
            $request->file('image')->storeAs('Avatar', $newAvatar);
            $request['image'] = $newAvatar;
        }

        $store = Pegawai::create([
            'nip'               => $request->nip,
            'nama'              => $request->nama,
            'jeniskelamin_id'   => $request->jeniskelamin,
            'agama_id'          => $request->agama,
            'tempat'            => $request->tempat,
            'tanggal'           => $request->tanggal,
            'jabatan_id'        => $request->jabatan,
            'kontak'            => $request->kontak,
            'alamat'            => $request->alamat,
            'status'            => 1,
            'image'             => $newAvatar,
        ]);

        $pegawai_id = Pegawai::where('nip', '=', $request->nip)->first()->id;

        if ($store) {
            User::create([
                'pegawai_id' => $pegawai_id,
                'role_id'    => $request->jabatan,
                'status'     => 1
            ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Pegawai Berhasil Disimpan']);
    }
}
