<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\JenisKelamin;
use Illuminate\Http\Request;

class JenisKelaminController extends Controller
{
    public function getJenisKelamin()
    {
        $jeniskelamin = JenisKelamin::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Jenis Kelamin Berhasil Ditemukan', 'Data' => $jeniskelamin]);
    }
}
