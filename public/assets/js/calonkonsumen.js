$(document).ready(function () {
    resetFieldTutupModalTambah();

    bsCustomFileInput.init();

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip(); // Inisialisasi ulang tooltip
    }

    function uploadImage(inputId, previewId) {
        const inputFile = document.getElementById(inputId);
        const previewContainer = document.getElementById(previewId);

        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = () => {
                previewContainer.innerHTML = "";
                const img = document.createElement("img");
                img.src = reader.result;
                previewContainer.appendChild(img);
            };

            reader.readAsDataURL(file);
        });
    }

    let tableCalon; // Deklarasi variabel global

    function loadCalonKonsumen() {

        if ($.fn.DataTable.isDataTable("#tableCalonKonsumen")) {
            tableCalon.destroy(); // Hapus instance DataTable sebelumnya
        }

        tableCalon = $("#tableCalonKonsumen").DataTable({
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
                {
                    data: null,
                    className: "text-center",
                    render: function (data) {
                        let konsumen = data.konsumen ? data.konsumen : "Tidak ada nama";
                        let blok = data.blok?.blok ? data.blok.blok : "Tidak ada blok";
                        return `<b>${konsumen} / ${blok}</b>`;
                    }
                },
                { data: "tanggalkomunikasi", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "progres", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "metodepembayaran.pembayaran", className: "text-center", render: data => `<b>${data}</b>` },
                {
                    data: null,
                    className: "text-center",
                    render: function (data, type, row) {
                        // Menampilkan badge sesuai dengan status
                        let missingImages = [];

                        // Cek setiap kolom gambar, jika null maka masukkan ke dalam daftar
                        if (!row.image_ktp) missingImages.push("KTP");
                        if (!row.image_kk) missingImages.push("KK");
                        if (!row.image_npwp) missingImages.push("NPWP");
                        if (!row.image_slipgaji) missingImages.push("Slip Gaji");
                        if (!row.image_tambahan) missingImages.push("Tambahan");
                        if (!row.image_buktibooking) missingImages.push("Bukti Booking");
                        if (!row.image_sp3bak) missingImages.push("SP3 BANK");

                        // Jika semua gambar ada, tampilkan "Sudah Lengkap"
                        if (missingImages.length === 0) {
                            return `<span class="badge badge-success">SUDAH LENGKAP</span>`;
                        }

                        // Jika ada yang kosong, tampilkan "Belum Lengkap" beserta daftar yang belum terisi
                        let missingText = missingImages.map(item => `<span class="badge badge-warning">${item}</span>`).join(" ");

                        return `
                            <button type="button" class="btn btn-outline-danger btn-xs btndetail" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="DETAIL BERKAS">
                                <b>BELUM LENGKAP</b>
                            </button>
                            <div class="mt-1">${missingText}</div>
                        `;
                    },
                },
                { data: "sumber", className: "text-center", render: data => `<b>${data}</b>` },
                {
                    data: null,
                    orderable: false,
                    className: "text-center",
                    render: function (data, type, row) {
                        return `
                            <button type="button" class="btn btn-outline-warning btn-sm btnedit" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="EDIT DATA">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" class="btn btn-outline-danger btn-sm btndelete" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="HAPUS DATA">
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

    loadCalonKonsumen();

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

        // Panggil fungsi untuk setiap input gambar
        uploadImage("imgSurvei", "previewImgSurvei");
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

    //kirim data ke server <i class=""></i>
    $("#storeCalonKonsumen").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Ambil elemen input file

        // Buat objek FormData
        const formData = new FormData(this);
        $.ajax({
            url: "/marketing/calonkonsumen/storeCalonKonsumen/", // Endpoint Laravel untuk menyimpan pegawai
            type: "POST",
            data: formData,
            processData: false, // Agar data tidak diubah menjadi string
            contentType: false, // Agar header Content-Type otomatis disesuaikan
            success: function (response) {
                var Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                Toast.fire({
                    icon: "success",
                    title: response.message,
                });

                $("#mdTambahCalonKonsumen").modal("hide"); // Tutup modal
                $("#storeCalonKonsumen")[0].reset(); // Reset form
                // **Pastikan tableCalon sudah didefinisikan sebelum reload**
                if ($.fn.DataTable.isDataTable("#tableCalonKonsumen")) {
                    tableCalon.ajax.reload(null, false);
                } else {
                    loadCalonKonsumen(); // Jika belum ada, inisialisasi ulang
                }
            },
            error: function (xhr) {
                // Tampilkan pesan error dari server
                const errors = xhr.responseJSON.errors;
                if (errors) {
                    let errorMessage = "";
                    var Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                    });

                    for (let key in errors) {
                        errorMessage += `${errors[key][0]}\n`;
                    }
                    Toast.fire({
                        icon: "error",
                        title: errorMessage,
                    });
                } else {
                    Toast.fire({
                        icon: "error",
                        title: response.message,
                    });
                }
            },
        });
    });

    //ketika button edit di tekan
    $(document).on("click", ".btndetail", function () {
        const marketingID = $(this).data("id");
        uploadImage("imgKTP", "previewImgKTP");
        uploadImage("imgKK", "previewImgKK");
        uploadImage("imgNPWP", "previewImgNPWP");
        uploadImage("imgSlipGaji", "previewImgSlipGaji");
        uploadImage("imgTambahan", "previewImgTambahan");
        uploadImage("imgBuktiBooking", "previewImgBuktiBooking");
        uploadImage("imgSP3BANK", "previewImgSP3BANK");

        $.ajax({
            url: `/marketing/calonkonsumen/showCalonKonsumen/${marketingID}`,
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Set ID & Blok ke Form
                $("#showid").val(data.id);
                $("#showkonsumen").val(data.konsumen);

                // Tampilkan Modal Edit
                $("#mdBerkasCalonKonsumen").modal("show");
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data jabatan.",
                });
            },
        });
    });
})