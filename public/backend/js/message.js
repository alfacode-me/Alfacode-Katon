$(function() {
    $('#content').froalaEditor({
        language: 'id',
        heightMin: 300,
        heightMax: 500,
        fileUploadURL: '/upload/pages/home/files',
        imageUploadURL: '/upload/pages/home/images'
    })
})