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

                    setTimeout(() => {
                        window.location.href = response.redirect;
                    }, 1500);
                    
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
                // Tampilkan pesan error dari server
                var Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });
                
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
            }
        });
    });
})