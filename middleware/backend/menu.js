var router = require('express').Router();

module.exports = {
    path: '/',
    router: router
}

router.use('/backend', (req, res, next) => {
    res.locals.menuleftbar = {
        dashboard: {
            text: "Beranda",
            link: "/backend/dashboard",
            icon: "mdi mdi-view-dashboard"
        },
        anggota: {
            text: "Anggota",
            link: "/backend/anggota",
            icon: "fa fa-id-card",
            menu: [{
                text: "Tambah Anggota",
                link: "/backend/anggota/add",
            }, {
                text: "Lihat Anggota",
                link: "/backend/anggota/list",
            }]
        },
        desa: {
            text: "Desa",
            link: "/backend/desa",
            icon: "fa fa-database",
            menu: [{
                text: "Tambah Desa",
                link: "/backend/desa/add",
            }, {
                text: "Lihat Desa",
                link: "/backend/desa/list",
            }]
        },
        kecamatan: {
            text: "Kecamatan",
            link: "/backend/kecamatan",
            icon: "fa fa-database",
            menu: [{
                text: "Tambah Kecamatan",
                link: "/backend/kecamatan/add",
            }, {
                text: "Lihat Kecamatan",
                link: "/backend/kecamatan/list",
            }]
        },
        kabupaten: {
            text: "Kabupaten",
            link: "/backend/kabupaten",
            icon: "fa fa-database",
            menu: [{
                text: "Tambah Kabupaten",
                link: "/backend/kabupaten/add",
            }, {
                text: "Lihat Kabupaten",
                link: "/backend/kabupaten/list",
            }]
        }
    };
    next();
})