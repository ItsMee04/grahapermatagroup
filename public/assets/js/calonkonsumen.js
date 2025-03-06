$(document).ready(function () {
    resetFieldTutupModalTambah();
    resetFieldTutupModalBerkas();
    resetFieldTutupModalBerkasKomunikasi();
    resetFieldTutupModalEditCalonKonsumen();

    bsCustomFileInput.init();

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover' // Tooltip hanya muncul saat hover, tidak saat klik
        });
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
                {
                    data: "tanggalkomunikasi",
                    className: "text-center",
                    render: (data, type, row) => `<button class="btn btn-outline-primary btn-xs btnTglKomunikasi" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="DETAIL BERKAS"><b>${data}</b></button>`
                },
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
                        if (!row.image_sp3bank) missingImages.push("SP3 BANK");

                        // Jika semua gambar ada, tampilkan "Sudah Lengkap"
                        if (missingImages.length === 0) {
                            return `<button class="btn btn-outline-success btn-xs btnBerkasCalonKonsumen" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="DETAIL BERKAS"><b>SUDAH LENGKAP</b></button>`;
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

    $(document).on("click", ".btndetail", function () {
        const marketingID = $(this).data("id");

        $.ajax({
            url: `/marketing/calonkonsumen/showBerkasCalonKonsmen/${marketingID}`,
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Cek dan tampilkan gambar jika ada
                updatePreviewImage("imgKTP", "previewImgKTP", "imageKTP", data.image_ktp);
                updatePreviewImage("imgKK", "previewImgKK", "imageKK", data.image_kk);
                updatePreviewImage("imgNPWP", "previewImgNPWP", "imageNPWP", data.image_npwp);
                updatePreviewImage("imgSlipGaji", "previewImgSlipGaji", "imageSlipGaji", data.image_slipgaji);
                updatePreviewImage("imgTambahan", "previewImgTambahan", "imageTambahan", data.image_tambahan);
                updatePreviewImage("imgBuktiBooking", "previewImgBuktiBooking", "imageBuktiBooking", data.image_buktibooking);
                updatePreviewImage("imgSP3BANK", "previewImgSP3BANK", "imageSP3BANK", data.image_sp3bank);

                // Set ID & Konsumen ke Form
                $("#showid").val(data.id);
                $("#showkonsumen").val(data.konsumen);

                // Tampilkan Modal Edit
                $("#mdBerkasCalonKonsumen").modal("show");
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data berkas.",
                });
            },
        });
    });

    // Fungsi untuk update preview gambar berdasarkan respons
    function updatePreviewImage(inputId, previewId, folderName, imageName) {
        const inputFile = document.getElementById(inputId);
        const previewContainer = document.getElementById(previewId);
        const imagePath = `/assets/dist/img/notfound.png`;

        if (!inputFile || !previewContainer) {
            console.error("Elemen tidak ditemukan!");
            return;
        }

        if (imageName) {
            // Jika gambar tersedia dari database, tampilkan dari storage sesuai folder
            const imageSrc = `/storage/${folderName}/${imageName}`;

            previewContainer.innerHTML = `
            <a href="${imageSrc}" target="_blank">
                <img src="${imageSrc}" alt="Preview Gambar" style="width: 100%; height: 100%; object-fit: contain;">
            </a>
        `;
        } else {
            // Jika tidak ada gambar, kosongkan preview
            previewContainer.innerHTML = `
            <img src="${imagePath}" alt="Gambar Tidak Ditemukan" style="width: 100%; height: 100%; object-fit: contain;">
        `;
        }

        // Event listener untuk input file agar bisa preview gambar baru saat upload
        inputFile.onchange = () => {
            const file = inputFile.files[0];
            if (!file) return;

            // Validasi agar hanya file gambar yang diproses
            if (!file.type.startsWith("image/")) {
                alert("Hanya file gambar yang diperbolehkan!");
                inputFile.value = ""; // Reset input jika bukan gambar
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const newImageSrc = reader.result;

                previewContainer.innerHTML = `
                <a href="${newImageSrc}" target="_blank">
                    <img src="${newImageSrc}" alt="Preview Gambar" style="width: 100%; height: 100%; object-fit: contain;">
                </a>
            `;
            };

            reader.readAsDataURL(file);
        };
    }

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalBerkas() {
        $("#mdBerkasCalonKonsumen").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeBerkasCalonKonsumen")[0].reset();

            // Reset semua input file
            const inputFiles = [
                "imgKTP", "imgKK", "imgNPWP", "imgSlipGaji",
                "imgTambahan", "imgBuktiBooking", "imgSP3BANK"
            ];

            inputFiles.forEach(id => {
                let inputElement = document.getElementById(id);
                if (inputElement) {
                    inputElement.value = ""; // Reset input file
                }
            });

            // Kosongkan semua preview gambar
            const previewContainers = document.querySelectorAll("[id^=previewImg]");
            previewContainers.forEach(container => {
                container.innerHTML = "";
            });

        });
    }

    //kirim data ke server <i class=""></i>
    $("#storeBerkasCalonKonsumen").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Buat objek FormData
        const formData = new FormData(this);
        // Ambil ID dari form
        const idKonsumen = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/marketing/calonkonsumen/updateBerkasCalonKonsumen/${idKonsumen}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdBerkasCalonKonsumen").modal("hide"); // Tutup modal
                $("#storeBerkasCalonKonsumen")[0].reset(); // Reset form
                // **Pastikan tableCalon sudah didefinisikan sebelum reload**
                if ($.fn.DataTable.isDataTable("#tableCalonKonsumen")) {
                    tableCalon.ajax.reload(null, false);
                } else {
                    loadCalonKonsumen(); // Jika belum ada, inisialisasi ulang
                }
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
    $(document).on("click", ".btnTglKomunikasi", function () {
        const marketingTanggalID = $(this).data("id");
        $.ajax({
            url: `/marketing/calonkonsumen/showBerkasCalonKonsmen/${marketingTanggalID}`, // Endpoint untuk mendapatkan data pegawai
            type: "GET",
            success: function (response) {
                uploadImage("imgKomunikasiSurvei", "showKomunikasiImageSurvey");
                // Isi modal dengan data pegawai
                $("#showkomunikasiid").val(response.Data.id);
                $("#showkomunikasikonsumen").val(response.Data.konsumen);
                $("#showTanggalKomunikasiKonsumen").val(response.Data.tanggalkomunikasi);

                // Path gambar survei
                var imagePath = `/storage/ImageSurvei/${response.Data.image_survey}`;

                // Cek apakah gambar tersedia, jika tidak pakai default
                var imageSrc = response.Data.image_survey ? imagePath : `/assets/dist/img/notfound.png`;

                // Update href dan isi dengan gambar
                $("#showKomunikasiImageSurvey").attr("href", imageSrc);
                $("#showKomunikasiImageSurvey").html(`<img src="${imageSrc}" style="width: 100%; height: 100%;">`);

                // Tampilkan modal edit
                $("#mdBerkasKomunikasiKonsumen").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Calon Konsumen.",
                    "error"
                );
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalBerkasKomunikasi() {
        $("#mdBerkasKomunikasiKonsumen").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeBerkasKomunikasiCalonKonsumen")[0].reset();
            showKomunikasiImageSurvey.innerHTML = "";
            imgKomunikasiSurvei.value = ""; // Reset input file
        });
    }

    //kirim data ke server <i class=""></i>
    $("#storeBerkasKomunikasiCalonKonsumen").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Buat objek FormData
        const formData = new FormData(this);
        // Ambil ID dari form
        const idKonsumen = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/marketing/calonkonsumen/updateBerkasKomunikasiCalonKonsumen/${idKonsumen}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdBerkasKomunikasiKonsumen").modal("hide"); // Tutup modal
                $("#storeBerkasKomunikasiCalonKonsumen")[0].reset(); // Reset form
                // **Pastikan tableCalon sudah didefinisikan sebelum reload**
                if ($.fn.DataTable.isDataTable("#tableCalonKonsumen")) {
                    tableCalon.ajax.reload(null, false);
                } else {
                    loadCalonKonsumen(); // Jika belum ada, inisialisasi ulang
                }
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
    $(document).on("click", ".btnBerkasCalonKonsumen", function () {
        const marketingBerkasID = $(this).data("id");
        $.ajax({
            url: `/marketing/calonkonsumen/showBerkasCalonKonsmen/${marketingBerkasID}`, // Endpoint untuk mendapatkan data pegawai
            type: "GET",
            success: function (response) {
                const data = response.Data;
                // Cek dan tampilkan gambar jika ada
                updatePreviewImage("imgKTP", "previewImgKTP", "ImageKTP", data.image_ktp);
                updatePreviewImage("imgKK", "previewImgKK", "ImageKK", data.image_kk);
                updatePreviewImage("imgNPWP", "previewImgNPWP", "ImageNPWP", data.image_npwp);
                updatePreviewImage("imgSlipGaji", "previewImgSlipGaji", "ImageSlipGaji", data.image_slipgaji);
                updatePreviewImage("imgTambahan", "previewImgTambahan", "ImageTambahan", data.image_tambahan);
                updatePreviewImage("imgBuktiBooking", "previewImgBuktiBooking", "ImageBuktiBooking", data.image_buktibooking);
                updatePreviewImage("imgSP3BANK", "previewImgSP3BANK", "ImageSP3BANK", data.image_sp3bank);
                // Isi modal dengan data pegawai
                $("#showid").val(response.Data.id);
                $("#showkonsumen").val(response.Data.konsumen);

                // Update href dan isi dengan gambar
                // $("#showKomunikasiImageSurvey").attr("href", imageSrc);
                // $("#showKomunikasiImageSurvey").html(`<img src="${imageSrc}" style="width: 100%; height: 100%;">`);

                // Tampilkan modal edit
                $("#mdBerkasCalonKonsumen").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Berkas Calon Konsumen.",
                    "error"
                );
            },
        });
    });

    //ketika button edit di tekan
    $(document).on("click", ".btnedit", function () {
        const marketingBerkasID = $(this).data("id");
        $.ajax({
            url: `/marketing/calonkonsumen/showBerkasCalonKonsmen/${marketingBerkasID}`, // Endpoint untuk mendapatkan data pegawai
            type: "GET",
            success: function (response) {
                const data = response.Data;
                // Isi modal dengan data pegawai
                $("#editid").val(response.Data.id);
                $("#editkonsumen").val(response.Data.konsumen);
                $("#editkontak").val(response.Data.kontak);
                $("#editalamat").val(response.Data.alamat);
                $("#editprogres").val(response.Data.progres);
                $("#edittanggalkomunikasi").val(response.Data.tanggalkomunikasi);
                $("#editsumber").val(response.Data.sumber);

                // Muat opsi metodepembayaran
                $.ajax({
                    url: "/metodepembayaran/getMetodePembayaran",
                    type: "GET",
                    success: function (metodeResponse) {
                        let options =
                            '<option value="">-- PILIH METODE PEMBAYARAN --</option>';
                        metodeResponse.Data.forEach((item) => {
                            const selected =
                                item.id === response.Data.metodepembayaran_id
                                    ? "selected"
                                    : "";
                            options += `<option value="${item.id}" ${selected}>${item.pembayaran}</option>`;
                        });
                        $("#editmetodepembayaran").html(options);
                    },
                });

                // Muat opsi lokasi
                $.ajax({
                    url: "/lokasi/getLokasi",
                    type: "GET",
                    success: function (lokasiResponse) {
                        let options =
                            '<option value="">-- PILIH LOKASI --</option>';
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

                // Muat opsi tipe
                $.ajax({
                    url: "/tipe/getTipe",
                    type: "GET",
                    success: function (tipeResponse) {
                        let options =
                            '<option value="">-- PILIH TIPE --</option>';
                        tipeResponse.Data.forEach((item) => {
                            const selected =
                                item.id === response.Data.tipe_id
                                    ? "selected"
                                    : "";
                            options += `<option value="${item.id}" ${selected}>${item.tipe}</option>`;
                        });
                        $("#edittipe").html(options);
                    },
                });

                // Muat opsi blok
                $.ajax({
                    url: "/blok/getBlok",
                    type: "GET",
                    success: function (blokResponse) {
                        let options =
                            '<option value="">-- PILIH BLOK --</option>';
                        blokResponse.Data.forEach((item) => {
                            const selected =
                                item.id === response.Data.blok_id
                                    ? "selected"
                                    : "";
                            options += `<option value="${item.id}" ${selected}>${item.blok}</option>`;
                        });
                        $("#editblok").html(options);
                    },
                });

                $("#editlokasi").on("change", function () {
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
                                $("#edittipe").html(options); // Masukkan data ke select
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

                $("#edittipe").on("change", function () {
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
                                $("#editblok").html(options); // Masukkan data ke select
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

                // Tampilkan modal edit
                $("#mdEditCalonKonsumen").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Berkas Calon Konsumen.",
                    "error"
                );
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEditCalonKonsumen() {
        $("#mdEditCalonKonsumen").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeEditCalonKonsumen")[0].reset();
            // Hapus isi dropdown tipe dan blok tanpa menyisakan teks apa pun
            $("#editmetodepembayaran").html("").trigger("change");
            $("#editlokasi").html("").trigger("change");
            $("#edittipe").html("").trigger("change");
            $("#editblok").html("").trigger("change");
        });
    }

    //kirim data ke server
    $("#storeEditCalonKonsumen").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Buat objek FormData
        const formData = new FormData(this);
        // Ambil ID dari form
        const idMarketing = formData.get("id"); // Mengambil nilai input dengan name="id"

        $.ajax({
            url: `/marketing/calonkonsumen/updateCalonKonsumen/${idMarketing}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdEditCalonKonsumen").modal("hide"); // Tutup modal
                // **Pastikan tableCalon sudah didefinisikan sebelum reload**
                if ($.fn.DataTable.isDataTable("#tableCalonKonsumen")) {
                    tableCalon.ajax.reload(null, false);
                } else {
                    loadCalonKonsumen(); // Jika belum ada, inisialisasi ulang
                }
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

    //ketika btn delete di tekan
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
                    url: `/marketing/calonkonsumen/deleteCalonKonsumen/${id}`, // Ganti dengan endpoint yang sesuai
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
                        if (tableCalon) {
                            tableCalon.ajax.reload(null, false);
                        }
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