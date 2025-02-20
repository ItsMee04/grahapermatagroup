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
                return redirect('login')->with('errors-message', 'User Account Belum Aktif !');
            } else {
                if (Auth::user()->role_id == 1) {
                    $pegawai = Pegawai::where('id', Auth::user()->pegawai_id)->first()->nama;
                    $image   = Pegawai::where('id', Auth::user()->pegawai_id)->first()->image;

                    $jabatan_id   = Pegawai::where('id', Auth::user()->pegawai_id)->first()->jabatan_id;
                    $jabatan     = Jabatan::where('id', $jabatan_id)->first()->jabatan;

                    $role   = Role::where('id', Auth::user()->role_id)->first()->role;

                    Session::put('nama', $pegawai);
                    Session::put('image', $image);
                    Session::put('jabatan', $jabatan);
                    Session::put('role', $role);

                    return redirect('dashboard')->with('success-message', 'Login Berhasil');
                } elseif (Auth::user()->role_id == 2) {
                    $pegawai = Pegawai::where('id', Auth::user()->pegawai_id)->first()->nama;
                    $image   = Pegawai::where('id', Auth::user()->pegawai_id)->first()->image;

                    $jabatan_id   = Pegawai::where('id', Auth::user()->pegawai_id)->first()->jabatan_id;
                    $jabatan     = Jabatan::where('id', $jabatan_id)->first()->jabatan;

                    $role   = Role::where('id', Auth::user()->role_id)->first()->role;

                    Session::put('nama', $pegawai);
                    Session::put('image', $image);
                    Session::put('jabatan', $jabatan);
                    Session::put('role', $role);

                    return redirect('dashboard')->with('success-message', 'Login Berhasil');
                }
            }
        }

        return redirect('login')->with('errors-message', 'username atau password salah !');
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
