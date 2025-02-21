$(document).ready(function () {
    loadCalonKonsumen();
    // Inisialisasi Select2 dengan tema Bootstrap 4
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    });

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    function loadCalonKonsumen() {
        tableCalon = new DataTable("#tableCalonKonsumen", {
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/marketing/getCalonKonsumen`, // Ganti dengan URL endpoint server Anda
                type: "GET", // Metode HTTP (GET/POST)
                dataSrc: "Data", // Jalur data di response JSON
            },
            columns: [
                {
                    data: null, // Kolom nomor urut
                    className: "text-center",
                    render: function (data, type, row, meta) {
                        return meta.row + 1; // Nomor urut dimulai dari 1
                    },
                    orderable: false,
                },
                {
                    data: "lokasi.lokasi",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "tipe.tipe",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "blok",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "status",
                    className: "text-center",
                    render: function (data, type, row) {
                        // Menampilkan badge sesuai dengan status
                        if (data == 1) {
                            return `<span class="badge badge-success">Aktif</span>`;
                        } else if (data == 2) {
                            return `<span class="badge badge-danger"> Tidak Aktif</span>`;
                        } else {
                            return `<span class="bg-dark"> Unknown</span>`;
                        }
                    },
                },
                {
                    data: null, // Kolom aksi
                    orderable: false, // Aksi tidak perlu diurutkan
                    className: "text-center",
                    render: function (data, type, row, meta) {
                        return `
                        <button type="button" class="btn btn-outline-warning btn-sm btnedit" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="EDIT DATA"><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-sm btndelete" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="HAPUS DATA"><i class="fa fa-trash"></i></button>
                    `;
                    },
                },
            ],
            drawCallback: function () {
                initializeTooltip();
            },
            initComplete: function () {
                let api = this.api();
                
                // Tambahkan wrapper untuk tombol refresh dan dropdown lokasi di kanan atas
                $("#tableCalonKonsumen_wrapper .col-md-6:eq(0)").append(`
                    <div class="d-flex align-items-center">
                        <label>PILIH LOKASI</label>
                        <select id="lokasiDropdown" class="form-control select2bs4 ml-2">
                        </select>
                    </div>
                `);

                // Tambahkan tombol refresh ke dalam header tabel
                $("#tableCalonKonsumen_wrapper .dataTables_filter").append(`
                    <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                        <i class="fa fa-sync"></i> Refresh
                    </button>
                `);
                
                // Ambil data lokasi dan isi dropdown
                $.ajax({
                    url: "lokasi/getLokasi",
                    type: "GET",
                    dataType: "json",
                    success: function (response) {
                        if (response.success && response.Data.length > 0) {
                            response.Data.forEach(function (lokasi) {
                                $("#lokasiDropdown").append(`
                                    <option value="${lokasi.id}">${lokasi.lokasi}</option>
                                `);
                            });
                        }
                    },
                    error: function () {
                        console.error("Gagal mengambil data lokasi");
                    }
                });
            }
        });
        
        // Event listener untuk filter berdasarkan lokasi
        $(document).on("change", "#lokasiDropdown", function () {
            let selectedValue = $(this).val();
            console.log(selectedValue)
        });
        
        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefresh", function () {
            tableCalon.ajax.reload(null, false);
        });
    }

})