$(document).ready(function () {
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

    let tablePembangunan; // Deklarasi variabel global

    function loadPembangunan() {

        if ($.fn.DataTable.isDataTable("#tablePembangunan")) {
            tablePembangunan.destroy(); // Hapus instance DataTable sebelumnya
        }

        tablePembangunan = $("#tablePembangunan").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: "/produksi/pembangunan/getPembangunan", // Menampilkan semua data secara default
                type: "GET",
                dataSrc: "Data",
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
                    data: "blok.blok",
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
                    data: "produksi.hargaborongan",
                    className: "text-center",
                    render: function (data, type, row) {
                        // Format angka ke Rupiah
                        const formattedRupiah = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(data);

                        return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
                    }
                },
                {
                    data: "produksi.nilaiborongan",
                    className: "text-center",
                    render: function (data, type, row) {
                        const formattedRupiah = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        }).format(data);

                        return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
                    }
                },
                {
                    data: null,
                    className: "text-center",
                    render: function (data, type, row) {
                        return row.produksi && row.produksi.keterangan ? `<b>${row.produksi.keterangan}</b>` : `<span class="text-muted"> - </span>`;
                    }
                },
                {
                    data: null, // Kolom aksi
                    orderable: false, // Aksi tidak perlu diurutkan
                    className: "text-center",
                    render: function (data, type, row, meta) {
                        return `
                        <button type="button" class="btn btn-outline-warning btn-sm btneditpembangunan" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="EDIT DATA"><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-sm btnBangunUnit" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="BANGUN UNIT"><i class="fa fa-recycle"></i></button>
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
                $("#tablePembangunan_wrapper .col-md-6:eq(0)").append(`
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
                $("#tablePembangunan_wrapper .dataTables_filter").append(`
                    <button id="btnRefreshPembangunan" class="btn btn-primary btn-sm ml-2">
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

    loadPembangunan();

    //ketika button edit di tekan
    $(document).on("click", ".btneditpembangunan", function () {
        const pembangunanID = $(this).data("id");
        $.ajax({
            url: `/produksi/pembangunan/showPembangunan/${pembangunanID}`, // Endpoint untuk mendapatkan data konsumen
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Isi modal dengan data konsumen
                $("#editid").val(data.id);
                $("#editblok").val(data.marketing.blok.blok); // Pastikan lokasi terisi sebelum load konsumen
                $("#edittipe").val(data.marketing.tipe.tipe);

                $("#edithargaborongan").val(data.hargaborongan);
                $("#editketerangan").val(data.keterangan ?? "");

                // Tampilkan modal edit
                $("#mdEditPembangunan").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Pembangunan.",
                    "error"
                );
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEdit() {
        $("#mdEditPembangunan").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeEditPembangunan")[0].reset();
        });
    }

    resetFieldTutupModalEdit();

    //kirim data ke server <i class=""></i>
    $(document).on("submit", "#storeEditPembangunan", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
    
        // Buat objek FormData
        const formData = new FormData(this);
        const idPembangunan = formData.get("id"); // Ambil ID
    
        $.ajax({
            url: `/produksi/pembangunan/updatePembangunan/${idPembangunan}`,
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
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
    
                $("#mdEditPembangunan").modal("hide"); // Tutup modal
                resetFieldTutupModalEdit();
                tablePembangunan.ajax.reload(null, false); // Reload tabel
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