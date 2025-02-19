<?php

namespace App\Http\Controllers\Master;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    public function getRole()
    {
        $role = Role::where('status', 1)->get();

        return response()->json(['success' => true, 'message' => 'Data Hak Akses Berhasil Ditemukan', 'Data' => $role]);
    }

    public function store(Request $request)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'role' =>  'required',
        ], $messages);

        $role = Role::create([
            'role'      => $request->role,
            'status'    => 1,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Hak Akses Berhasil Disimpan']);
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Hak Akses Berhasil Ditemukan', 'Data' => $role]);
    }

    public function update(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
        ];

        $credentials = $request->validate([
            'role' =>  'required',
        ], $messages);

        $role = Role::findOrFail($id);

        $role->update([
            'role' =>  $request->role,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Hak Akses Berhasil Disimpan']);
    }

    public function delete($id)
    {
        $role = Role::where('id', $id)->first();

        if ($role) {
            Role::where('id', $id)
                ->update([
                    'status' => 0,
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Hak Akses Berhasil Dihapus']);
    }
}
