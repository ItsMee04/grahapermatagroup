$(document).ready(function () {
    loadCalonKonsumen();
    resetFieldTutupModalTambah();

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    function uploadImage() {
        //ini saat input
        const imgSurvei = document.getElementById("imgSurvei");
        const previewImgSurvei = document.getElementById("previewImgSurvei");

        imgSurvei.addEventListener("change", () => {
            const file = imgSurvei.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                previewImgSurvei.innerHTML = "";
                const img = document.createElement("img");
                img.src = reader.result;

                previewImgSurvei.appendChild(img);
            });

            reader.readAsDataURL(file);
        });
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
                url: "/marketing/calonkonsumen/getCalonKonsumen", // Menampilkan semua data secara default
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
                        <select id="lokasiDropdown" class="form-control select2bs4" style="width: 100%;">
                        </select>
                    </div>
                `);

                // Inisialisasi Select2 dengan tema Bootstrap 4
                $('.select2bs4').select2({
                    theme: 'bootstrap4'
                });

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
            let url = selectedValue ? `/marketing/calonkonsumen/getCalonKonsumen/${selectedValue}` : "/marketing/calonkonsumen/getCalonKonsumen";
            tableCalon.ajax.url(url).load();
        });

        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefresh", function () {
            if (tableCalon) {
                tableCalon.ajax.reload(null, false);
            }
            var Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: "success",
                title: "Data Calon Konsumen Berhasil Di Refresh",
            });
        });
    }

    // Fungsi untuk memuat data lokasi
    function loadLokasi() {
        $.ajax({
            url: "/lokasi/getLokasi", // Endpoint untuk mendapatkan data jabatan
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH LOKASI --</option>';
                response.Data.forEach((item) => {
                    options += `<option value="${item.id}">${item.lokasi}</option>`;
                });
                $("#lokasi").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal Memuat Data Lokasi!",
                });
            },
        });
    }

    // Fungsi untuk memuat data lokasi
    function loadPembayaran() {
        $.ajax({
            url: "/metodepembayaran/getMetodePembayaran", // Endpoint untuk mendapatkan data jabatan
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH METODE PEMBAYARAN --</option>';
                response.Data.forEach((item) => {
                    options += `<option value="${item.id}">${item.pembayaran}</option>`;
                });
                $("#metodepembayaran").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal Memuat Data Metode Pembayaran!",
                });
            },
        });
    }

    //ketika menekan tombol tambah subkontraktor
    $(".btn-tambahCalonKonsumen").on("click", function () {
        $("#mdTambahCalonKonsumen").modal("show");
        uploadImage();
        loadLokasi();
        loadPembayaran();

        $("#lokasi").on("change", function () {
            let lokasiId = $(this).val();

            if (lokasiId) {
                $.ajax({
                    url: "/tipe/getTipeByLokasi/" + lokasiId, // Endpoint untuk mendapatkan data jabatan
                    type: "GET",
                    success: function (response) {
                        let options = '<option value="">-- PILIH TIPE --</option>';
                        response.Data.forEach((item) => {
                            options += `<option value="${item.id}">${item.tipe}</option>`;
                        });
                        $("#tipe").html(options); // Masukkan data ke select
                    },
                    error: function () {
                        Toast.fire({
                            icon: "error",
                            title: "Gagal Memuat Data Tipe!",
                        });
                    },
                });
            }
        });

        $("#tipe").on("change", function () {
            let tipeId = $(this).val();

            if (tipeId) {
                $.ajax({
                    url: "/blok/getBlokByTipe/" + tipeId, // Endpoint untuk mendapatkan data jabatan
                    type: "GET",
                    success: function (response) {
                        let options = '<option value="">-- PILIH BLOK --</option>';
                        response.Data.forEach((item) => {
                            options += `<option value="${item.id}">${item.blok}</option>`;
                        });
                        $("#blok").html(options); // Masukkan data ke select
                    },
                    error: function () {
                        Toast.fire({
                            icon: "error",
                            title: "Gagal Memuat Data Blok!",
                        });
                    },
                });
            }
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalTambah() {
        $("#mdTambahCalonKonsumen").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeCalonKonsumen")[0].reset();
            previewImgSurvei.innerHTML = "";
            imgSurvei.value = ""; // Reset input file

            // Hapus isi dropdown tipe dan blok tanpa menyisakan teks apa pun
            $("#tipe").html("").trigger("change");
            $("#blok").html("").trigger("change");
        });
    }
})