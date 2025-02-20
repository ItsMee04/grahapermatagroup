<?php

namespace App\Http\Controllers\Management;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getUsers()
    {
        $user = User::with(['pegawai', 'role'])->where('status', 1)->get();
        return response()->json(['success' => true, 'message' => 'Data Users Ditemukan', 'Data' => $user]);
    }

    public function show($id)
    {
        $user = User::where('id', $id)->with(['pegawai', 'role'])->get();
        return response()->json(['success' => true, 'message' => 'Data Users Berhasil Ditemukan', 'Data' => $user]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib diisi !!!',
            'unique'   => ':attribute sudah digunakan'
        ];

        // Ambil data user berdasarkan ID
        $user = User::find($id);
        if (!$user) {
            return response()->json(['success' => false, 'message' => "User tidak ditemukan"], 404);
        }

        // Cek apakah email baru sama dengan email lama
        if ($request->email !== $user->email) {
            // Jika email diubah, cek apakah email sudah digunakan oleh user lain
            $emailExists = User::where('email', $request->email)->where('id', '!=', $id)->exists();
            if ($emailExists) {
                return response()->json(['success' => false, 'message' => "Email sudah digunakan oleh user lain"], 400);
            }
        }

        // Validasi password tetap wajib
        $request->validate([
            'password' => 'required',
        ], $messages);

        // Update data user
        $user->update([
            'email'     => $request->email,
            'password'  => Hash::make($request->password),
            'role_id'   => $request->role,
        ]);

        return response()->json(['success' => true, 'message' => "Data User Berhasil Diupdate"]);
    }
}
