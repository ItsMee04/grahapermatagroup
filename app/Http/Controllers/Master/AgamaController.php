<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Models\Agama;
use Illuminate\Http\Request;

class AgamaController extends Controller
{
    public function getAgama()
    {
        $agama = Agama::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Agama Berhasil Ditemukan', 'Data' => $agama]);
    }
}
