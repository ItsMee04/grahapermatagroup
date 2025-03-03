@extends('layouts.app')
@section('title', 'Produksi')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1><b>DATA PRODUKSI</b></h1>
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
                            <input type="text" class="form-control" name="hargaborongan" id="edithargaborongan" required>
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

    <!-- jQuery -->
    <script src="{{ asset('assets') }}/plugins/jquery/jquery.min.js"></script>
    <script src="{{ asset('assets') }}/js/produksi.js"></script>
@endsection
