$(document).ready(function () {
    loadLaporan()
    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover' // Tooltip hanya muncul saat hover, tidak saat klik
        });
    }

    //ketika menekan tombol refresh
    $(document).on("click", "#btnRefresh", function () {
        if (tableLaporanHarian) {
            tableLaporanHarian.ajax.reload(null, false); // Reload data dari server
        }
        var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: "success",
            title: "Data Laporan Harian Berhasil Di Refresh",
        });
    });

    //funsi untuk memuat data role
    function loadLaporan() {
        tableLaporanHarian = $("#tableLaporanHarian").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/produksi/getLaporanHarian`, // Ganti dengan URL endpoint server Anda
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
                    data: "tanggal",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "laporan",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
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
                $("#tableLaporanHarian_wrapper .dataTables_filter").append(`
                <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                    <i class="fa fa-sync"></i> Refresh
                </button>
            `);
            },
        });
    }

    //ketika menekan tombol tambah role
    $(".btn-tambahLaporan").on("click", function () {
        $('#laporan').summernote({
            height: 300, // Tinggi editor
            placeholder: 'Tulis laporan di sini...',
        })
        $("#mdTambahLaporan").modal("show");
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalTambah() {
        $("#mdTambahLaporan").on("hidden.bs.modal", function () {
            $('#laporan').summernote('reset'); // Reset konten Summernote
            $('#laporan').summernote('destroy'); // Hapus Summernote agar kembali ke textarea normal
        });
    }

    resetFieldTutupModalTambah();

    //kirim data ke server
    $("#storeLaporanHarian").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default

        // Ambil isi laporan dari Summernote
        const laporanContent = $("#laporan").summernote("code");

        // Buat objek FormData
        const formData = new FormData(this);
        formData.append("laporan", laporanContent); // Tambahkan data Summernote ke FormData

        $.ajax({
            url: "/produksi/storeLaporanHarian", // Endpoint Laravel untuk menyimpan laporan
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
                    title: "Data Laporan Harian Berhasil Di Simpan",
                });

                $("#mdTambahLaporan").modal("hide"); // Tutup modal
                $("#laporan").summernote("code", ""); // Reset Summernote
                $("#storeLaporanHarian")[0].reset(); // Reset form
                tableLaporanHarian.ajax.reload(); // Reload tabel data (jika ada)
            },
            error: function (xhr) {
                var Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                if (xhr.responseJSON && xhr.responseJSON.errors) {
                    const errors = xhr.responseJSON.errors;
                    let errorMessage = "";

                    for (let key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            errorMessage += `${errors[key][0]}\n`; // Ambil pesan pertama dari setiap error
                        }
                    }

                    Toast.fire({
                        icon: "error",
                        title: errorMessage.trim(),
                    });

                } else if (xhr.responseJSON && xhr.responseJSON.message) {
                    Toast.fire({
                        icon: "error",
                        title: xhr.responseJSON.message,
                    });

                } else {
                    Toast.fire({
                        icon: "error",
                        title: "Terjadi kesalahan. Silakan coba lagi!",
                    });
                }
            }
        });
    });

    //ketika button edit di tekan
    $(document).on("click", ".btnedit", function () {
        const laporanID = $(this).data("id");

        $.ajax({
            url: `/produksi/showLaporanHarian/${laporanID}`,
            type: "GET",
            success: function (response) {
                const data = response.Data;

                $("#editid").val(data.id);
                // Set nilai ke dalam Summernote
                // Periksa apakah Summernote sudah diinisialisasi
                if (!$("#editlaporan").hasClass("note-editor")) {
                    $("#editlaporan").summernote({ height: 300 });
                }
                $("#editlaporan").summernote("code", data.laporan);
                // Tampilkan Modal Edit
                $("#mdEditLaporan").modal("show");
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data Laporan Harian.",
                });
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEdit() {
        $("#mdEditLaporan").on("hidden.bs.modal", function () {
            $('#editlaporan').summernote('reset'); // Reset konten Summernote
            $('#editlaporan').summernote('destroy'); // Hapus Summernote agar kembali ke textarea normal
        });
    }

    resetFieldTutupModalEdit();

    //kirim data ke server
    $("#storeEditLaporan").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default

        // Ambil isi laporan dari Summernote
        const laporanContent = $("#editlaporan").summernote("code");

        // Buat objek FormData
        const formData = new FormData(this);
        formData.append("laporan", laporanContent); // Tambahkan data Summernote ke FormData
        // Ambil ID dari form
        const idLaporan = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/produksi/updateLaporanHarian/${idLaporan}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdEditLaporan").modal("hide"); // Tutup modal
                resetFieldTutupModalEdit();
                tableLaporanHarian.ajax.reload(null, false); // Reload data dari server
            },
            error: function (xhr) {
                var Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                if (xhr.responseJSON && xhr.responseJSON.errors) {
                    const errors = xhr.responseJSON.errors;
                    let errorMessage = "";

                    for (let key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            errorMessage += `${errors[key][0]}\n`; // Ambil pesan pertama dari setiap error
                        }
                    }

                    Toast.fire({
                        icon: "error",
                        title: errorMessage.trim(),
                    });

                } else if (xhr.responseJSON && xhr.responseJSON.message) {
                    Toast.fire({
                        icon: "error",
                        title: xhr.responseJSON.message,
                    });

                } else {
                    Toast.fire({
                        icon: "error",
                        title: "Terjadi kesalahan. Silakan coba lagi!",
                    });
                }
            }
        });
    });

    //ketika button delete di tekan
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
                    url: `/produksi/deleteLaporanHarian/${id}`, // Ganti dengan endpoint yang sesuai
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
                        tableLaporanHarian.ajax.reload(null, false); // Reload DataTable setelah penghapusan
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