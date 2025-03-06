@extends('layouts.app')
@section('title', 'User')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1><b>DATA USER</b></h1>
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
                                <table id="tableUser" class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>NIP</th>
                                            <th>NAMA</th>
                                            <th>EMAIL</th>
                                            <th>HAK AKSES</th>
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

    <div class="modal fade" id="mdEditUser">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title"><b>EDIT USER</b></h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form id="storeEditUser" method="POST" enctype="multipart/form-data">
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
                                        id="editnip" readonly>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label>NAMA PEGAWAI</label>
                                    <input type="text" name="nama" class="form-control" placeholder="Masukan Nama"
                                        id="editnama" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>EMAIL</label>
                            <input type="text" name="email" class="form-control" id="editemail"
                                placeholder="Masukan Email">
                        </div>
                        <div class="form-group">
                            <label>PASSWORD</label>
                            <input type="password" name="password" class="form-control" placeholder="Masukan Password">
                        </div>
                        <div class="form-group">
                            <label>HAK AKSES</label>
                            <select class="form-control select2bs4" style="width: 100%;" name="role" id="editrole">
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

    <!-- jQuery -->
    <script src="{{ asset('assets') }}/plugins/jquery/jquery.min.js"></script>
    <script src="{{ asset('assets') }}/js/user.js"></script>
@endsection
