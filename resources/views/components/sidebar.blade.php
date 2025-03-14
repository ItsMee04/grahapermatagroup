<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="/dashboard" class="brand-link">
        <img src="{{ asset('assets') }}/dist/img/logo.png" alt="Graha Logo" class="brand-image img-circle elevation-3"
            style="opacity: .8">
        <span class="brand-text font-weight-light">
            <b class="text-center">GRAHA APPS</b>
        </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img src="{{ asset('storage/Avatar/' . Session::get('image')) }}" class="img-circle elevation-2"
                    alt="User Image">
            </div>
            <div class="info">
                <a href="#" class="d-block">{{ Session::get('nama') }}</a>
                <small class="d-block text-muted">{{ Session::get('jabatan') }}</small>
            </div>
        </div>

        <!-- Sidebar Menu -->
        <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                data-accordion="false">
                <li class="nav-item">
                    <a href="/dashboard" class="nav-link">
                        <i class="nav-icon fas fa-home"></i>
                        <p>
                            Dashboard
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-asterisk"></i>
                        <p>
                            Refrensi
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/jabatan" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Jabatan</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/jeniskelamin" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Jenis Kelamin</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/agama" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Agama</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-server"></i>
                        <p>
                            Master
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/lokasi" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Lokasi</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/tipe" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Tipe</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/blok" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Blok</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/lokasipajak" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Lokasi Pajak</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/rekening" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Rekening</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/subkontraktor" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Sub Kontraktor</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/role" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Hak Akses</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/metodepembayaran" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Metode Pembayaran</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/pengaturanabsensi" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Setting Absensi</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-users"></i>
                        <p>
                            Management User
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/pegawai" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Pegawai</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/users" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Users</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-store"></i>
                        <p>
                            Marketing
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/calonkonsumen" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Calon Konsumen</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/konsumen" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Konsumen</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/datakonsumen" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Data Konsumen</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link">
                        <i class="nav-icon fas fa-industry"></i>
                        <p>
                            Produksi
                            <i class="right fas fa-angle-left"></i>
                        </p>
                    </a>
                    <ul class="nav nav-treeview">
                        <li class="nav-item">
                            <a href="/produksi" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Produksi</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="/laporanharian" class="nav-link">
                                <i class="far fa-circle nav-icon"></i>
                                <p>Laporan Produksi Harian</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a href="/pajak" class="nav-link">
                        <i class="nav-icon fas fa-money-bill"></i>
                        <p>
                            Perpajakan
                        </p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="/logout" class="nav-link">
                        <i class="nav-icon fas fa-times"></i>
                        <p>
                            Logout
                        </p>
                    </a>
                </li>
            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>
<!-- jQuery -->
<script src="{{ asset('assets') }}/plugins/jquery/jquery.min.js"></script>
<script src="{{ asset('assets') }}/js/sidebar.js"></script>
