<?php

namespace App\Http\Controllers\Produksi;

use Carbon\Carbon;
use App\Models\Produksi;
use App\Models\Marketing;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CashBesar;
use App\Models\DataKonsumenKeuangan;
use App\Models\DataKonsumenKeuangan2;
use Illuminate\Support\Facades\Auth;

class PembangunanController extends Controller
{
    public function getPembangunan()
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])
            ->whereNotNull('tanggalbooking')
            ->whereHas('produksi', function ($query) {
                $query->whereNull('statusproses');
            })
            ->get();

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function getPembangunanByLokasi($id)
    {
        $pembangunan = Marketing::with(['lokasi', 'tipe', 'blok', 'produksi'])
            ->whereNotNull('tanggalbooking')
            ->whereHas('produksi', function ($query) {
                $query->whereNull('statusproses');
            })
            ->where('lokasi_id', $id)
            ->get();

        return response()->json(['success' => true, 'message' => 'Data Pembangunan By Lokasi Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function showPembangunan($id)
    {
        $pembangunan = Produksi::with(['marketing.lokasi', 'marketing.tipe', 'marketing.blok', 'marketing'])->findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Ditemukan', 'Data' => $pembangunan]);
    }

    public function updatePembangunan(Request $request, $id)
    {
        $messages = [
            'required' => ':attribute wajib di isi !!!',
            'integer'  => ':attribute format wajib menggunakan PNG/JPG',
        ];

        $credentials = $request->validate([
            'hargaborongan' =>  'required|integer',
            'keterangan'    =>  'required',
        ], $messages);

        $produksi = Produksi::findOrFail($id);

        if (!$produksi) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        // Ambil nilai dari request
        $constharga = $request->hargaborongan;
        $consttipe  = $request->tipe;

        // Pisahkan angka pertama dari $tipee
        $constnilaitipe = explode('/', $consttipe);
        $constnilaitipereal = (int) $constnilaitipe[0]; // Ambil angka sebelum "/"

        // Hitung hasil perkalian
        $totalnilaiborongan = $constharga * $constnilaitipereal;

        $produksi->update([
            'hargaborongan' =>  $request->hargaborongan,
            'nilaiborongan' =>  $totalnilaiborongan,
            'keterangan'    =>  $request->keterangan,
            'user_id'       =>  Auth::user()->id,
        ]);

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Disimpan']);
    }

    public function updatePembangunanBowplang($id)
    {
        $pembangunanBowplang = Produksi::where('id', $id)->first();

        if ($pembangunanBowplang) {
            Produksi::where('id', $id)
                ->update([
                    'statusproses' => "ON PROSES",
                ]);
        }

        return response()->json(['success' => true, 'message' => 'Data Pembangunan Berhasil Dihapus']);
    }

    public function getProduksi()
    {
        $produksi = Produksi::with(['marketing', 'marketing.lokasi', 'marketing.blok', 'marketing.tipe', 'subkontraktor'])->where('statusproses', 'ON PROSES')->where('status', 1)->get();
        return response()->json(['success' => true, 'message' => 'Data Produksi Berhasil Ditemukan', 'Data' => $produksi]);
    }

    public function getProduksiByLokasi($id)
    {
        $produksi = Produksi::with(['marketing', 'marketing.lokasi', 'marketing.blok', 'marketing.tipe', 'subkontraktor'])
            ->whereHas('marketing', function ($query) use ($id) {
                $query->where('lokasi_id', $id); // Filter berdasarkan lokasi_id di tabel marketing
            })
            ->where('statusproses', 'ON PROSES')
            ->where('status', 1)
            ->get();
        return response()->json(['success' => true, 'message' => 'Data Produksi Berhasil Ditemukan', 'Data' => $produksi]);
    }

    public function showProduksi($id)
    {
        $produksi = Produksi::with(['marketing.lokasi', 'marketing.tipe', 'marketing.blok', 'marketing'])->findOrFail($id);

        return response()->json(['success' => true, 'message' => 'Data Produksi Berhasil Ditemukan', 'Data' => $produksi]);
    }

    public function updateTermin(Request $request, $id)
    {
        // Validasi request
        $request->validate([
            'terminType' => 'required|string|max:50',
            'editnominaltermin' => 'required|numeric|min:0',
        ]);

        // Cari data produksi
        $produksi = Produksi::find($id);
        if (!$produksi) {
            return response()->json(['success' => false, 'message' => 'Data Produksi tidak ditemukan!'], 404);
        }

        // Jika sisa sudah 0, hentikan proses dan kirim error
        if ($produksi->sisa == 0) {
            return response()->json([
                'success' => false,
                'message' => 'Sisa pembayaran sudah lunas, tidak bisa menambahkan termin atau retensi lagi!'
            ], 400);
        }

        // Ambil data yang diperlukan
        $nominal = $request->editnominaltermin;
        $tanggalSekarang = Carbon::now()->toDateString();

        // Ambil ID Konsumen & Lokasi Proyek
        $idKonsumen = $produksi->konsumen_id;
        $lokasiProyek = Marketing::where('id', $idKonsumen)->value('lokasi_id');

        // Ambil ID DataKonsumenKeuangan
        $idDakon = DataKonsumenKeuangan::where('konsumen_id', $idKonsumen)->value('id');
        $idDakon2 = DataKonsumenKeuangan2::where('datakonsumenkeuangan_id', $idDakon)
            ->where('keterangan', 'Termin ' . $request->terminType)
            ->value('id');

        // Ambil nama petugas (User yang login)
        $petugas = Auth::user()->id;

        // Tentukan kolom yang akan diperbarui berdasarkan terminType
        switch ($request->terminType) {
            case '1':
                $terminKolom = ['nominaltermin1', 'tanggaltermin1'];
                $keteranganTermin = 'Termin 1';
                break;
            case '2':
                $terminKolom = ['nominaltermin2', 'tanggaltermin2'];
                $keteranganTermin = 'Termin 2';
                break;
            case '3':
                $terminKolom = ['nominaltermin3', 'tanggaltermin3'];
                $keteranganTermin = 'Termin 3';
                break;
            case '4':
                $terminKolom = ['nominaltermin4', 'tanggaltermin4'];
                $keteranganTermin = 'Termin 4';
                break;
            case 'RETENSI':
                $terminKolom = ['nominalretensi', 'tanggalretensi'];
                $keteranganTermin = 'RETENSI';
                break;
            default:
                return response()->json(['success' => false, 'message' => 'Jenis termin tidak valid!'], 400);
        }

        // 🔹 Perhitungan ulang sisa:
        $totalTerminSebelumnya = $produksi->nominaltermin1
            + $produksi->nominaltermin2
            + $produksi->nominaltermin3
            + $produksi->nominaltermin4;

        if ($request->terminType == '1') {
            // Jika termin 1, langsung hitung dari nilaiborongan
            $sisa = $produksi->nilaiborongan - $nominal;
        } else {
            // Jika termin 2, 3, atau 4, kurangi dari total termin sebelumnya + nominal baru
            $sisa = $produksi->nilaiborongan - ($totalTerminSebelumnya + $nominal);
        }

        // Jika nominal melebihi sisa yang tersedia, tolak update
        if ($nominal > $produksi->sisa) {
            return response()->json([
                'success' => false,
                'message' => 'Nominal yang dimasukkan melebihi sisa yang tersedia!'
            ], 400);
        }

        // Cek apakah nominal termin sebelumnya kosong
        $terminLama = $produksi[$terminKolom[0]];

        if ($terminLama == 0) {
            // Insert data baru
            $produksi->update([
                $terminKolom[0] => $nominal,
                $terminKolom[1] => $tanggalSekarang,
                'sisa' => $sisa
            ]);

            DataKonsumenKeuangan2::create([
                'datakonsumenkeuangan_id' => $idDakon,
                'tanggal' => $tanggalSekarang,
                'keterangan' => $keteranganTermin,
                'biayakeluar' => $nominal,
                'user_id'   => $petugas,
                'status'    => 1,
            ]);

            CashBesar::create([
                'lokasi_id' => $lokasiProyek,
                'konsumen_id' => $idKonsumen,
                'tanggal' => $tanggalSekarang,
                'keterangan' => $keteranganTermin,
                'kredit' => $nominal,
                'user_id' => $petugas,
                'status'    => 1,
            ]);

            return response()->json(['success' => true, 'message' => 'Data berhasil disimpan!']);
        } else {
            // Update data yang sudah ada
            $produksi->update([
                $terminKolom[0] => $nominal,
                $terminKolom[1] => $tanggalSekarang,
                'sisa' => $sisa
            ]);

            DataKonsumenKeuangan2::where('id', $idDakon2)
                ->update(['biayakeluar' => $nominal]);

            CashBesar::where('konsumen_id', $idKonsumen)
                ->where('keterangan', $keteranganTermin)
                ->update(['kredit' => $nominal]);

            return response()->json(['success' => true, 'message' => 'Data berhasil diperbarui!']);
        }
    }
}
