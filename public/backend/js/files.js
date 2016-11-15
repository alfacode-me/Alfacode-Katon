var deleted = function(id) {
    $('#delete-' + id).button('loading');
    $.post("/backend/files/delete/" + id, function(data) {
        if (data.status == 1) {
            swal({
                type: 'success',
                title: 'Selamat data terhapus !',
                text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                confirmButtonText: 'Lanjutkan !',
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(function() {
                window.location = "/backend/files/list"
            })
        } else {
            swal({
                type: 'error',
                title: 'Gagal menghapus data !',
                text: 'Klik "Cobalagi !" untuk mencoba lagi, pastikan file sesuai.',
                confirmButtonText: 'Cobalagi !',
                allowEscapeKey: false,
                allowOutsideClick: false
            });
            $('#delete-' + id).button('reset')
        }
    });
};

$(document).ready(function() {
    $('#save').click(function() {
        $('#save').button('loading');
        var formData = new FormData();
        if ($('#file').get(0).files[0]) file = $('#file').get(0).files[0];
        else file = false
        formData.append('file', file, file.name);
        formData.append('name', $('#name').val());
        formData.append('desc', $('#desc').val());
        $.ajax({
            url: '/backend/files/save',
            type: 'POST',
            data: formData,
            async: true,
            success: function(data) {
                if (data.status == 1) {
                    swal({
                        type: 'success',
                        title: 'Selamat data tersimpan !',
                        text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                        confirmButtonText: 'Lanjutkan !',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    }).then(function() {
                        window.location = "/backend/files/list"
                    })
                } else {
                    swal({
                        type: 'error',
                        title: 'Gagal menyimpan data !',
                        text: 'Klik "Cobalagi !" untuk mencoba lagi, pastikan file sesuai.',
                        confirmButtonText: 'Cobalagi !',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    $('#save').button('reset')
                }
            },
            cache: false,
            contentType: false,
            processData: false
        })
        return false
    })

    $('#update').click(function() {
        $('#update').button('loading');
        var formData = new FormData();
        formData.append('name', $('#name').val());
        formData.append('desc', $('#desc').val());
        $.ajax({
            url: '/backend/files/update/' + $('#id').val(),
            type: 'POST',
            data: formData,
            async: true,
            success: function(data) {
                if (data.status == 1) {
                    swal({
                        type: 'success',
                        title: 'Selamat data tersimpan !',
                        text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                        confirmButtonText: 'Lanjutkan !',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    }).then(function() {
                        window.location = "/backend/files/list"
                    })
                } else {
                    swal({
                        type: 'error',
                        title: 'Gagal menyimpan data !',
                        text: 'Klik "Cobalagi !" untuk mencoba lagi, pastikan file sesuai.',
                        confirmButtonText: 'Cobalagi !',
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                    $('#update').button('reset')
                }
            },
            cache: false,
            contentType: false,
            processData: false
        })
        return false
    })
})