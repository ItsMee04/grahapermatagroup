$(document).ready(function () {
    bsCustomFileInput.init();
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
                        <button type="button" class="btn btn-outline-danger btn-sm btnBangunUnit" data-id="${row.produksi.id}" data-toggle="tooltip" data-placement="top" title="BANGUN UNIT"><i class="fa fa-recycle"></i></button>
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

    //kirim data ke server
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


    //ketika button delete di tekan
    $(document).on("click", ".btnBangunUnit", function () {
        let id = $(this).data("id");

        Swal.fire({
            title: "Apakah Bangunan Sudah Siap Di Bowplang?",
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Ya, Sudah!",
            cancelButtonText: "Batal",
            customClass: {
                popup: 'animated bounceIn', // Animasi masuk
                confirmButton: 'btn btn-warning',
                cancelButton: 'btn btn-secondary'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/produksi/pembangunan/updatePembangunanBowplang/${id}`, // Ganti dengan endpoint yang sesuai
                    type: "GET",
                    headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content") // Ambil token CSRF dari meta tag
                    },
                    success: function (response) {
                        Swal.fire({
                            title: "Berhasil Di Bowplang!",
                            text: "Data berhasil diupdate.",
                            icon: "success",
                            customClass: {
                                popup: 'animated fadeOut' // Animasi keluar
                            }
                        });
                        tablePembangunan.ajax.reload(); // Reload DataTable setelah penghapusan
                        tableProduksi.ajax.reload();
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

    let tableProduksi; // Deklarasi variabel global    
    loadProduksi()
    function loadProduksi() {

        if ($.fn.DataTable.isDataTable("#tableProduksi")) {
            tableProduksi.destroy(); // Hapus instance DataTable sebelumnya
        }

        tableProduksi = $("#tableProduksi").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: "/produksi/getProduksi", // Menampilkan semua data secara default
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
                    data: "marketing.blok.blok",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "marketing.tipe.tipe",
                    className: "text-center",
                    render: function (data, type, row) {
                        return `<b>${data}</b>`; // Menjadikan teks lokasi tebal
                    },
                },
                {
                    data: "hargaborongan",
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
                    data: "nilaiborongan",
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
                    data: "tambahan",
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
                    data: "potongan",
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
                    data: "sisa",
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
                    data: "subkontraktor",
                    className: "text-center",
                    render: function (data, type, row) {
                        return data && data.subkontraktor ? `<b>${data.subkontraktor}</b>` : "";
                    }
                },
                {
                    data: null, // Kolom aksi
                    orderable: false, // Aksi tidak perlu diurutkan
                    className: "text-center",
                    render: function (data, type, row, meta) {
                        return `
                        <button type="button" class="btn btn-outline-warning btn-sm btneditproduksi" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="EDIT DATA"><i class="fa fa-edit"></i></button>
                        <button type="button" class="btn btn-outline-primary btn-sm btnupdateprogres" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="UPDATE PROGRES DATA"><i class="fa fa-home"></i></button>
                        <button type="button" class="btn btn-outline-success btn-sm btndetail" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="DETAIL DATA"><i class="fa fa-eye"></i></button>
                        <button type="button" class="btn btn-outline-danger btn-sm btnDelete" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="HAPUS DATA"><i class="fa fa-trash"></i></button>
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
                $("#tableProduksi_wrapper .col-md-6:eq(0)").append(`
                    <div class="d-flex align-items-center">
                        <label class="mr-2">Pilih Lokasi</label>
                        <select id="lokasiDropdownProduksi" class="form-control select2bs4" style="width: 100%;">
                        </select>
                    </div>
                `);

                // Inisialisasi Select2 dengan tema Bootstrap 4
                $('.select2bs4').select2({
                    theme: 'bootstrap4'
                });

                // Tambahkan tombol refresh di dalam filter
                $("#tableProduksi_wrapper .dataTables_filter").append(`
                    <button id="btnRefreshProduksi" class="btn btn-primary btn-sm ml-2">
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
                                $("#lokasiDropdownProduksi").append(`<option value="${lokasi.id}">${lokasi.lokasi}</option>`);
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
        $(document).on("change", "#lokasiDropdownProduksi", function () {
            let selectedValue = $(this).val();
            let url = selectedValue ? `/produksi/getProduksiByLokasi/${selectedValue}` : "/produksi/getProduksi";
            tableProduksi.ajax.url(url).load();
        });

        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefreshProduksi", function () {
            if (tableProduksi) {
                tableProduksi.ajax.reload(null, false);
            }
            var Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: "success",
                title: "Data Produksi Berhasil Di Refresh",
            });
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

    //ketika button edit di tekan
    $(document).on("click", ".btneditproduksi", function () {
        const produksiID = $(this).data("id");
        handlePDFUpload("filespk", "previewFileSpk");
        $.ajax({
            url: `/produksi/showProduksi/${produksiID}`, // Endpoint untuk mendapatkan data konsumen
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Isi modal dengan data konsumen
                $("#editidproduksi").val(data.id);
                $("#showblok").val(data.marketing.blok.blok); // Pastikan lokasi terisi sebelum load konsumen
                $("#showtipe").val(data.marketing.tipe.tipe);
                $("#editketeranganproduksi").val(data.keterangan ?? "");
                $("#edithargaboronganproduksi").val(data.hargaborongan);
                $("#edittambahanproduksi").val(data.tambahan);
                $("#editpotonganproduksi").val(data.potongan);
                $("#editprogresproduksi").val(data.progresrumah);
                $("#editlistrikproduksi").val(data.listrik);
                $("#editairproduksi").val(data.air);
                $(".btnTermin1").attr("data-id", data.id); // Set ID produksi ke tombol Termin 1

                // Cek apakah berkas SPK ada di database
                if (data.spk) {
                    $(".viewBerkasSPK").parent().show(); // Tampilkan tombol VIEW BERKAS
                    $(".viewBerkasSPK").attr("data-file", data.spk); // Simpan path file dalam atribut
                } else {
                    $(".viewBerkasSPK").parent().hide(); // Sembunyikan tombol jika file tidak ada
                }

                // Muat opsi subkontraktor
                $.ajax({
                    url: "/subkontraktor/getSubkontraktor",
                    type: "GET",
                    success: function (jabatanResponse) {
                        let options =
                            '<option value="">-- PILIH SUB KONTRAKTOR --</option>';
                        jabatanResponse.Data.forEach((item) => {
                            const selected =
                                item.id === response.Data.subkon_id
                                    ? "selected"
                                    : "";
                            options += `<option value="${item.id}" ${selected}>${item.subkontraktor}</option>`;
                        });
                        $("#editsubkontraktorproduksi").html(options);
                    },
                });

                // Tampilkan modal edit
                $("#mdEditProduksi").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Produksi.",
                    "error"
                );
            },
        });
    });

    //ketika button edit di tekan
    $(document).on("click", ".btnTermin", function () {
        const produksiIDTermin = $("#editidproduksi").val();
        const terminType = $(this).data("termin"); // Menentukan Termin 1, 2, 3, 4, atau Retensi
        $.ajax({
            url: `/produksi/showProduksi/${produksiIDTermin}`, // Endpoint untuk mendapatkan data konsumen
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Set judul modal sesuai termin yang ditekan
                $("#modalTerminTitle").text(`EDIT TERMIN ${terminType}`);

                // Set data berdasarkan termin yang dipilih
                let terminValue = "";
                switch (terminType) {
                    case 1:
                        terminValue = data.nominaltermin1;
                        break;
                    case 2:
                        terminValue = data.nominaltermin2;
                        break;
                    case 3:
                        terminValue = data.nominaltermin3;
                        break;
                    case 4:
                        terminValue = data.nominaltermin4;
                        break;
                    case "RETENSI":
                        terminValue = data.nominalretensi;
                        break;
                }

                // Isi modal dengan data konsumen
                $("#editterminid").val(data.id);
                $("#terminType").val(terminType); // Simpan tipe termin dalam input hidden
                // Tampilkan modal edit
                $("#editnominaltermin").val(terminValue);

                $("#mdTermin").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Produksi.",
                    "error"
                );
            },
        });
    });

    $(document).on("hidden.bs.modal", "#mdTermin", function () {
        $("body").addClass("modal-open"); // Kembalikan efek scrolling modal utama
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEditTermin() {
        $("#mdTermin").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#formEditTermin")[0].reset();
        });
    }

    $(document).on("submit", "#formEditTermin", function (e) {
        e.preventDefault(); // Mencegah reload halaman

        const produksiID = $("#editterminid").val();
        let formData = new FormData(this); // Ambil data form
        formData.append("_token", $('meta[name="csrf-token"]').attr("content")); // Tambahkan CSRF Token

        $.ajax({
            url: `/produksi/updateTermin/${produksiID}`, // Endpoint untuk update termin
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

                $("#mdTermin").modal("hide"); // Tutup modal
                resetFieldTutupModalEditTermin();
                tableProduksi.ajax.reload(null, false); // Reload tabel
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

    $(document).on("submit", "#FormEditProduksi", function (e) {
        e.preventDefault(); // Mencegah reload halaman

        const produksiEditID = $("#editidproduksi").val();
        let formData = new FormData(this); // Ambil data form
        formData.append("_token", $('meta[name="csrf-token"]').attr("content")); // Tambahkan CSRF Token

        $.ajax({
            url: `/produksi/updateProduksi/${produksiEditID}`, // Endpoint untuk update termin
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

                $("#mdEditProduksi").modal("hide"); // Tutup modal
                resetFieldTutupModalEditTermin();
                tableProduksi.ajax.reload(null, false); // Reload tabel
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

    $(document).on("click", ".viewBerkasSPK", function () {
        const filePath = $(this).attr("data-file");

        if (!filePath) {
            alert("Berkas tidak ditemukan.");
            return;
        }

        let url = window.location.origin + "/storage/BerkasSPK/" + filePath;
        console.log("Opening PDF:", url); // Debugging URL

        // Deteksi jika dibuka di mobile
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Buat elemen <a> tersembunyi untuk download
            let downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = filePath.split("/").pop(); // Ambil nama file dari URL
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink); // Hapus elemen setelah klik
        } else {
            // Desktop: Tampilkan dalam iframe
            $("#pdfIframe").attr("src", url);
            $("#previewModal").modal("show");
        }
    });

    $(document).on("hidden.bs.modal", "#previewModal", function () {
        $("body").addClass("modal-open"); // Kembalikan efek scrolling modal utama
    });

    function uploadImageProgres(inputId, previewId) {
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

    //ketika button edit di tekan
    $(document).on("click", ".btnupdateprogres", function () {
        const produksiID = $(this).data("id");
        $.ajax({
            url: `/produksi/showProgresBangunan/${produksiID}`, // Endpoint untuk mendapatkan data konsumen
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Isi modal dengan data konsumen
                $("#editidprogres").val(data.id);
                $("#editkonsumenprogres").val(data.marketing.konsumen);
                $("#editkonsumenidprogres").val(data.marketing.id);

                uploadImageProgres("editimgprogres", "editpreviewImgProgres");
                // Tampilkan modal edit
                $("#mdEditUpdateProgres").modal("show");
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

    resetFieldTutupModalUpdateProgres();

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalUpdateProgres() {
        $("#mdEditUpdateProgres").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#FormUpdateProgresBangunan")[0].reset();
            editpreviewImgProgres.innerHTML = "";
            editimgprogres.value = ""; // Reset input file
        });
    }

    $(document).on("submit", "#FormUpdateProgresBangunan", function (e) {
        e.preventDefault(); // Mencegah reload halaman
        let formData = new FormData(this); // Ambil data form
        formData.append("_token", $('meta[name="csrf-token"]').attr("content")); // Tambahkan CSRF Token

        $.ajax({
            url: `/produksi/storeProgresBangunan`, // Endpoint untuk update termin
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

                $("#mdEditUpdateProgres").modal("hide"); // Tutup modal
                resetFieldTutupModalUpdateProgres();
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
    $(document).on("click", ".btndetail", function () {
        const produksiID = $(this).data("id");
    
        // Simpan ID produksi ke sessionStorage sebelum berpindah halaman
        sessionStorage.setItem("produksiID", produksiID);
    
        // Redirect ke halaman detail
        window.location.href = `/produksi/DetailProgresBangunan/${produksiID}`;
    });

    // Fungsi untuk mendapatkan ID dari URL
    
    function getProduksiIDFromURL() {
        let pathArray = window.location.pathname.split("/");
        return pathArray[pathArray.length - 1]; // Ambil bagian terakhir dari URL sebagai ID
    }

    //funsi untuk memuat data role
    function loadProgresBangunan() {
        let produksiID = getProduksiIDFromURL(); // Ambil ID dari URL
        tableProgres = $("#tableProgresBangunan").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: `/produksi/getProgresBangunan/${produksiID}`, // Ganti dengan URL endpoint server Anda
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
                        return `
                            <button type="button" class="btn btn-outline-primary btn-sm btnpreviewProgresBanguan" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="Lihat Gambar">
                                <b>${data}</b>
                            </button>
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
                $("#tableProgresBangunan_wrapper .dataTables_filter").append(`
                <button id="btnRefreshProgresBangunan" class="btn btn-primary btn-sm ml-2">
                    <i class="fa fa-sync"></i> Refresh
                </button>
            `);
            },
        });
    }

    //ketika menekan tombol refresh
    $(document).on("click", "#btnRefreshProgresBangunan", function () {
        if (tableProgres) {
            tableProgres.ajax.reload(null, false); // Reload data dari server
        }
        var Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: "success",
            title: "Data Progres Bangunan Berhasil Di Refresh",
        });
    });

    $(document).on("click", ".btnpreviewProgresBanguan", function () {
        let progresID = $(this).data("id");

        $.ajax({
            url: `/produksi/getProgresBangunan/${progresID}`, // Endpoint untuk mendapatkan data gambar
            type: "GET",
            success: function (response) {
                console.log(response); // Debugging: Pastikan respons benar

                // Periksa apakah `Data` ada dan tidak kosong
                if (response.Data && response.Data.length > 0 && response.Data[0].image_progres) {
                    let imageUrl = `/storage/ImageProgresBangunan/${response.Data[0].image_progres}`;

                    Swal.fire({
                        title: "Preview Gambar",
                        imageUrl: imageUrl,
                        imageAlt: "Gambar Progres Bangunan",
                        showCloseButton: true
                    });
                } else {
                    Swal.fire({
                        icon: "warning",
                        title: "Gambar tidak tersedia",
                        text: "Tidak ada gambar yang diupload untuk progres ini."
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: "error",
                    title: "Terjadi Kesalahan",
                    text: "Gagal mengambil data gambar."
                });
            }
        });
    });

    // Fungsi untuk memuat data detail produksi
    function loadDetailProduksi() {
        let produksiIDD = getProduksiIDFromURL(); // Ambil ID dari URL
        $.ajax({
            url: `/produksi/showProduksi/${produksiIDD}`, // Gantilah {id} dengan ID yang sesuai
            type: "GET",
            success: function (response) {
                if (response.success && response.Data) {
                    let data = response.Data;
                    let marketing = data.marketing;

                    // Mengisi input dengan nilai dari response
                    $("#detailProduksiBlok").val(marketing.blok ? marketing.blok.blok : "Tidak tersedia");
                    $("#detailProduksiTipe").val(marketing.tipe ? marketing.tipe.tipe : "Tidak tersedia");
                    $("#detailProduksiKeterangan").val(data.keterangan || "Tidak tersedia");
                    $("#detailProduksiHargaBorongan").val(formatRupiah(data.hargaborongan));
                    $("#detailProduksiTambahan").val(formatRupiah(data.tambahan));
                    $("#detailProduksiPotongan").val(formatRupiah(data.potongan));
                    $("#detailProduksiProgres").val(data.progresrumah + "%");
                    $("#detailProduksiTanggalTermin1").val(data.tanggaltermin1 || "Tidak tersedia");
                    $("#detailProduksiNominalTermin1").val(formatRupiah(data.nominaltermin1));
                    $("#detailProduksiTanggalTermin2").val(data.tanggaltermin2 || "Tidak tersedia");
                    $("#detailProduksiNominalTermin2").val(formatRupiah(data.nominaltermin2));
                    $("#detailProduksiTanggalTermin3").val(data.tanggaltermin3 || "Tidak tersedia");
                    $("#detailProduksiNominalTermin3").val(formatRupiah(data.nominaltermin3));
                    $("#detailProduksiTanggalTermin4").val(data.tanggaltermin4 || "Tidak tersedia");
                    $("#detailProduksiNominalTermin4").val(formatRupiah(data.nominaltermin4));
                    $("#detailProduksiTanggalRetensi").val(data.tanggalretensi || "Tidak tersedia");
                    $("#detailProduksiNominalRetensi").val(formatRupiah(data.nominalretensi));
                    $("#detailProduksiListrik").val(formatRupiah(data.listrik));
                    $("#detailProduksiAir").val(formatRupiah(data.air));
                    $("#detailProduksiSubkontraktor").val(data.subkon_id || "Tidak tersedia");
                    $("#detailProduksiSisa").val(formatRupiah(data.sisa));
                    $("#detailProduksiTanggalSPK").val(data.tanggalspk || "Tidak tersedia");

                    // Cek apakah berkas SPK ada di database
                    if (data.spk) {
                        $(".DetailviewBerkasSPK").parent().show(); // Tampilkan tombol VIEW BERKAS
                        $(".DetailviewBerkasSPK").attr("data-file", data.spk); // Simpan path file dalam atribut
                    } else {
                        $(".DetailviewBerkasSPK").parent().hide(); // Sembunyikan tombol jika file tidak ada
                    }

                } else {
                    Toast.fire({
                        icon: "error",
                        title: "Data tidak ditemukan atau terjadi kesalahan!",
                    });
                }
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal mengambil data produksi!",
                });
            },
        });
    }

    // Fungsi untuk memformat angka menjadi Rupiah
    function formatRupiah(angka) {
        if (angka === null || angka === undefined) return "Tidak tersedia";
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }).format(angka);
    }

    $(document).on("click", ".DetailviewBerkasSPK", function () {
        const filePath = $(this).attr("data-file");

        if (!filePath) {
            alert("Berkas tidak ditemukan.");
            return;
        }

        let url = window.location.origin + "/storage/BerkasSPK/" + filePath;
        console.log("Opening PDF:", url); // Debugging URL

        // Deteksi jika dibuka di mobile
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            // Buat elemen <a> tersembunyi untuk download
            let downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = filePath.split("/").pop(); // Ambil nama file dari URL
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink); // Hapus elemen setelah klik
        } else {
            // Desktop: Tampilkan dalam iframe
            $("#pdfIframe").attr("src", url);
            $("#previewModal").modal("show");
        }
    });

    // Ambil ID produksi dari sessionStorage
    const produksiID = sessionStorage.getItem("produksiID");

    if (produksiID) {
        // Panggil fungsi dengan ID produksi yang ditemukan
        loadDetailProduksi(produksiID);
        loadProgresBangunan(produksiID);

        // Hapus sessionStorage agar tidak dieksekusi terus-menerus
        sessionStorage.removeItem("produksiID");
    }

    //ketika button delete di tekan
    $(document).on("click", ".btnDelete", function () {
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
                    url: `/produksi/deleteProduksi/${id}`, // Ganti dengan endpoint yang sesuai
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
                        tableProduksi.ajax.reload(null, false); // Reload DataTable setelah penghapusan
                        tablePembangunan.ajax.reload(null, false);
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