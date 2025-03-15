$(document).ready(function () {
    bsCustomFileInput.init();
    // Inisialisasi Select2 dengan tema Bootstrap 4
    $(".select2bs4").select2({
        theme: "bootstrap4",
    });

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: "hover", // Tooltip hanya muncul saat hover, tidak saat klik
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
            ajax: {
                url: "/pajak/getRekapitulasiPajak", // Menampilkan semua data secara default
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
                    data: "marketing.konsumen",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "marketing.konsumen",
                    className: "text-center",
                    render: function (data, type, row) {
                        if (data && data !== "0000-00-00") {
                            // Ubah format tanggal ke Bulan Tahun (Bahasa Indonesia)
                            let tanggal = new Date(data);
                            let options = { month: "long", year: "numeric" };
                            return `<b>${tanggal.toLocaleDateString(
                                "id-ID",
                                options
                            )}</b>`;
                        } else {
                            return "";
                        }
                    },
                },
                {
                    data: "hargatransaksi",
                    className: "text-center",
                    render: function (data, type, row) {
                        // Format angka ke Rupiah
                        const formattedRupiah = new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(data);

                        return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
                    },
                },
                {
                    data: "nominalpph",
                    className: "text-center",
                    render: function (data, type, row) {
                        const formattedRupiah = new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(data);

                        return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
                    },
                },
                {
                    data: "nominalppnkeluar",
                    className: "text-center",
                    render: function (data, type, row) {
                        const formattedRupiah = new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(data);

                        return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
                    },
                },
                {
                    data: "nominalppnmasuk",
                    className: "text-center",
                    render: function (data, type, row) {
                        const formattedRupiah = new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        }).format(data);

                        return `<b>${formattedRupiah}</b>`; // Menjadikan teks tebal
                    },
                },
                {
                    data: "keterangan",
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
                        <button type="button" class="btn btn-outline-warning btn-sm btnEditPajak" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="EDIT DATA"><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-sm btnDetailPajak" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="DETAIL DATA"><i class="fa fa-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-sm btnEditPPNMasuk" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="BANGUN UNIT"><i class="fa fa-recycle"></i></button>
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
                $("#tableRekapitulasiPajak_wrapper .col-md-6:eq(0)").append(`
                    <div class="d-flex align-items-center">
                        <label class="mr-2">Pilih Lokasi</label>
                        <select id="lokasiPajakDropdown" class="form-control select2bs4" style="width: 100%;">
                        </select>
                    </div>
                `);

                // Inisialisasi Select2 dengan tema Bootstrap 4
                $(".select2bs4").select2({
                    theme: "bootstrap4",
                });

                // Tambahkan tombol refresh di dalam filter
                $("#tableRekapitulasiPajak_wrapper .dataTables_filter").append(`
                    <button id="btnRefreshRekapitulasi" class="btn btn-primary btn-sm ml-2">
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
                                $("#lokasiPajakDropdown").append(
                                    `<option value="${lokasi.id}">${lokasi.lokasi}</option>`
                                );
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
        $(document).on("change", "#lokasiPajakDropdown", function () {
            let selectedValue = $(this).val();
            let url = selectedValue
                ? `/pajak/getRekapitulasiPajakByLokasi/${selectedValue}`
                : "/pajak/getRekapitulasiPajak";
            tableRekapitulasiPajak.ajax.url(url).load();
        });

        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefreshRekapitulasi", function () {
            if (tableRekapitulasiPajak) {
                tableRekapitulasiPajak.ajax.reload(null, false);
            }
            var Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: "success",
                title: "Data Rekapitulasi Pajak Berhasil Di Refresh",
            });
        });
    }

    loadRekapitulasiPajak();

    // Fungsi untuk memuat data konsumen berdasarkan lokasi yang dipilih
    function loadNamaKonsumen() {
        $.ajax({
            url: "/marketing/konsumen/getKonsumen", // Endpoint untuk mendapatkan data jabatan
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH KONSUMEN --</option>';
                response.Data.forEach((item) => {
                    options += `<option value="${item.id}">${item.konsumen}</option>`;
                });
                $("#konsumen").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal memuat data Konsumen!",
                });
            },
        });
    }

    function handlePDFUpload(inputId, previewId) {
        let fileInput = document.getElementById(inputId);
        let previewContainer = document.getElementById(previewId);

        fileInput.addEventListener("change", function (event) {
            let file = event.target.files[0];

            // Reset preview sebelum validasi
            previewContainer.innerHTML = "";

            // Validasi format file harus PDF
            if (file && file.type !== "application/pdf") {
                var Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                Toast.fire({
                    icon: "error",
                    title: "Hanya File PDF yang diperbolehkan",
                });

                fileInput.value = ""; // Reset input file
                return;
            }

            // Jika valid, tampilkan checkbox sukses
            if (file) {
                previewContainer.innerHTML = `
                    <div class="form-check">
                        <label class="form-check-label text-success" for="pdfSuccess">
                            <p class="fas fa-check-circle"></p> File PDF berhasil diunggah!
                        </label>
                    </div>
                `;
            }
        });
    }

    //ketika menekan tombol tambah role
    $(".btntambahRekapitulasiPajak").on("click", function () {
        loadNamaKonsumen();
        handlePDFUpload("fileRekapPajak", "previewFileRekapPajak");
        handlePDFUpload("fileLaporInputPph", "previewfileLaporInputPph");
        handlePDFUpload("fileLaporInputPpn", "previewfileLaporInputPpn");
        $("#mdTambahRekapitulasiPajak").modal("show");
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalTambahRekapitulasi() {
        $("#mdTambahRekapitulasiPajak").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeRekapitulasiPajak")[0].reset();
            // Mengembalikan pesan peringatan untuk preview file
            $("#previewFileRekapPajak").html(
                '<p class="text-danger"><i><b>* Format Berkas Harus PDF</b></i></p>'
            );
            $("#previewfileLaporInputPph").html(
                '<p class="text-danger"><i><b>* Format Berkas Harus PDF</b></i></p>'
            );
            $("#previewfileLaporInputPpn").html(
                '<p class="text-danger"><i><b>* Format Berkas Harus PDF</b></i></p>'
            );
        });
    }

    resetFieldTutupModalTambahRekapitulasi();

    $(document).on("submit", "#storeRekapitulasiPajak", function (e) {
        e.preventDefault(); // Mencegah reload halaman
        let formData = new FormData(this); // Ambil data form
        formData.append("_token", $('meta[name="csrf-token"]').attr("content")); // Tambahkan CSRF Token

        $.ajax({
            url: `/pajak/storeRekapitulasiPajak`, // Endpoint untuk update termin
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

                $("#mdTambahRekapitulasiPajak").modal("hide"); // Tutup modal
                tableRekapitulasiPajak.ajax.reload(null, false); // Reload tabel
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
});
