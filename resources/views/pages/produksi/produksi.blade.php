@extends('layouts.app')
@section('title', 'Produksi')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <section class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-12">
                                    <h1><b>DATA PRODUKSI PEMBANGUNAN</b></h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="col-12">
                        <div class="card">
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="tablePembangunan" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>BLOK</th>
                                            <th>TIPE</th>
                                            <th>HARGA BORONGAN</th>
                                            <th>NILAI BORONGAN</th>
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

                <div class="row">
                    <section class="content-header">
                        <div class="container-fluid">
                            <div class="row mb-2">
                                <div class="col-sm-12">
                                    <h1><b>DATA PRODUKSI</b></h1>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="col-12">
                        <div class="card">
                            <!-- /.card-header -->
                            <div class="card-body">
                                <table id="tableProduksi" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>BLOK</th>
                                            <th>TIPE</th>
                                            <th>HARGA BORONGAN</th>
                                            <th>NILAI BORONGAN</th>
                                            <th>TAMBAHAN</th>
                                            <th>POTONGAN</th>
                                            <th>SISA PEMBAYARAN</th>
                                            <th>SUB KONTRAKTOR</th>
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


    <div class="modal fade" id="mdEditPembangunan">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>EDIT PEMBANGUNAN</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeEditPembangunan" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="editid">ID</label>
                            <input type="text" class="form-control" name="id" id="editid" readonly>
                        </div>
                        <div class="form-group">
                            <label for="editblok">BLOK</label>
                            <input type="text" class="form-control" name="blok" id="editblok" readonly>
                        </div>
                        <div class="form-group">
                            <label for="edittipe">TIPE</label>
                            <input type="text" class="form-control" name="tipe" id="edittipe" readonly>
                        </div>
                        <div class="form-group">
                            <label for="edithargaborongan">HARGA BORONGAN</label>
                            <input type="text" class="form-control" name="hargaborongan" id="edithargaborongan">
                        </div>
                        <div class="form-group">
                            <label for="editketerangan">KETERANGAN</label>
                            <textarea class="form-control" name="keterangan" rows="4" id="editketerangan"></textarea>
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

    <div class="modal fade" id="mdEditProduksi">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>EDIT PRODUKSI</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="FormEditProduksi" method="POST" enctype="multipart/form-data">
                    @csrf
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="editidproduksi">ID</label>
                            <input type="text" class="form-control" name="id" id="editidproduksi" readonly>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label for="showblok">BLOK</label>
                                    <input type="text" class="form-control" name="blok" id="showblok" readonly>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="showtipe">TIPE</label>
                                    <input type="text" class="form-control" name="tipe" id="showtipe" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="editketerangan">KETERANGAN</label>
                            <textarea class="form-control" name="keterangan" rows="4" id="editketeranganproduksi"></textarea>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label for="edithargaboronganproduksi">HARGA BORONGAN</label>
                                    <input type="text" class="form-control" name="hargaborongan"
                                        id="edithargaboronganproduksi">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="edittambahanproduksi">TAMBAHAN</label>
                                    <input type="text" class="form-control" name="tambahan"
                                        id="edittambahanproduksi">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label for="editpotonganproduksi">POTONGAN</label>
                                    <input type="text" class="form-control" name="potongan"
                                        id="editpotonganproduksi">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="editprogresproduksi">PROGRES</label>
                                    <input type="text" class="form-control" name="progres" id="editprogresproduksi">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>BERKAS SPK</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input type="file" name="filespk" class="custom-file-input"
                                                id="filespk">
                                            <label class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="input-group-append">
                                            <span class="input-group-text">Upload</span>
                                        </div>
                                    </div>
                                    <p class="text-danger" id="previewFileSpk"><i><b>* Format Berkas Harus PDF</b></i></p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label>VIEW BERKAS SPK</label>
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <button type="button"
                                                class="form-control btn btn-outline-success btn-sm viewBerkasSPK">
                                                <i class="fa fa-upload"></i> <b>VIEW BERKAS</b>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label for="showhargaborongan">TERMIN 1</label>
                                    <button type="button" class="form-control btn btn-outline-warning btn-sm btnTermin"
                                        data-termin="1"><i class="fa fa-upload"></i> <b>UPLOAD TERMIN 1</b>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="showhargaborongan">TERMIN 2</label>
                                    <button type="button" class="form-control btn btn-outline-warning btn-sm btnTermin"
                                        data-termin="2"><i class="fa fa-upload"></i> <b>UPLOAD TERMIN 2</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label for="showhargaborongan">TERMIN 3</label>
                                    <button type="button" class="form-control btn btn-outline-warning btn-sm btnTermin"
                                        data-termin="3"><i class="fa fa-upload"></i> <b>UPLOAD TERMIN 3</b>
                                    </button>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="showhargaborongan">TERMIN 4</label>
                                    <button type="button" class="form-control btn btn-outline-warning btn-sm btnTermin"
                                        data-termin="4"><i class="fa fa-upload"></i> <b>UPLOAD TERMIN 4</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="form-group">
                            <label for="showhargaborongan">RETENSI</label>
                            <button type="button" class="form-control btn btn-outline-warning btn-sm btnTermin"
                                data-termin="RETENSI"><i class="fa fa-upload"></i> <b>UPLOAD RETENSI</b>
                            </button>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col-sm-6">
                                <!-- text input -->
                                <div class="form-group">
                                    <label for="editlistrikproduksi">NOMINAL INSTALASI LISTRIK</label>
                                    <input type="text" class="form-control" name="listrik" id="editlistrikproduksi">
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label for="editairproduksi">NOMINAL INSTALASI AIR</label>
                                    <input type="text" class="form-control" name="air" id="editairproduksi">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>SUB KONTRAKTOR</label>
                            <select class="form-control select2bs4" style="width: 100%;" name="subkontraktor"
                                id="editsubkontraktorproduksi">
                            </select>
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

    <!-- Modal Edit Termin -->
    <div class="modal fade" id="mdTermin" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form id="formEditTermin">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title" id="modalTerminTitle"><b>EDIT TERMIN</b></h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="terminType" name="terminType"> <!-- Untuk menyimpan jenis termin -->
                        <div class="form-group">
                            <label for="editterminid">ID</label>
                            <input type="text" class="form-control" id="editterminid" name="editterminid" readonly>
                        </div>
                        <div class="form-group">
                            <label for="editnominaltermin">NOMINAL TERMIN</label>
                            <input type="text" class="form-control" id="editnominaltermin" name="editnominaltermin">
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-default" data-dismiss="modal"><b>CLOSE</b></button>
                        <button type="submit" class="btn btn-primary"><b>SIMPAN</b></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- /.modal -->

    <!-- Modal untuk preview PDF -->
    <div class="modal fade" id="previewModal" tabindex="-1" role="dialog" aria-labelledby="previewModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="previewModalLabel">Preview Berkas SPK</h5>
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
