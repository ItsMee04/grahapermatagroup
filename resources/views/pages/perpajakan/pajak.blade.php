@extends('layouts.app')
@section('title', 'Laporan Harian')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1><b>DATA PERPAJAKAN</b></h1>
                    </div>
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <button type="button" class="btn btn-outline-primary btn-sm btntambahRekapitulasiPajak"><i
                                        class="fa fa-plus"></i>
                                    FORM INPUT PERPAJAKAN</button>
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
                                <table id="tableRekapitulasiPajak" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>KONSUMEN</th>
                                            <th>MASA PAJAK</th>
                                            <th>HARGA TRANSAKSI</th>
                                            <th>PPH FINAL</th>
                                            <th>PPN KELUAR</th>
                                            <th>PPN MASUK</th>
                                            <th>NOMINAL PPN AKHIR</th>
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

    <div class="modal fade" id="mdTambahRekapitulasiPajak">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>TAMBAH LAPORAN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeRekapitulasiPajak" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>NAMA KONSUMEN</label>
                                    <select class="form-control select2bs4" style="width: 100%;" name="konsumen"
                                        id="konsumen">
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>HARGA TRANSAKSI</label>
                                    <input type="text" name="hargatransaksi" class="form-control"
                                        placeholder="Masukan Harga Transaksi">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TANGGAL INPUT PPH</label>
                                    <input type="date" name="tanggalinputpph" class="form-control"
                                        placeholder="Masukan Harga Transaksi">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL INPUT PPN</label>
                                    <input type="date" name="tanggalinputppn" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TANGGAL BAYAR PPH</label>
                                    <input type="date" name="tanggalbayarpph" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL BAYAR PPN</label>
                                    <input type="date" name="tanggalbayarppn" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>TANGGAL LAPOR PPH</label>
                                    <input type="date" name="tanggallaporpph" class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>TANGGAL LAPOR PPN</label>
                                    <input type="date" name="tanggallaporppn" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>FILE REKAP PAJAK</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="fileRekapPajak" class="custom-file-input"
                                                id="fileRekapPajak">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger" id="previewFileRekapPajak"><i><b>* Format Berkas Harus
                                                PDF</b></i></p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>MASA PAJAK</label>
                                    <input type="date" name="masapajak" class="form-control">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>FILE BUKTI LAPOR INPUT PPH</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="fileLaporInputPph" class="custom-file-input"
                                                id="fileLaporInputPph">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger" id="previewfileLaporInputPph"><i><b>* Format Berkas Harus
                                                PDF</b></i></p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>FILE BUKTI LAPOR INPUT PPN</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="fileLaporInputPpn" class="custom-file-input"
                                                id="fileLaporInputPpn">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger" id="previewfileLaporInputPpn"><i><b>* Format Berkas Harus
                                                PDF</b></i></p>
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


    <div class="modal fade" id="mdEditLaporan">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>EDIT LAPORAN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeEditLaporan" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">ID</label>
                            <input type="text" class="form-control" name="id" id="editid" readonly>
                        </div>
                        <div class="form-group">
                            <label for="laporan">LAPORAN</label>
                            <textarea class="form-control" name="laporan" id="editlaporan" style="height: 300px"></textarea>
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
    <script src="{{ asset('assets') }}/js/perpajakan.js"></script>

@endsection
