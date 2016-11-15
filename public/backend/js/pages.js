$(function() {
    $("#content").froalaEditor({
        language: "id",
        heightMin: 300,
        heightMax: 500,
        imageUploadURL: "/upload/images/save",
        fontSizeSelection: true,
        fontSize: ["8", "10", "12", "14", "16", "18", "22", "26", "30", "38", "44", "52", "60", "72", "84", "96"],
        fontSizeDefaultSelection: "14",
        fontFamilySelection: true,
        fontFamily: {
            "Roboto,sans-serif": "Roboto",
            "Raleway, sans-serif": "Raleway",
            "Oswald,sans-serif": "Oswald",
            "Montserrat,sans-serif": "Montserrat",
            "Open Sans Condensed,sans-serif": "Open Sans Condensed"
        }
    }).on("froalaEditor.image.removed", function(e, editor, $img) {
        $.ajax({
            method: "POST",
            url: "/upload/images/delete",
            data: {
                src: $img.attr("src")
            }
        })
    });
    $("#btn-about").click(function() {
        $("#btn-about").button("loading");
        var dt = {};
        dt.name = $("#name").val();
        dt.content = $("#content").val();
        $.post("/backend/pages/about/save", dt, function(data) {
            if (data.status == 1) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/pages/about"
                })
            } else {
                swal({
                    type: "error",
                    title: "Gagal menyimpan data !",
                    text: "Klik \"Cobalagi !\" untuk mencoba lagi, pastikan file sesuai.",
                    confirmButtonText: "Cobalagi !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $("#btn-about").button("reset");
            }
        }, "json")
    });
    $("#btn-service").click(function() {
        $("#btn-service").button("loading");
        var dt = {};
        dt.content = $("#content").val();
        $.post("/backend/pages/service/save", dt, function(data) {
            if (data.status == 1) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/pages/service"
                })
            } else {
                swal({
                    type: "error",
                    title: "Gagal menyimpan data !",
                    text: "Klik \"Cobalagi !\" untuk mencoba lagi, pastikan file sesuai.",
                    confirmButtonText: "Cobalagi !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $("#btn-service").button("reset");
            }
        }, "json")
    });
    $("#btn-team").click(function() {
        $("#btn-team").button("loading");
        var dt = {};
        dt.content = $("#content").val();
        $.post("/backend/pages/team/save", dt, function(data) {
            if (data.status == 1) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/pages/team"
                })
            } else {
                swal({
                    type: "error",
                    title: "Gagal menyimpan data !",
                    text: "Klik \"Cobalagi !\" untuk mencoba lagi, pastikan file sesuai.",
                    confirmButtonText: "Cobalagi !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $("#btn-team").button("reset");
            }
        }, "json")
    });
    $("#btn-client").click(function() {
        $("#btn-client").button("loading");
        var dt = {};
        dt.content = $("#content").val();
        $.post("/backend/pages/client/save", dt, function(data) {
            if (data.status == 1) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/pages/client"
                })
            } else {
                swal({
                    type: "error",
                    title: "Gagal menyimpan data !",
                    text: "Klik \"Cobalagi !\" untuk mencoba lagi, pastikan file sesuai.",
                    confirmButtonText: "Cobalagi !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $("#btn-client").button("reset");
            }
        }, "json")
    });
    $("#contact-save").click(function() {
        $("#contact-save").button("loading");
        var dt = {};
        dt.website = $("#website").val();
        dt.email = $("#email").val();
        dt.address = $("#address").val();
        dt.telp = $("#telp").val();
        dt.handphone = $("#handphone").val();
        dt.linkin = $("#linkin").val();
        dt.facebook = $("#facebook").val();
        dt.instagram = $("#instagram").val();
        dt.twitter = $("#twitter").val();
        dt.googleplus = $("#googleplus").val();
        $.post("/backend/pages/contact/save", dt, function(data) {
            if (data.status == 1) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/pages/contact"
                })
            } else {
                swal({
                    type: "error",
                    title: "Gagal menyimpan data !",
                    text: "Klik \"Cobalagi !\" untuk mencoba lagi, pastikan file sesuai.",
                    confirmButtonText: "Cobalagi !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                });
                $("#contact-save").button("reset");
            }
        }, "json")
    });
});