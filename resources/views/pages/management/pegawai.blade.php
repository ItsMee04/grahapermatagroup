@extends('layouts.app')
@section('title', 'Pegawai')
@section('content')
    <style>
        #preview {
            display: flex;
            justify-content: center;
            /* Tengahkan secara horizontal */
            align-items: center;
            /* Tengahkan secara vertikal */
            width: 150px;
            height: 150px;
            overflow: hidden;
            background-color: #f0f0f0;
            /* Untuk memastikan area terlihat */
        }

        #preview img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
            /* Gambar tetap proporsional dan tidak terpotong */
        }

        #editPreview {
            display: flex;
            justify-content: center;
            /* Tengahkan secara horizontal */
            align-items: center;
            /* Tengahkan secara vertikal */
            width: 150px;
            height: 150px;
            overflow: hidden;
            background-color: #f0f0f0;
            /* Untuk memastikan area terlihat */
        }

        #editPreview img {
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
                        <h1><b>DATA PEGAWAI</b></h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <button type="button" class="btn btn-outline-primary btn-sm btn-tambahPegawai"><i
                                        class="fa fa-plus"></i>
                                    TAMBAH PEGAWAI</button>
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
                                <table id="tablePegawai" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>NIP</th>
                                            <th>NAMA</th>
                                            <th>JABATAN</th>
                                            <th>STATUS</th>
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

    <div class="modal fade" id="mdTambahPegawai">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>TAMBAH PEGAWAI</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storePegawai" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>NIP PEGAWAI</label>
                                    <input type="text" name="nip" class="form-control" placeholder="Masukan NIP"
                                        required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>NAMA PEGAWAI</label>
                                    <input type="text" name="nama" class="form-control" placeholder="Masukan Nama"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>JENIS KELAMIM PEGAWAI</label>
                                    <select class="form-control select2bs4" style="width: 100%;" id="jeniskelamin"
                                        name="jeniskelamin" aria-placeholder="Pilih Jenis Kelamin" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>AGAMA PEGAWAI</label>
                                    <select class="form-control select2bs4" style="width: 100%;" id="agama"
                                        name="agama" aria-placeholder="Pilih Agama" required>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TEMPAT LAHIR PEGAWAI</label>
                                    <input type="text" name="tempat" class="form-control"
                                        placeholder="Masukan Tempat Lahir" required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL LAHIR PEGAWAI</label>
                                    <input type="date" name="tanggal" class="form-control"
                                        placeholder="Masukan Tanggal Lahir" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>JABATAN PEGAWAI</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="jabatan"
                                        id="jabatan" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>KONTAK PEGAWAI</label>
                                    <input type="text" name="kontak" class="form-control" placeholder="Masukan Kontak"
                                        required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>ALAMAT PEGAWAI</label>
                                    <textarea class="form-control" rows="4" name="alamat" placeholder="Masukan Alamat" required></textarea>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>Foto</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="image" class="custom-file-input"
                                                id="image">
                                            <label class="custom-file-label">Choose
                                                file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger"><i><b>* Format Foto Harus JPG/PNG</b></i></p>
                                    <div class="form-group">
                                        <a href="#" id="preview"
                                            style="width: 150px; height: 150px; display: block; overflow: hidden;"></a>
                                    </div>
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


    <div class="modal fade" id="mdEditPegawai">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>EDIT PEGAWAI</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeEditPegawai" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">ID</label>
                            <input type="text" class="form-control" name="id" id="editid" readonly>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>NIP PEGAWAI</label>
                                    <input type="text" name="nip" class="form-control" placeholder="Masukan NIP"
                                        id="editnip" required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>NAMA PEGAWAI</label>
                                    <input type="text" name="nama" class="form-control" placeholder="Masukan Nama"
                                        id="editnama" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>JENIS KELAMIM PEGAWAI</label>
                                    <select class="form-control select2bs4" style="width: 100%;" id="editjeniskelamin"
                                        name="jeniskelamin" aria-placeholder="Pilih Jenis Kelamin" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>AGAMA PEGAWAI</label>
                                    <select class="form-control select2bs4" style="width: 100%;" id="editagama"
                                        name="agama" aria-placeholder="Pilih Agama" required>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TEMPAT LAHIR PEGAWAI</label>
                                    <input type="text" name="tempat" class="form-control" id="edittempat"
                                        placeholder="Masukan Tempat Lahir" required>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL LAHIR PEGAWAI</label>
                                    <input type="date" name="tanggal" class="form-control" id="edittanggal"
                                        placeholder="Masukan Tanggal Lahir" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>JABATAN PEGAWAI</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="jabatan"
                                        id="editjabatan" required>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>KONTAK PEGAWAI</label>
                                    <input type="text" name="kontak" class="form-control" id="editkontak"
                                        placeholder="Masukan Kontak" required>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>ALAMAT PEGAWAI</label>
                                    <textarea class="form-control" rows="4" name="alamat" id="editalamat" placeholder="Masukan Alamat" required></textarea>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>Foto</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="image" class="custom-file-input"
                                                id="image">
                                            <label class="custom-file-label">Choose
                                                file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger"><i><b>* Format Foto Harus JPG/PNG</b></i></p>
                                    <div class="form-group">
                                        <div class="profile-pic-upload">
                                            <div style="width: 150px; height: 150px; display: block; overflow: hidden;"
                                                id="editPreview">
                                                <img src="" alt="avatar">
                                            </div>
                                        </div>
                                    </div>
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
    <!-- bs-custom-file-input -->
    <script src="{{ asset('assets') }}/plugins/bs-custom-file-input/bs-custom-file-input.min.js"></script>
    <script src="{{ asset('assets') }}/js/pegawai.js"></script>
@endsection
