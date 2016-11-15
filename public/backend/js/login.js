$(document).ready(function() {
    $('#masuk').click(function() {
        $('#masuk').button('loading')
        log = {
            username: $('#username').val(),
            password: $('#password').val()
        }
        if ($("#remember").prop("checked")) log.remember = 1
        else log.remember = 0

        $.post("/auth/check", log, function(data) {
            if (data.status == 1) {
                swal({
                    type: 'success',
                    title: 'Selamat akun sesuai !',
                    text: 'Klik "Lanjutkan !" untuk menuju halaman backend Compact.',
                    confirmButtonText: 'Lanjutkan !',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/dashboard"
                })
            } else {
                swal({
                    type: 'error',
                    title: 'Akun tidak sesuai !',
                    text: 'Klik "Coba lagi !" untuk mencoba kembali.',
                    confirmButtonColor: '#d33',
                    confirmButtonText: 'Coba lagi !',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    $('#masuk').button('reset')
                })
            }
        })
    })
})