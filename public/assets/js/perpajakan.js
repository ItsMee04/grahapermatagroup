$(document).ready(function(){
    // Inisialisasi Select2 dengan tema Bootstrap 4
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    });

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover' // Tooltip hanya muncul saat hover, tidak saat klik
        });
    }

    let tableRekapitulasiPajak; // Deklarasi variabel global

    function loadRekapitulasiPajak() {

        if ($.fn.DataTable.isDataTable("#tableRekapitulasiPajak")) {
            tableRekapitulasiPajak.destroy(); // Hapus instance DataTable sebelumnya
        }

        tableRekapitulasiPajak = $("#tableRekapitulasiPajak").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            // ajax: {
            //     url: "/pajak/getRekapitulasiPajak", // Menampilkan semua data secara default
            //     type: "GET",
            //     dataSrc: "Data",
            // },
            // columns: [
            //     {
            //         data: null, // Kolom nomor urut
            //         className: "text-center",
            //         render: function (data, type, row, meta) {
            //             return meta.row + 1; // Nomor urut dimulai dari 1
            //         },
            //         orderable: false,
            //     },
            //     {
            //         data: "blok.blok",
            //         className: "text-center",
            //         render: function (data, type, row) {
            //             return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
            //         },
            //     },
            //     {
            //         data: "tipe.tipe",
            //         className: "text-center",
            //         render: function (data, type, row) {
            //             return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
            //         },
            //     },
            //     {
            //         data: "produksi.hargaborongan",
            //         className: "text-center",
            //         render: function (data, type, row) {
            //             // Format angka ke Rupiah
            //             const formattedRupiah = new Intl.NumberFormat('id-ID', {
            //                 style: 'currency',
            //                 currency: 'IDR',
            //                 minimumFractionDigits: 0,
            //                 maximumFractionDigits: 0
            //             }).format(data);

            //             return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
            //         }
            //     },
            //     {
            //         data: "produksi.nilaiborongan",
            //         className: "text-center",
            //         render: function (data, type, row) {
            //             const formattedRupiah = new Intl.NumberFormat('id-ID', {
            //                 style: 'currency',
            //                 currency: 'IDR',
            //                 minimumFractionDigits: 0,
            //                 maximumFractionDigits: 0
            //             }).format(data);

            //             return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
            //         }
            //     },
            //     {
            //         data: null,
            //         className: "text-center",
            //         render: function (data, type, row) {
            //             return row.produksi && row.produksi.keterangan ? `<b>${row.produksi.keterangan}</b>` : `<span class="text-muted"> - </span>`;
            //         }
            //     },
            //     {
            //         data: null, // Kolom aksi
            //         orderable: false, // Aksi tidak perlu diurutkan
            //         className: "text-center",
            //         render: function (data, type, row, meta) {
            //             return `
            //             <button type="button" class="btn btn-outline-warning btn-sm btneditpembangunan" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="EDIT DATA"><i class="fa fa-edit"></i></button>
            //             <button type="button" class="btn btn-outline-danger btn-sm btnBangunUnit" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="BANGUN UNIT"><i class="fa fa-recycle"></i></button>
            //         `;
            //         },
            //     },
            // ],
            drawCallback: function () {
                initializeTooltip();
            },
            initComplete: function () {
                let api = this.api();

                // Tambahkan dropdown lokasi di atas tabel
                $("#tableRekapitulasiPajak_wrapper .col-md-6:eq(0)").append(`
                    <div class="d-flex align-items-center">
                        <label class="mr-2">Pilih Lokasi</label>
                        <select id="lokasiDropdown" class="form-control select2bs4" style="width: 100%;">
                        </select>
                    </div>
                `);

                // Inisialisasi Select2 dengan tema Bootstrap 4
                $('.select2bs4').select2({
                    theme: 'bootstrap4'
                });

                // Tambahkan tombol refresh di dalam filter
                $("#tableRekapitulasiPajak_wrapper .dataTables_filter").append(`
                    <button id="btnRefreshPembangunan" class="btn btn-primary btn-sm ml-2">
                        <i class="fa fa-sync"></i> Refresh
                    </button>
                `);

                // Ambil data lokasi untuk dropdown
                $.ajax({
                    url: "lokasipajak/getLokasiPajak",
                    type: "GET",
                    dataType: "json",
                    success: function (response) {
                        if (response.success && response.Data.length > 0) {
                            response.Data.forEach(function (lokasi) {
                                $("#lokasiDropdown").append(`<option value="${lokasi.id}">${lokasi.lokasi}</option>`);
                            });
                        }
                    },
                    error: function () {
                        console.error("Gagal mengambil data lokasi pajak");
                    },
                });
            },
        });

        // Event listener untuk mengubah data tabel berdasarkan lokasi yang dipilih
        $(document).on("change", "#lokasiDropdown", function () {
            let selectedValue = $(this).val();
            let url = selectedValue ? `/produksi/pembangunan/getPembangunanByLokasi/${selectedValue}` : "/produksi/pembangunan/getPembangunan";
            tablePembangunan.ajax.url(url).load();
        });

        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefreshPembangunan", function () {
            if (tablePembangunan) {
                tablePembangunan.ajax.reload(null, false);
            }
            var Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: "success",
                title: "Data Produksi Pembangunan Berhasil Di Refresh",
            });
        });
    }

    loadRekapitulasiPajak();
})