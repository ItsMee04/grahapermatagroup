<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Master\BlokController;
use App\Http\Controllers\Master\RoleController;
use App\Http\Controllers\Master\TipeController;
use App\Http\Controllers\Master\LokasiController;
use App\Http\Controllers\Master\JabatanController;
use App\Http\Controllers\Master\RekeningController;
use App\Http\Controllers\Management\PegawaiController;
use App\Http\Controllers\Management\UserController;
use App\Http\Controllers\Marketing\MarketingController;
use App\Http\Controllers\Master\AbsensiController;
use App\Http\Controllers\Master\AgamaController;
use App\Http\Controllers\Master\JenisKelaminController;
use App\Http\Controllers\Master\MetodePembayaranController;
use App\Http\Controllers\Master\SubkontraktorController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/login', [AuthController::class, 'index'])->name('login');
Route::post('/login/authLogin', [AuthController::class, 'login']);

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return view('pages.dashboard');
    });

    Route::get('/lokasi', function () {
        return view("Pages.Master.lokasi");
    });
    Route::get('/lokasi/getLokasi', [LokasiController::class, 'loadLokasi']);
    Route::post('/lokasi', [LokasiController::class, 'store']);
    Route::get('/lokasi/{id}', [LokasiController::class, 'show']);
    Route::post('/lokasi/{id}', [LokasiController::class, 'update']);
    Route::delete('/lokasi/delete/{id}', [LokasiController::class, 'delete']);

    Route::get('/tipe', function () {
        return view('Pages.Master.tipe');
    });
    Route::get('/tipe/getTipe', [TipeController::class, 'getTipe']);
    Route::get('/tipe/getTipeByLokasi/{id}', [TipeController::class, 'getTipeByLokasi']);
    Route::post('/tipe', [TipeController::class, 'store']);
    Route::get('/tipe/{id}', [TipeController::class, 'show']);
    Route::post('/tipe/{id}', [TipeController::class, 'update']);
    Route::delete('/tipe/delete/{id}', [TipeController::class, 'delete']);

    Route::get('/blok', function () {
        return view('Pages.Master.blok');
    });
    Route::get('/blok/getBlok', [BlokController::class, 'getBlok']);
    Route::get('/blok/getBlokByTipe/{id}', [BlokController::class, 'getBlokByTipe']);
    Route::post('/blok', [BlokController::class, 'store']);
    Route::get('/blok/{id}', [BlokController::class, 'show']);
    Route::post('/blok/{id}', [BlokController::class, 'update']);
    Route::delete('/blok/delete/{id}', [BlokController::class, 'delete']);

    Route::get('/rekening', function () {
        return view('Pages.Master.rekening');
    });
    Route::get('/rekening/getRekening', [RekeningController::class, 'getRekening']);
    Route::post('/rekening', [RekeningController::class, 'store']);
    Route::get('/rekening/{id}', [RekeningController::class, 'show']);
    Route::post('/rekening/{id}', [RekeningController::class, 'update']);
    Route::delete('/rekening/delete/{id}', [RekeningController::class, 'delete']);

    Route::get('/subkontraktor', function () {
        return view('Pages.Master.subkontraktor');
    });
    Route::get('/subkontraktor/getSubkontraktor', [SubkontraktorController::class, 'getSubkontraktor']);
    Route::post('/subkontraktor', [SubkontraktorController::class, 'store']);
    Route::get('/subkontraktor/{id}', [SubkontraktorController::class, 'show']);
    Route::post('/subkontraktor/{id}', [SubkontraktorController::class, 'update']);
    Route::delete('/subkontraktor/delete/{id}', [SubkontraktorController::class, 'delete']);

    Route::get('/role', function () {
        return view('Pages.Master.role');
    });
    Route::get('/role/getRole', [RoleController::class, 'getRole']);
    Route::post('/role', [RoleController::class, 'store']);
    Route::get('/role/{id}', [RoleController::class, 'show']);
    Route::post('/role/{id}', [RoleController::class, 'update']);
    Route::delete('/role/delete/{id}', [RoleController::class, 'delete']);

    Route::get('/jabatan', function () {
        return view('Pages.Master.jabatan');
    });
    Route::get('/jabatan/getJabatan', [JabatanController::class, 'getJabatan']);
    Route::post('/jabatan', [JabatanController::class, 'store']);
    Route::get('/jabatan/{id}', [JabatanController::class, 'show']);
    Route::post('/jabatan/{id}', [JabatanController::class, 'update']);
    Route::delete('/jabatan/delete/{id}', [JabatanController::class, 'delete']);

    Route::get('/pengaturanabsensi', function () {
        return view('Pages.Master.settingabsensi');
    });
    Route::get('/pengaturanabsensi/getSettingAbsensi', [AbsensiController::class, 'getSettingAbsensi']);
    Route::post('/pengaturanabsensi/storeSettingAbsensi', [AbsensiController::class, 'storeSettingAbsensi']);
    Route::get('/pengaturanabsensi/showSettingAbsensi/{id}', [AbsensiController::class, 'showSettingAbsensi']);
    Route::post('/pengaturanabsensi/patchPengaturanAbsensi/{id}', [AbsensiController::class, 'patchPengaturanAbsensi']);
    Route::delete('/pengaturanabsensi/deletePengaturanAbsensi/{id}', [AbsensiController::class, 'deleteSettingAbsensi']);

    Route::get('/metodepembayaran', function () {
        return view('Pages.Master.metodepembayaran');
    });
    Route::get('/metodepembayaran/getMetodePembayaran', [MetodePembayaranController::class, 'getMetodePembayaran']);
    Route::post('/metodepembayaran/storeMetodePembayaran', [MetodePembayaranController::class, 'storeMetodePembayaran']);
    Route::get('/metodepembayaran/showMetodePembayaran/{id}', [MetodePembayaranController::class, 'showMetodePembayaran']);
    Route::post('/metodepembayaran/patchMetodePembayaran/{id}', [MetodePembayaranController::class, 'patchMetodePembayaran']);
    Route::delete('/metodepembayaran/deleteMetodePembayaran/{id}', [MetodePembayaranController::class, 'deleteMetodePembayaran']);

    Route::get('/jeniskelamin', function () {
        return view('Pages.Refrensi.jeniskelamin');
    });
    Route::get('/jeniskelamin/getJenisKelamin', [JenisKelaminController::class, 'getJenisKelamin']);
    Route::post('/jeniskelamin/storeJenisKelamin', [JenisKelaminController::class, 'storeJenisKelamin']);
    Route::get('/jeniskelamin/showJenisKelamin/{id}', [JenisKelaminController::class, 'showJenisKelamin']);
    Route::post('/jeniskelamin/updateJenisKelamin/{id}', [JenisKelaminController::class, 'updateJenisKelamin']);
    Route::delete('/jeniskelamin/deleteJenisKelamin/{id}', [JenisKelaminController::class, 'deleteJenisKelamin']);

    Route::get('/agama', function () {
        return view('Pages.Refrensi.agama');
    });
    Route::get('/agama/getAgama', [AgamaController::class, 'getAgama']);
    Route::post('/agama/storeAgama', [AgamaController::class, 'storeAgama']);
    Route::get('/agama/showAgama/{id}', [AgamaController::class, 'showAgama']);
    Route::post('/agama/updateAgama/{id}', [AgamaController::class, 'updateAgama']);
    Route::delete('/agama/deleteAgama/{id}', [AgamaController::class, 'deleteAgama']);


    Route::get('/pegawai', function () {
        return view('Pages.Management.pegawai');
    });
    Route::get('/pegawai/getPegawai', [PegawaiController::class, 'getPegawai']);
    Route::post('/pegawai', [PegawaiController::class, 'store']);
    Route::get('/pegawai/{id}', [PegawaiController::class, 'show']);
    Route::post('/pegawai/{id}', [PegawaiController::class, 'update']);
    Route::delete('/pegawai/delete/{id}', [PegawaiController::class, 'delete']);

    Route::get('/users', function () {
        return view('Pages.Management.user');
    });
    Route::get('/users/getUsers', [UserController::class, 'getUsers']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::post('/users/{id}', [UserController::class, 'update']);

    Route::get('/calonkonsumen', function () {
        return view('Pages.marketing.calonkonsumen');
    });
    Route::get('/marketing/calonkonsumen/getCalonKonsumen', [MarketingController::class, 'getCalonKonsumen']);
    Route::get('/marketing/calonkonsumen/getCalonKonsumen/{id}', [MarketingController::class, 'getCalonKonsumenByLokasi']);


    Route::get('/logout', [AuthController::class, 'logout']);
});
