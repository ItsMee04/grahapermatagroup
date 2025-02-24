$(document).ready(function () {
    $(document).ready(function () {
        $("#pushLogin").submit(function (e) {
            e.preventDefault();

            $.ajax({
                url: "/login/authLogin",
                type: "POST",
                data: $(this).serialize(),
                dataType: "json",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if (response.success) {
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

                        window.location.href = response.redirect;
                    } else {
                        var Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        
                        Toast.fire({
                            icon: "error",
                            title: response.message,
                        });
                    }
                },
                error: function (xhr) {
                    var Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                    });

                    Toast.fire({
                        icon: "error",
                        title: "Terjadi kesalahan, coba lagi nanti.",
                    });
                }
            });
        });
    });
})