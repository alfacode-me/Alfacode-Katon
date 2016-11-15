$(document).ready(function() {
    $("#img").on("change", function() {
        var countFiles = $(this)[0].files.length;
        var imgPath = $(this)[0].value;
        var extn = imgPath.substring(imgPath.lastIndexOf(".") + 1).toLowerCase();
        var image_holder = $("#image-holder");
        image_holder.empty();
        if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
            if (typeof(FileReader) == "undefined") {
                alert("Web browser yang anda gunakan tidak support !");
            } else {
                for (var i = 0; i < countFiles; i++) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        $("<img />", {
                            "src": e.target.result,
                            "class": "img-circle",
                            "style": "display: -webkit-box;width: 75px;height: 75px;position: absolute;border: 2px solid;border-color: #d2d6de;"
                        }).appendTo(image_holder);
                    };
                    image_holder.show();
                    reader.readAsDataURL($(this)[0].files[i]);
                }

            }
        } else {
            alert("Format gambar tidak didukung !");
        }
    });
    $("#save").click(function() {
        $("#save").button("loading");
        var formData = new FormData();
        var img;
        if (!$("#img").get(0).files[0]) {
            img = false;
        } else {
            img = $("#img").get(0).files[0];
        }
        formData.append("img", img, img.name);
        formData.append("username", $("#username").val());
        formData.append("password", $("#password").val());
        formData.append("fullname", $("#fullname").val());
        formData.append("gender", $("#gender").val());
        formData.append("level", $("#level").val());
        formData.append("email", $("#email").val());
        formData.append("telp", $("#telp").val());
        formData.append("address", $("#address").val());
        $.ajax({
            url: "/backend/profile/save",
            type: "POST",
            data: formData,
            async: true,
            success: function(data) {
                swal({
                    type: "success",
                    title: "Selamat data tersimpan !",
                    text: "Klik \"Lanjutkan !\" untuk memuat ulang halaman.",
                    confirmButtonText: "Lanjutkan !",
                    allowEscapeKey: false,
                    allowOutsideClick: false
                }).then(function() {
                    window.location = "/backend/profile/edit"
                })
            },
            cache: false,
            contentType: false,
            processData: false
        });
        return false
    })
});