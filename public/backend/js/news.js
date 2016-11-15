var deleted = function (id) {
    $('#delete-' + id).button('loading')
    $.post("/backend/news/delete/" + id, function (data) {
        if (data.status == 1) {
            swal({
                type: 'success',
                title: 'Selamat data terhapus !',
                text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                confirmButtonText: 'Lanjutkan !',
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(function () {
                window.location = "/backend/news/list"
            })
        } else {
            swal({
                type: 'error',
                title: 'Gagal menghapus data !',
                text: 'Klik "Cobalagi !" untuk mencoba lagi, pastikan file sesuai.',
                confirmButtonText: 'Cobalagi !',
                allowEscapeKey: false,
                allowOutsideClick: false
            })
            $('#delete-' + id).button('reset')
        }
    });
}
var editsave = function (id) {
    $('#editsave').button('loading');
    var dt = {
        title: $('#title').val(),
        content: $('#content').val()
    };
    $.post('/backend/news/edit/save/' + id, dt, function (data) {
        if (data.status == 1) {
            swal({
                type: 'success',
                title: 'Selamat data tersimpan !',
                text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                confirmButtonText: 'Lanjutkan !',
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(function () {
                window.location = "/backend/news/list"
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
    }, 'json')
}
var editpublish = function (id) {
    $('#editpublish').button('loading')
    var dt = {
        title: $('#title').val(),
        content: $('#content').val()
    }
    $.post('/backend/news/edit/publish/' + id, dt, function (data) {
        if (data.status == 1) {
            swal({
                type: 'success',
                title: 'Selamat data tersimpan !',
                text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                confirmButtonText: 'Lanjutkan !',
                allowEscapeKey: false,
                allowOutsideClick: false
            }).then(function () {
                window.location = "/backend/news/list"
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
            $('#publish').button('reset')
        }
    }, 'json')
};

$(function () {
    $('#content').froalaEditor({
        language: 'id',
        heightMin: 300,
        heightMax: 500,
        imageUploadURL: '/upload/images/save'
    }).on('froalaEditor.image.removed', function (e, editor, $img) {
        $.ajax({
            method: "POST",
            url: "/upload/images/delete",
            data: {
                src: $img.attr('src')
            }
        })
    })

    $('#save').click(function () {
        $('#save').button('loading')
        var dt = {
            title: $('#title').val(),
            content: $('#content').val()
        }
        $.post('/backend/pages/news/save', dt, function (data) {
            if (data.status == 1) {
                swal({
                    type: 'success',
                    title: 'Selamat data tersimpan !',
                    text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                    confirmButtonText: 'Lanjutkan !',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function () {
                    window.location = "/backend/news/list"
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
        }, 'json')
    })

    $('#publish').click(function () {
        $('#publish').button('loading')
        var dt = {
            title: $('#title').val(),
            content: $('#content').val()
        }
        $.post('/backend/pages/news/publish', dt, function (data) {
            if (data.status == 1) {
                swal({
                    type: 'success',
                    title: 'Selamat data tersimpan !',
                    text: 'Klik "Lanjutkan !" untuk memuat ulang halaman.',
                    confirmButtonText: 'Lanjutkan !',
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function () {
                    window.location = "/backend/news/list"
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
                $('#publish').button('reset')
            }
        }, 'json')
    })

});