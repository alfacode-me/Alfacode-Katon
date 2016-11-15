var router = require('express').Router();
var kabupaten = require('../../model/kabupaten');
var kecamatan = require('../../model/kecamatan');
var desa = require('../../model/desa');
var anggota = require('../../model/anggota');
var pengguna = require('../../model/pengguna');

module.exports = {
    path: '/backend/kabupaten',
    router: router
}

router.get('/add', (req, res) => {
    res.locals.title = "Tambah Kabupaten";
    res.locals.subtitle = "menambahkan kabupaten baru"
    res.render('backend/kabupaten/add');
})

router.get('/', (req, res) => {
    res.redirect('/backendkabupatenn/list/1')
})

router.get('/list', (req, res) => {
    res.redirect('/backend/kabupaten/list/1')
})

router.get('/list/:pg', (req, res) => {
    kabupaten.pagi(req.params.pg, (pagi, result) => {
        res.locals.pagi = pagi;
        res.locals.dt_kabupaten = result;
        res.locals.title = "Daftar Kabupaten";
        res.locals.subtitle = "daftar kabupaten yang terdaftar"
        res.render('backend/kabupaten/list');
    });
})

router.post('/save', (req, res) => {
    var data = req.body;
    kabupaten.save({
        nama: data.nama
    }, (result) => {
        pengguna.save({
            level: 'kabupaten',
            id_level: result.generated_keys[0],
            username: data.username,
            password: data.password
        }, (result) => {
            res.json({
                status: true
            });
        })
    })
})

router.post('/delete', (req, res) => {
    var data = req.body;
    kabupaten.delete(data.id, (result) => {
        kecamatan.deletebykabupaten(data.id, (result) => {
            desa.deletebykabupaten(data.id, (result) => {
                anggota.deletebykabupaten(data.id, (result) => {
                    pengguna.delete(data.id, (result) => {
                        res.json({
                            status: true
                        });
                    })
                })
            })
        })
    })
})

router.get('/edit/:id', (req, res) => {
    res.locals.title = "Edit Kabupaten";
    res.locals.subtitle = "mengubah data kabupaten";
    kabupaten.getbyid(req.params.id, (result) => {
        res.locals.dt_kabupaten = result;
        pengguna.filter(res.locals.dt_kabupaten.id, (result) => {
            res.locals.dt_pengguna = result;
            res.render('backend/kabupaten/edit');
        })
    })
})

router.post('/update/:id', (req, res) => {
    var data = req.body;
    kabupaten.update(req.params.id, {
        nama: data.nama
    }, (result) => {
        pengguna.update(req.params.id, {
            username: data.username,
            password: data.password
        }, (result) => {
            res.json({
                status: true
            });
        })
    })
})