@extends('layouts.app')
@section('title', 'Produksi')
@section('content')
    <style>
        #editpreviewImgProgres img {
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
                        <h1><b>DATA DETAIL PROGRES BANGUNAN</b></h1>
                    </div>
                </div>
            </div>
        </section>
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <!-- general form elements disabled -->
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title"><b>DETAIL PRODUKSI</b></h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <form id="detailProduksi">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- text input -->
                                            <div class="form-group">
                                                <label>BLOK</label>
                                                <input type="text" class="form-control" id="detailProduksiBlok" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>TIPE</label>
                                                <input type="text" class="form-control" id="detailProduksiTipe" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label>KETERANGAN</label>
                                        <textarea class="form-control" rows="3" id="detailProduksiKeterangan" disabled></textarea>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>HARGA BORONGAN</label>
                                                <input type="text" class="form-control" id="detailProduksiHargaBorongan"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>TAMBAHAN</label>
                                                <input type="text" class="form-control" id="detailProduksiTambahan"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>POTONGAN</label>
                                                <input type="text" class="form-control" id="detailProduksiPotongan"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>PROGRES</label>
                                                <input type="text" class="form-control" id="detailProduksiProgres"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>TANGGAL SPK</label>
                                                <input type="text" class="form-control" id="detailProduksiTanggalSPK"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>VIEW BERKAS SPK</label>
                                                <div class="input-group">
                                                    <div class="custom-file">
                                                        <button type="button"
                                                            class="form-control btn btn-outline-success btn-sm DetailviewBerkasSPK">
                                                            <i class="fa fa-upload"></i> <b>VIEW BERKAS</b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>TANGGAL TERMIN 1</label>
                                                <input type="text" class="form-control" id="detailProduksiTanggalTermin1"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>NOMINAL TERMIN 1</label>
                                                <input type="text" class="form-control" id="detailProduksiNominalTermin1"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>TANGGAL TERMIN 2</label>
                                                <input type="text" class="form-control" id="detailProduksiTanggalTermin2"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>NOMINAL TERMIN 2</label>
                                                <input type="text" class="form-control" id="detailProduksiNominalTermin2"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>TANGGAL TERMIN 3</label>
                                                <input type="text" class="form-control" id="detailProduksiTanggalTermin3"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>NOMINAL TERMIN 3</label>
                                                <input type="text" class="form-control" id="detailProduksiNominalTermin3"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>TANGGAL TERMIN 4</label>
                                                <input type="text" class="form-control"
                                                    id="detailProduksiTanggalTermin4" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>NOMINAL TERMIN 4</label>
                                                <input type="text" class="form-control"
                                                    id="detailProduksiNominalTermin4" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>TANGGAL RETENSI</label>
                                                <input type="text" class="form-control"
                                                    id="detailProduksiTanggalRetensi" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>NOMINAL RETENSI</label>
                                                <input type="text" class="form-control"
                                                    id="detailProduksiNominalRetensi" disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>NOMINAL INSTALASI LISTRIK</label>
                                                <input type="text" class="form-control" id="detailProduksiListrik"
                                                    disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>NOMINAL INSTALASI AIR</label>
                                                <input type="text" class="form-control" id="detailProduksiAir"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <!-- textarea -->
                                            <div class="form-group">
                                                <label>SUBKONTRAKTOR</label>
                                                <input type="text" class="form-control"
                                                    id="detailProduksiSubkontraktor" disabled>
                                            </div>
                                        </div>
                                        <div class="col-sm-6">
                                            <div class="form-group">
                                                <label>SISA PEMBAYARAN</label>
                                                <input type="text" class="form-control" id="detailProduksiSisa"
                                                    disabled>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!--/.col (right) -->
                    <!-- right column -->
                    <div class="col-md-6">
                        <div class="card card-primary">
                            <div class="card-header">
                                <h3 class="card-title"><b>DETAIL PROGRES BANGUNAN</b></h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="tableProgresBangunan" class="table table-bordered table-hover"
                                    style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>KETERANGAN</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Data ditampilkan di sini -->
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!--/.col (right) -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <!-- Modal untuk preview PDF -->
    <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>PREVIEW BERKAS SPK</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <iframe id="pdfIframe" src="" width="100%" height="600px" style="border: none;"></iframe>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="{{ asset('assets') }}/plugins/jquery/jquery.min.js"></script>
    <script src="{{ asset('assets') }}/js/produksi.js"></script>
@endsection
