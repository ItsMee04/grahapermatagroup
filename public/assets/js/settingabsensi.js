$(document).ready(function(){
    loadPengaturanAbsen();
    resetFieldTutupModalTambah();
    resetFieldTutupModalEdit();
    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover' // Tooltip hanya muncul saat hover, tidak saat klik
        });
    }

    //ketika menekan tombol refresh
    $(document).on("click", "#btnRefresh", function () {
        if (tablePengaturanAbsensi) {
            tablePengaturanAbsensi.ajax.reload(); // Reload data dari server
        }
        var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: "success",
            title: "Data Pengaturan Absensi Berhasil Di Refresh",
        });
    });

    //funsi untuk memuat data subkontraktor
    function loadPengaturanAbsen() {
        tablePengaturanAbsensi = $("#tablePengaturanAbsensi").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/pengaturanabsensi/getSettingAbsensi`, // Ganti dengan URL endpoint server Anda
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
                    data: "checkin",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "checkout",
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
                $("#tablePengaturanAbsensi_wrapper .dataTables_filter").append(`
                <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                    <i class="fa fa-sync"></i> Refresh
                </button>
            `);
            },
        });
    }

    //ketika menekan tombol tambah subkontraktor
    $(".btn-tambahPengaturanAbsensi").on("click", function () {
        $("#mdTambahPengaturanAbsensi").modal("show");
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalTambah() {
        $("#mdTambahPengaturanAbsensi").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storePengaturanAbsensi")[0].reset();
        });
    }

    //kirim data ke server
    $("#storePengaturanAbsensi").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Ambil elemen input file

        // Buat objek FormData
        const formData = new FormData(this);
        $.ajax({
            url: "/pengaturanabsensi/storeSettingAbsensi", // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdTambahPengaturanAbsensi").modal("hide"); // Tutup modal
                resetFieldTutupModalTambah();
                tablePengaturanAbsensi.ajax.reload(); // Reload data dari server
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
        const pengaturanabsensiID = $(this).data("id");

        $.ajax({
            url: `/pengaturanabsensi/showSettingAbsensi/${pengaturanabsensiID}`,
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Set ID & Blok ke Form
                $("#editid").val(data.id);
                $("#editcheckin").val(data.checkin);
                $("#editcheckout").val(data.checkout);


                // Tampilkan Modal Edit
                $("#mdEditPengaturanAbsensi").modal("show");
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data blok.",
                });
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEdit() {
        $("#mdEditPengaturanAbsensi").on("hidden.bs.modal", function () {
            // Reset dropdown lokasi jika perlu
            // Reset form input (termasuk gambar dan status)
            $("#storeEditPengaturanAbsensi")[0].reset();
        });
    }

    //kirim data ke server <i class=""></i>
    $("#storeEditPengaturanAbsensi").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default

        // Buat objek FormData
        const formData = new FormData(this);
        // Ambil ID dari form
        const idPentaturanAbsensi = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/pengaturanabsensi/patchPengaturanAbsensi/${idPentaturanAbsensi}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdEditPengaturanAbsensi").modal("hide"); // Tutup modal
                resetFieldTutupModalEdit();
                tablePengaturanAbsensi.ajax.reload(); // Reload data dari server
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
                    url: `/pengaturanabsensi/deletePengaturanAbsensi/${id}`, // Ganti dengan endpoint yang sesuai
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
                        tablePengaturanAbsensi.ajax.reload(); // Reload DataTable setelah penghapusan
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