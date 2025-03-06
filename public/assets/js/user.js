$(document).ready(function () {
    loadUser();
    resetFieldTutupModalEdit();
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

    //ketika menekan tombol refresh
    $(document).on("click", "#btnRefresh", function () {
        if (tableUser) {
            tableUser.ajax.reload(null, false); // Reload data dari server
        }
        var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: "success",
            title: "Data Users Berhasil Di Refresh",
        });
    });

    //funsi untuk memuat data pegawai
    function loadUser() {
        tableUser = $("#tableUser").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/users/getUsers`, // Ganti dengan URL endpoint server Anda
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
                    data: "pegawai.nip",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },

                {
                    data: "pegawai.nama",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "email",
                    className: "text-center",
                    render: function (data, type, row) {
                        if(data == null) {
                            return `<b> - </b>`
                        } else {
                            return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                        }
                    },
                },
                {
                    data: "role.role",
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
                            return `<span class="badge badge-dark"> Tidak Aktif</span>`;
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
                $("#tableUser_wrapper .dataTables_filter").append(`
                <button id="btnRefresh" class="btn btn-primary btn-sm ml-2">
                    <i class="fa fa-sync"></i> Refresh
                </button>
            `);
            },
        });
    }

    // Ketika button edit ditekan
    $(document).on("click", ".btnedit", function () {
        const usersID = $(this).data("id");

        $.ajax({
            url: `/users/${usersID}`,
            type: "GET",
            success: function (response) {
                if (response?.Data?.length > 0) {  // Pastikan response Data adalah array dan tidak kosong
                    const data = response.Data[0]; // Ambil objek pertama dalam array

                    // Pastikan pegawai ada sebelum mengakses propertinya
                    let nip = data?.pegawai?.nip || "";
                    let nama = data?.pegawai?.nama || "";

                    // Set ID & Blok ke Form
                    $("#editid").val(data.id);
                    $("#editnip").val(nip);
                    $("#editnama").val(nama);
                    $("#editemail").val(data.email);

                    // Load Lokasi Dropdown & Pilih yang Sesuai
                    $.ajax({
                        url: "/role/getRole",
                        type: "GET",
                        success: function (res) {
                            let options = '<option value="">-- PILIH HAK AKSES --</option>';
                            res.Data.forEach((item) => {
                                let selected = item.id == data.role_id ? "selected" : "";
                                options += `<option value="${item.id}" ${selected}>${item.role}</option>`;
                            });
                            $("#editrole").html(options);
                        },
                    });

                    // Tampilkan Modal Edit
                    $("#mdEditUser").modal("show");
                } else {
                    Toast.fire({
                        icon: "error",
                        title: "Data user tidak ditemukan.",
                    });
                }
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data Users.",
                });
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEdit() {
        $("#mdEditUser").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeEditUser")[0].reset();
        });
    }

    //kirim data ke server
    $("#storeEditUser").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default

        // Buat objek FormData
        const formData = new FormData(this);
        // Ambil ID dari form
        const idUsers = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/users/${idUsers}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdEditUser").modal("hide"); // Tutup modal
                resetFieldTutupModalEdit();
                tableUser.ajax.reload(null, false); // Reload data dari server
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

})