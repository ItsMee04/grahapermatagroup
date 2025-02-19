$(document).ready(function () {
    loadPegawai();
    uploadImage()
    resetFieldTutupModalTambah()
    // Inisialisasi Select2 dengan tema Bootstrap 4
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    });

    bsCustomFileInput.init();

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    //ketika menekan tombol refresh
    $(document).on("click", "#btnRefresh", function () {
        if (tablePegawai) {
            tablePegawai.ajax.reload(); // Reload data dari server
        }
        var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: "success",
            title: "Data Pegawai Berhasil Di Refresh",
        });
    });

    //funsi untuk memuat data pegawai
    function loadPegawai() {
        tablePegawai = $("#tablePegawai").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/pegawai/getPegawai`, // Ganti dengan URL endpoint server Anda
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
                    data: "nip",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },

                {
                    data: "nama",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },

                {
                    data: "jabatan.jabatan",
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
                // Re-inisialisasi tooltip Bootstrap setelah render ulang DataTable
                initializeTooltip();
            },
            initComplete: function () {
                // Tambahkan tombol refresh ke dalam header tabel
                $("#tablePegawai_wrapper .dataTables_filter").append(`
                <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                    <i class="fa fa-sync"></i> Refresh
                </button>
            `);
            },
        });
    }

    // Fungsi untuk memuat data jabatan
    function loadJabatan() {
        $.ajax({
            url: "/jabatan/getJabatan", // Endpoint untuk mendapatkan data jabatan
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH JABATAN --</option>';
                response.Data.forEach((item) => {
                    options += `<option value="${item.id}">${item.jabatan}</option>`;
                });
                $("#jabatan").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal memuat data Jabatan!",
                });
            },
        });
    }

    // Fungsi untuk memuat data jabatan
    function loadJenisKelamin() {
        $.ajax({
            url: "/jeniskelamin/getJenisKelamin", // Endpoint untuk mendapatkan data jabatan
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH JENIS KELAMIN --</option>';
                response.Data.forEach((item) => {
                    options += `<option value="${item.id}">${item.jeniskelamin}</option>`;
                });
                $("#jeniskelamin").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal memuat data Jenis Kelamin!",
                });
            },
        });
    }

    // Fungsi untuk memuat data jabatan
    function loadAgama() {
        $.ajax({
            url: "/agama/getAgama", // Endpoint untuk mendapatkan data jabatan
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH AGAMA --</option>';
                response.Data.forEach((item) => {
                    options += `<option value="${item.id}">${item.agama}</option>`;
                });
                $("#agama").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal memuat data Agama!",
                });
            },
        });
    }

    //ketika menekan tombol tambah role
    $(".btn-tambahPegawai").on("click", function () {
        $("#mdTambahPegawai").modal("show");
        loadJabatan();
        loadJenisKelamin();
        loadAgama();
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalTambah() {
        $("#mdTambahPegawai").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storePegawai")[0].reset();
            $("#preview").empty();
        });
    }

    // Fungsi untuk menangani submit form pegawai
    $("#storePegawai").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Ambil elemen input file
        const fileInput = $("#image")[0];
        const file = fileInput.files[0];

        // Buat objek FormData
        const formData = new FormData(this);
        formData.delete("image"); // Hapus field 'image' bawaan form
        formData.append("image", file); // Tambahkan file baru
        $.ajax({
            url: "/pegawai", // Endpoint Laravel untuk menyimpan pegawai
            type: "POST",
            data: formData,
            processData: false, // Agar data tidak diubah menjadi string
            contentType: false, // Agar header Content-Type otomatis disesuaikan
            success: function (response) {
                const successtoastExample =
                    document.getElementById("successToast");
                const toast = new bootstrap.Toast(successtoastExample);
                $(".toast-body").text(response.message);
                toast.show();
                $("#mdTambahPegawai").modal("hide"); // Tutup modal
                $("#storePegawai")[0].reset(); // Reset form
                $("#preview").empty();
                loadPegawai();
            },
            error: function (xhr) {
                // Tampilkan pesan error dari server
                const errors = xhr.responseJSON.errors;
                if (errors) {
                    let errorMessage = "";
                    for (let key in errors) {
                        errorMessage += `${errors[key][0]}\n`;
                    }
                    const dangertoastExamplee =
                        document.getElementById("dangerToastError");
                    const toast = new bootstrap.Toast(dangertoastExamplee);
                    $(".toast-body").text(errorMessage);
                    toast.show();
                } else {
                    const dangertoastExamplee =
                        document.getElementById("dangerToastError");
                    const toast = new bootstrap.Toast(dangertoastExamplee);
                    $(".toast-body").text(response.message);
                    toast.show();
                }
            },
        });
    });

    function uploadImage() {
        //ini saat input
        const imgInput = document.getElementById("image");
        const previewImage = document.getElementById("preview");

        imgInput.addEventListener("change", () => {
            const file = imgInput.files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                previewImage.innerHTML = "";
                const img = document.createElement("img");
                img.src = reader.result;

                previewImage.appendChild(img);
            });

            reader.readAsDataURL(file);
        });
    }
})