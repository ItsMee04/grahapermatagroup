<?php

namespace App\Http\Controllers\Auth;

use App\Models\Role;
use App\Models\Jabatan;
use App\Models\Pegawai;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function login(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'email'    => 'required',
            'password' => 'required',
        ], $messages);

        if (Auth::attempt($credentials)) {
            if (Auth::user()->status != 1) {
                return response()->json([
                    'success' => false,
                    'message' => 'User Account Belum Aktif !'
                ]);
            } else {
                $user = Auth::user();
                $pegawai = Pegawai::where('id', $user->pegawai_id)->first();
                $jabatan = Jabatan::where('id', $pegawai->jabatan_id)->first()->jabatan;
                $role = Role::where('id', $user->role_id)->first()->role;

                Session::put('nama', $pegawai->nama);
                Session::put('image', $pegawai->image);
                Session::put('jabatan', $jabatan);
                Session::put('role', $role);

                return response()->json([
                    'success' => true,
                    'message' => 'Login Berhasil',
                    'redirect' => url('dashboard')
                ]);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Username atau password salah!'
        ]);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        //mengarahkan ke halaman login
        return redirect('login')->with('success-message', 'Logout Berhasil');
    }
}
