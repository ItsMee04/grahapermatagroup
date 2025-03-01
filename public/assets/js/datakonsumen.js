$(document).ready(function () {
    resetFieldTutupModalTambah();
    resetFieldTutupModalEditKonsumen();
    bsCustomFileInput.init();

    // Inisialisasi tooltip Bootstrap
    function initializeTooltip() {
        $('[data-toggle="tooltip"]').tooltip({
            trigger: 'hover' // Tooltip hanya muncul saat hover, tidak saat klik
        });
    }

    let tableDataKonsumen; // Deklarasi variabel global

    function loadDataKonsumen() {

        if ($.fn.DataTable.isDataTable("#tableDataKonsumen")) {
            tableDataKonsumen.destroy(); // Hapus instance DataTable sebelumnya
        }

        tableDataKonsumen = $("#tableDataKonsumen").DataTable({
            paging: true,
            lengthChange: false,
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            responsive: true,
            ajax: {
                url: "/marketing/datakonsumen/getDataKonsumen", // Menampilkan semua data secara default
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
                        let konsumen = data.marketing.konsumen ? data.marketing.konsumen : "Tidak ada nama";
                        return `<b>${konsumen}</b>`;
                    }
                },
                { data: "ajbnotaris", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "ajbbank", className: "text-center", render: data => `<b>${data}</b>` },
                { data: "ttddirektur", className: "text-center", render: data => `<b>${data}</b>` },
                {
                    data: "image_bukti",
                    className: "text-center",
                    render: (data, type, row) => {
                        if (!data) {
                            return `<span class="text-muted"><b>BERKAS BELUM DI UPLOAD</b></span>`; // Jika tidak ada sertifikat
                        }

                        let fileUrl = `/storage/ImageBukti/${data}`; // Sesuaikan dengan path penyimpanan file

                        return `
                            <a href="${fileUrl}" target="_blank">
                                <button class="btn btn-outline-success btn-xs" data-id="${row.id}" data-toggle="tooltip" data-placement="top" title="Lihat Berkas">
                                    <b>READY</b>
                                </button>
                            </a>
                        `;
                    }
                },
                { data: "keterangan", className: "text-center", render: data => `<b>${data}</b>` },
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
                $("#tableDataKonsumen_wrapper .col-md-6:eq(0)").append(`
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
                $("#tableDataKonsumen_wrapper .dataTables_filter").append(`
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
            let url = selectedValue ? `/marketing/datakonsumen/getDataKonsumen/${selectedValue}` : "/marketing/datakonsumen/getDataKonsumen";
            tableDataKonsumen.ajax.url(url).load();
        });

        // Event listener untuk tombol refresh
        $(document).on("click", "#btnRefresh", function () {
            if (tableDataKonsumen) {
                tableDataKonsumen.ajax.reload(null, false);
            }
            var Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
            });

            Toast.fire({
                icon: "success",
                title: "Data Konsumen Berhasil Di Refresh",
            });
        });
    }

    loadDataKonsumen();

    // Fungsi untuk memuat data konsumen berdasarkan lokasi yang dipilih
    function loadNamaKonsumen() {
        let selectedValue = $("#lokasiDropdown").val(); // Ambil lokasi yang dipilih

        if (!selectedValue) {
            // Jika tidak ada lokasi yang dipilih, kosongkan dropdown konsumen
            $("#konsumen").html('<option value="">-- PILIH KONSUMEN --</option>');
            return;
        }

        let url = `/marketing/calonkonsumen/getCalonKonsumen/${selectedValue}`;

        $.ajax({
            url: url, // Endpoint berubah sesuai lokasi yang dipilih
            type: "GET",
            success: function (response) {
                let options = '<option value="">-- PILIH KONSUMEN --</option>';
                if (response.Data.length > 0) {
                    response.Data.forEach((item) => {
                        options += `<option value="${item.id}">${item.konsumen}</option>`;
                    });
                } else {
                    options = '<option value="">TIDAK ADA KONSUMEN DI LOKASI INI</option>';
                }
                $("#konsumen").html(options); // Masukkan data ke select
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Gagal memuat data Konsumen!",
                });
            },
        });

        //muat data lokasi
        $.ajax({
            url: `/lokasi/${selectedValue}`,
            type: "GET",
            success: function (response) {
                const data = response.Data;
                // Set ID & Blok ke Form
                $("#showlokasi").val(data.lokasi);
                $("#idlokasi").val(data.id);
            },
            error: function () {
                Toast.fire({
                    icon: "error",
                    title: "Tidak dapat mengambil data jabatan.",
                });
            },
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

    //ketika menekan tombol tambah role
    $(".btn-tambahDataKonsumen").on("click", function () {
        $("#mdTambahDataKonsumen").modal("show");
        loadNamaKonsumen()
        uploadImage("imgBukti", "previewImgBukti");
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalTambah() {
        $("#mdTambahDataKonsumen").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeDataKonsumen")[0].reset();
            previewImgBukti.innerHTML = "";
            imgBukti.value = ""; // Reset input file
        });
    }

    //kirim data ke server
    $("#storeDataKonsumen").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Ambil elemen input file

        // Buat objek FormData
        const formData = new FormData(this);
        $.ajax({
            url: "/marketing/datakonsumen/storeDataKonsumen", // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdTambahDataKonsumen").modal("hide"); // Tutup modal
                resetFieldTutupModalTambah();
                tableDataKonsumen.ajax.reload(null, false); // Reload data dari server
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

    // Fungsi untuk update preview gambar berdasarkan respons
    function updatePreviewImage(inputId, previewId, folderName, imageName) {
        const inputFile = document.getElementById(inputId);
        const previewContainer = document.getElementById(previewId);

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
            previewContainer.innerHTML = "";
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

    //ketika button edit di tekan
    $(document).on("click", ".btnedit", function () {
        const dataKonsumenID = $(this).data("id");
        $.ajax({
            url: `/marketing/datakonsumen/showDataKonsumen/${dataKonsumenID}`, // Endpoint untuk mendapatkan data konsumen
            type: "GET",
            success: function (response) {
                const data = response.Data;

                // Isi modal dengan data konsumen
                $("#editid").val(data.id);
                $("#editidlokasi").val(data.lokasi_id); // Pastikan lokasi terisi sebelum load konsumen
                $("#editajbnotaris").val(data.ajbnotaris);
                $("#editajbbank").val(data.ajbbank);
                $("#editttddirektur").val(data.ttddirektur);
                $("#editketerangan").val(data.keterangan);
                $("#editsertifikat").val(data.sertifikat);
                // Muat data id dari table
                let selectedValue = $("#lokasiDropdown").val(); // Ambil lokasi yang dipilih

                //load data konsumen
                $.ajax({
                    url: `/marketing/calonkonsumen/getCalonKonsumen/${selectedValue}`,
                    type: "GET",
                    success: function (jabatanResponse) {
                        let options =
                            '<option value="">-- PILIH KONSUMEN --</option>';
                        jabatanResponse.Data.forEach((item) => {
                            const selected =
                                item.id === response.Data.konsumen_id
                                    ? "selected"
                                    : "";
                            options += `<option value="${item.id}" ${selected}>${item.konsumen}</option>`;
                        });
                        $("#editkonsumen").html(options);
                    },
                });

                // Cek dan tampilkan gambar jika ada
                updatePreviewImage("editimgBukti", "editpreviewImgBukti", "ImageBukti", data.image_bukti);

                // Tampilkan modal edit
                $("#mdEditKonsumen").modal("show");
            },
            error: function () {
                Swal.fire(
                    "Gagal!",
                    "Tidak dapat mengambil data Konsumen.",
                    "error"
                );
            },
        });
    });

    // Ketika modal ditutup, reset semua field
    function resetFieldTutupModalEditKonsumen() {
        $("#mdEditKonsumen").on("hidden.bs.modal", function () {
            // Reset form input (termasuk gambar dan status)
            $("#storeEditKonsumen")[0].reset();
            editpreviewImgBukti.innerHTML = "";
            editimgBukti.value = ""; // Reset input file
        });
    }

    //kirim data ke server
    $("#storeEditKonsumen").on("submit", function (event) {
        event.preventDefault(); // Mencegah form submit secara default
        // Buat objek FormData
        const formData = new FormData(this);
        
        // Ambil ID dari form
        const idKonsumen = formData.get("id"); // Mengambil nilai input dengan name="id"
        $.ajax({
            url: `/marketing/datakonsumen/updateDataKonsumen/${idKonsumen}`, // Endpoint Laravel untuk menyimpan pegawai
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

                $("#mdEditKonsumen").modal("hide"); // Tutup modal
                resetFieldTutupModalEditKonsumen();
                tableDataKonsumen.ajax.reload(null, false); // Reload data dari server
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
                    url: `/marketing/datakonsumen/deleteDataKonsumen/${id}`, // Ganti dengan endpoint yang sesuai
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
                        if (tableDataKonsumen) {
                            tableDataKonsumen.ajax.reload(null, false);
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