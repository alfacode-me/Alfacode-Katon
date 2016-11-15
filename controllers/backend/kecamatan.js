var router = require('express').Router();
var kabupaten = require('../../model/kabupaten');
var kecamatan = require('../../model/kecamatan');
var desa = require('../../model/desa');
var anggota = require('../../model/anggota');
var pengguna = require('../../model/pengguna');

module.exports = {
    path: '/backend/kecamatan',
    router: router
}

router.get('/add', (req, res) => {
    kabupaten.get(res.locals.alfacode, (result) => {
        res.locals.title = "Tambah Kecamatan";
        res.locals.dt_kabupaten = result;
        res.locals.subtitle = "menambahkan kecamatan baru"
        res.render('backend/kecamatan/add');
    })
})

router.post('/get', (req, res) => {
    var level = res.locals.alfacode;
    level.kec = req.cookies['kecamatan'];
    kecamatan.get(req.body.id, level, (result) => {
        res.json({
            status: true,
            data: result
        })
    })
})

router.get('/', (req, res) => {
    res.redirect('/backend/kecamatan/list/1')
})

router.get('/list', (req, res) => {
    res.redirect('/backend/kecamatan/list/1')
})

router.get('/list/:pg', (req, res) => {
    kecamatan.pagi(req.params.pg, res.locals.alfacode, (pagi, result) => {
        res.locals.pagi = pagi;
        res.locals.dt_kecamatan = result;
        res.locals.title = "Daftar Kecamatan";
        res.locals.subtitle = "daftar kecamatan yang terdaftar"
        res.render('backend/kecamatan/list');
    });
})

router.post('/save', (req, res) => {
    var data = req.body;
    kecamatan.save({
        nama: data.nama,
        kabupaten: data.kabupaten
    }, (result) => {
        pengguna.save({
            level: 'kecamatan',
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
    kecamatan.delete(data.id, (result) => {
        desa.deletebykecamatan(data.id, (result) => {
            anggota.deletebykecamatan(data.id, (result) => {
                pengguna.delete(data.id, (result) => {
                    res.json({
                        status: true
                    });
                })
            })
        })
    })
})

router.get('/edit/:id', (req, res) => {
    res.locals.title = "Edit Kecamatan";
    res.locals.subtitle = "mengubah data kecamatan";
    kecamatan.getbyid(req.params.id, (result) => {
        res.locals.dt_kecamatan = result;
        kabupaten.get(res.locals.alfacode, (result) => {
            for (var i = 0; i < result.length; i++) {
                if (res.locals.dt_kecamatan.kabupaten.id == result[i].id) result[i].selected = true;
                else result[i].selected = false;
            }
            res.locals.dt_kabupaten = result;
            pengguna.filter(res.locals.dt_kecamatan.id, (result) => {
                res.locals.dt_pengguna = result;
                res.render('backend/kecamatan/edit');
            })
        })
    })
})

router.post('/update/:id', (req, res) => {
    var data = req.body;
    kecamatan.update(req.params.id, {
        nama: data.nama,
        kabupaten: data.kabupaten
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