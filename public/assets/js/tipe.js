$(document).ready(function () {

    // Inisialisasi Select2 dengan tema Bootstrap 4
    $('.select2bs4').select2({
        theme: 'bootstrap4'
    });

    loadTipe();

    $(document).on("click", "#btnRefresh", function () {
        if (tableTipe) {
            tableTipe.ajax.reload(); // Reload data dari server
        }
        var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: "success",
            title: "Data Tipe Berhasil Di Refresh",
        });
    });

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip()
    }

    function loadTipe() {
        tableTipe = $("#tableTipe").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/tipe/getTipe`, // Ganti dengan URL endpoint server Anda
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
                    data: "tipe",
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
                $("#tableTipe_wrapper .dataTables_filter").append(`
                <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                    <i class="fa fa-sync"></i> Refresh
                </button>
            `);
            },
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

    $(".btn-tambahTipe").on("click", function () {
        $("#mdTambahTipe").modal("show");
        loadLokasi();
    });

    //kirim data ke server
    $("#storeTipe").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Ambil elemen input file

        // Buat objek FormData
        const formData = new FormData(this);
        $.ajax({
            url: "/tipe", // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdTambahTipe").modal("hide"); // Tutup modal
                $("#storeTipe")[0].reset(); // Reset form
                tableTipe.ajax.reload(); // Reload data dari server
            },
            error: function (xhr) {
                // Tampilkan pesan error dari server
                const errors = xhr.responseJSON.errors;
                if (errors) {
                    let errorMessage = "";
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
    $(document).on("click", ".btnedit", function () {
        const tipeID = $(this).data("id");

        $.ajax({
            url: `/tipe/${tipeID}`, // Endpoint untuk mendapatkan data pegawai
            type: "GET",
            success: function (response) {
                // Isi modal dengan data lokasi
                $("#editid").val(response.Data.id);

                // Muat opsi lokasi
                $.ajax({
                    url: "/lokasi/getLokasi",
                    type: "GET",
                    success: function (lokasiResponse) {
                        let options =
                            '<option value="">-- Pilih Jabatan --</option>';
                            lokasiResponse.Data.forEach((item) => {
                            const selected =
                                item.id === response.Data.lokasi_id
                                    ? "selected"
                                    : "";
                            options += `<option value="${item.id}" ${selected}>${item.lokasi}</option>`;
                        });
                        $("#editlokasi").html(options);
                    },
                });

                $("#edittipe").val(response.Data.tipe);

                // Tampilkan modal edit
                $("#mdEditTipe").modal("show");
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data tipe.",
                });
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    $("#mdEditTipe").on("hidden.bs.modal", function () {
        // Reset form input (termasuk gambar dan status)
        $("#storeEditTipe")[0].reset();
    });

    //kirim data ke server <i class=""></i>
    $("#storeEditTipe").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default

        // Buat objek FormData
        const formData = new FormData(this);
        // Ambil ID dari form
        const idTipe = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/tipe/${idTipe}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdEditTipe").modal("hide"); // Tutup modal
                $("#storeEditTipe")[0].reset(); // Reset form
                tableTipe.ajax.reload(); // Reload data dari server
            },
            error: function (xhr) {
                // Tampilkan pesan error dari server
                const errors = xhr.responseJSON.errors;
                if (errors) {
                    let errorMessage = "";
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

    $(document).on("click", ".btndelete", function () {
        let id = $(this).data("id");

        Swal.fire({
            title: "Apakah Anda yakin?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, hapus!",
            cancelButtonText: "Batal",
            customClass: {
                popup: 'animated bounceIn', // Animasi masuk
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-secondary'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/tipe/delete/${id}`, // Ganti dengan endpoint yang sesuai
                    type: "DELETE",
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") // Ambil token CSRF dari meta tag
                    },
                    success: function (response) {
                        Swal.fire({
                            title: "Terhapus!",
                            text: "Data berhasil dihapus.",
                            icon: "success",
                            customClass: {
                                popup: 'animated fadeOut' // Animasi keluar
                            }
                        });
                        tableTipe.ajax.reload(); // Reload DataTable setelah penghapusan
                    },
                    error: function () {
                        Swal.fire({
                            title: "Gagal!",
                            text: "Terjadi kesalahan, coba lagi nanti.",
                            icon: "error"
                        });
                    }
                });
            }
        });
    });
})