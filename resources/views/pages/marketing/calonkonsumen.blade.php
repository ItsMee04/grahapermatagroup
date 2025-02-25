@extends('layouts.app')
@section('title', 'Calon Konsumen')
@section('content')
    <style>
        #previewImgSurvei img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            /* Gambar tetap proporsional dan tidak terpotong */
        }

        #editPreviewImgSurvei img {
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
                        <h1><b>DATA CALON KONSUMEN</b></h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <button type="button" class="btn btn-outline-primary btn-sm btn-tambahCalonKonsumen"><i
                                        class="fa fa-plus"></i>
                                    TAMBAH CALON KONSUMEN</button>
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
                                <table id="tableCalonKonsumen" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>NAMA</th>
                                            <th>AWAL KOMUNIKASI</th>
                                            <th>PROGRES</th>
                                            <th>PEMBAYARAN</th>
                                            <th>KELENGKAPAN BERKAS</th>
                                            <th>SUMBER</th>
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

    <div class="modal fade" id="mdTambahCalonKonsumen">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>TAMBAH CALON KONSUMEN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeCalonKonsumen" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>NAMA KONSUMEN</label>
                                    <input type="text" name="konsumen" class="form-control" placeholder="Masukan Nama">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>KONTAK KONSUMEN</label>
                                    <input type="text" name="kontak" class="form-control" placeholder="Masukan Kontak">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>ALAMAT KONSUMEN</label>
                            <textarea class="form-control" rows="4" name="alamat" placeholder="Masukan Alamat" required></textarea>
                        </div>
                        <div class="form-group">
                            <label>PROGRES</label>
                            <textarea class="form-control" rows="4" name="progres" placeholder="Masukan Progress" required></textarea>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>METODE PEMBAYARAN</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="metodepembayaran"
                                        id="metodepembayaran" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>LOKASI PROYEK</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="lokasi"
                                        id="lokasi" required>
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
                                        id="tipe" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>BLOK</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="blok"
                                        id="blok" required>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TANGGAL AWAL KOMUNIKASI</label>
                                    <input type="date" name="tanggalkomunikasi" class="form-control"
                                        placeholder="Masukan Tanggal">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>SUMBER INFORMASI</label>
                                    <input type="text" name="sumber" class="form-control" placeholder="Masukan Sumber"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>FOTO HASIL SURVEI</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="image_survei" class="custom-file-input"
                                                id="imgSurvei">
                                            <label class="custom-file-label">Choose
                                                file</label>
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
                                    <a href="#" id="previewImgSurvei" class="img-thumbnail"
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

    <!-- jQuery -->
    <script src="{{ asset('assets') }}/plugins/jquery/jquery.min.js"></script>
    <script src="{{ asset('assets') }}/js/calonkonsumen.js"></script>
@endsection
