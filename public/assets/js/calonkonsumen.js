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
        let tableCalon = new DataTable("#tableCalonKonsumen", {
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: "/marketing/getCalonKonsumen", // Menampilkan semua data secara default
                type: "GET",
                dataSrc: "Data",
            },
            columns: [
                {
                    data: null,
                    className: "text-center",
                    render: function (data, type, row, meta) {
                        return meta.row + 1;
                    },
                    orderable: false,
                },
                { data: "nama", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "tanggalkomunikasi", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "progres", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "metodepembayaran.pembayaran", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "sumber", className: "text-center", render: data => `<b>${data}</b>` },
                {
                    data: null,
                    orderable: false,
                    className: "text-center",
                    render: function (data, type, row) {
                        return `
                            <button type="button" class="btn btn-outline-warning btn-sm btnedit" data-id="${row.id}" title="EDIT DATA">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm btndelete" data-id="${row.id}" title="HAPUS DATA">
                                <i class="fa fa-trash"></i>
                            </button>
                        `;
                    },
                },
            ],
            drawCallback: function () {
                initializeTooltip();
            },
            initComplete: function () {
                let api = this.api();
    
                // Tambahkan dropdown lokasi di atas tabel
                $("#tableCalonKonsumen_wrapper .col-md-6:eq(0)").append(`
                    <div class="d-flex align-items-center">
                        <label class="mr-2">Pilih Lokasi</label>
                        <select id="lokasiDropdown" class="form-control select2bs4">
                            <option value="">Semua Lokasi</option>
                        </select>
                    </div>
                `);
    
                // Tambahkan tombol refresh di dalam filter
                $("#tableCalonKonsumen_wrapper .dataTables_filter").append(`
                    <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                        <i class="fa fa-sync"></i> Refresh
                    </button>
                `);
    
                // Ambil data lokasi untuk dropdown
                $.ajax({
                    url: "lokasi/getLokasi",
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
                        console.error("Gagal mengambil data lokasi");
                    },
                });
            },
        });
    
        // Event listener untuk mengubah data tabel berdasarkan lokasi yang dipilih
        $(document).on("change", "#lokasiDropdown", function () {
            let selectedValue = $(this).val();
            let url = selectedValue ? `/marketing/getCalonKonsumen/${selectedValue}` : "/marketing/getCalonKonsumen";
            tableCalon.ajax.url(url).load();
        });
    
        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefresh", function () {
            tableCalon.ajax.reload(null, false);
        });
    }
    

})