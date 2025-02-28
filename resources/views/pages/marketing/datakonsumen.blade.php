@extends('layouts.app')
@section('title', 'Data Konsumen')
@section('content')
    <style>
        #previewImgBukti img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            /* Gambar tetap proporsional dan tidak terpotong */
        }
    </style>
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1><b>DATA KONSUMEN</b></h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <button type="button" class="btn btn-outline-primary btn-sm btn-tambahDataKonsumen"><i
                                        class="fa fa-plus"></i>
                                    TAMBAH DATA KONSUMEN</button>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="tableDataKonsumen" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>NAMA</th>
                                            <th>AJB NOTARIS</th>
                                            <th>AJB BANK</th>
                                            <th>TTD DIREKTUR</th>
                                            <th>SERTIFIKAT</th>
                                            <th>KETERANGAN</th>
                                            <th>ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <div class="modal fade" id="mdTambahDataKonsumen">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>TAMBAH DATA KONSUMEN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeDataKonsumen" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label>LOKASI</label>
                            <input type="text" id="showlokasi" class="form-control" readonly>
                            <input type="hidden" id="idlokasi" name="lokasi" class="form-control">
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>NAMA KONSUMEN</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="konsumen"
                                        id="konsumen" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL AJB NOTARIS</label>
                                    <input type="date" name="ajbnotaris" class="form-control"
                                        placeholder="Masukan Tanggal">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TANGGAL AJB BANK</label>
                                    <input type="date" name="ajbbank" class="form-control" placeholder="Masukan Tanggal">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL TTD DIREKTUR</label>
                                    <input type="date" name="ttddirektur" class="form-control"
                                        placeholder="Masukan Tanggal">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>SERTIFIKAT</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="sertifikat" required>
                                        <option value="READY">READY</option>
                                        <option value="NON READY">NON READY</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>KETERANGAN</label>
                                    <textarea class="form-control" rows="4" name="keterangan" placeholder="Masukan Keterangan" required></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>BUKTI SERAH TERIMA</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="image_bukti" class="custom-file-input"
                                                id="imgBukti">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger"><i><b>* Format Foto Harus JPG/PNG</b></i></p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label>PREVIEW</label>
                                <div class="form-group">
                                    <a href="#" id="previewImgBukti" class="img-thumbnail"
                                        style="width: 150px; height: 150px; display: block; overflow: hidden;"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><b>CLOSE</b></button>
                        <button type="submit" class="btn btn-primary"><b>SIMPAN</b></button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="mdBerkasKomunikasiKonsumen">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>BERKAS KONSUMEN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeBerkasKomunikasiKonsumen" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label>ID</label>
                            <input type="text" name="id" id="showkomunikasiid" class="form-control"
                                placeholder="Masukan Nama" readonly>
                        </div>
                        <div class="form-group">
                            <label>NAMA KONSUMEN</label>
                            <input type="text" name="konsumen" id="showkomunikasikonsumen" class="form-control"
                                placeholder="Masukan Nama" readonly>
                        </div>
                        <div class="form-group">
                            <label>TANGGAL AWAL KOMUNIKASI</label>
                            <input type="date" name="tanggalkomunikasi" id="showTanggalKomunikasiKonsumen"
                                class="form-control" placeholder="Masukan Tanggal">
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>FOTO HASIL SURVEI</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="image_survei" class="custom-file-input"
                                                id="imgKomunikasiSurvei">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger"><i><b>* Format Foto Harus JPG/PNG</b></i></p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <label>PREVIEW</label>
                                <div class="form-group">
                                    <a href="#" id="showKomunikasiImageSurvey" class="img-thumbnail"
                                        style="width: 150px; height: 150px; display: block; overflow: hidden;"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><b>CLOSE</b></button>
                        <button type="submit" class="btn btn-primary"><b>SIMPAN</b></button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <div class="modal fade" id="mdEditKonsumen">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>EDIT KONSUMEN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeEditKonsumen" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label>ID</label>
                            <input type="text" name="id" id="editid" class="form-control"
                                placeholder="Masukan Nama" readonly>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>NAMA KONSUMEN</label>
                                    <input type="text" name="konsumen" id="editkonsumen" class="form-control"
                                        placeholder="Masukan Nama">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>KONTAK KONSUMEN</label>
                                    <input type="text" name="kontak" id="editkontak" class="form-control"
                                        placeholder="Masukan Kontak">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>ALAMAT KONSUMEN</label>
                            <textarea class="form-control" rows="4" name="alamat" id="editalamat" placeholder="Masukan Alamat" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>PROGRES</label>
                            <textarea class="form-control" rows="4" id="editprogres" name="progres" placeholder="Masukan Progress"
                                required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>METODE PEMBAYARAN</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="metodepembayaran"
                                        id="editmetodepembayaran" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>LOKASI PROYEK</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="lokasi"
                                        id="editlokasi" required>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TIPE</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="tipe"
                                        id="edittipe" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>BLOK</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="blok"
                                        id="editblok" required>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TANGGAL AWAL KOMUNIKASI</label>
                                    <input type="date" id="edittanggalkomunikasi" name="tanggalkomunikasi"
                                        class="form-control" placeholder="Masukan Tanggal">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>SUMBER INFORMASI</label>
                                    <input type="text" name="sumber" id="editsumber" class="form-control"
                                        placeholder="Masukan Sumber" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><b>CLOSE</b></button>
                        <button type="submit" class="btn btn-primary"><b>SIMPAN</b></button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->

    <!-- jQuery -->
    <script src="{{ asset('assets') }}/plugins/jquery/jquery.min.js"></script>
    <script src="{{ asset('assets') }}/js/datakonsumen.js"></script>
@endsection
