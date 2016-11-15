var router = require('express').Router();
var kabupaten = require('../../model/kabupaten');
var kecamatan = require('../../model/kecamatan');
var desa = require('../../model/desa');
var anggota = require('../../model/anggota');
var pengguna = require('../../model/pengguna');

module.exports = {
    path: '/backend/desa',
    router: router
}

router.get('/add', (req, res) => {
    var level = res.locals.alfacode;
    level.kab = req.cookies['kabupaten'];
    kabupaten.get(level, (result) => {
        res.locals.title = "Tambah Desa";
        res.locals.dt_kabupaten = result;
        res.locals.subtitle = "menambahkan desa baru"
        res.render('backend/desa/add');
    })
})

router.post('/get', (req, res) => {
    desa.get(req.body.id, res.locals.alfacode, (result) => {
        res.json({
            status: true,
            data: result
        })
    })
})

router.get('/', (req, res) => {
    res.redirect('/backend/desa/list/1')
})

router.get('/list', (req, res) => {
    res.redirect('/backend/desa/list/1')
})

router.get('/list/:pg', (req, res) => {
    desa.pagi(req.params.pg, res.locals.alfacode, (pagi, result) => {
        res.locals.pagi = pagi;
        res.locals.dt_desa = result;
        res.locals.title = "Daftar Desa";
        res.locals.subtitle = "daftar desa yang terdaftar"
        res.render('backend/desa/list');
    });
})

router.post('/save', (req, res) => {
    var data = req.body;
    desa.save({
        nama: data.nama,
        kabupaten: data.kabupaten,
        kecamatan: data.kecamatan
    }, (result) => {
        pengguna.save({
            level: 'desa',
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
    desa.delete(data.id, (result) => {
        anggota.deletebydesa(data.id, (result) => {
            pengguna.delete(data.id, (result) => {
                res.json({
                    status: true
                });
            })
        })
    })
})

router.get('/edit/:id', (req, res) => {
    res.locals.title = "Edit Desa";
    res.locals.subtitle = "mengubah data desa";
    desa.getbyid(req.params.id, (result) => {
        res.locals.dt_desa = result;
        var level = res.locals.alfacode;
        level.kab = req.cookies['kabupaten'];
        kabupaten.get(level, (result) => {
            for (var i = 0; i < result.length; i++) {
                if (res.locals.dt_desa.kabupaten.id == result[i].id) result[i].selected = true;
                else result[i].selected = false;
            }
            res.locals.dt_kabupaten = result;
            kecamatan.get(res.locals.dt_desa.kabupaten.id, res.locals.alfacode, (result) => {
                for (var i = 0; i < result.length; i++) {
                    if (res.locals.dt_desa.kecamatan.id == result[i].id) result[i].selected = true;
                    else result[i].selected = false;
                }
                res.locals.dt_kecamatan = result;
                pengguna.filter(res.locals.dt_desa.id, (result) => {
                    res.locals.dt_pengguna = result;
                    res.render('backend/desa/edit');
                })
            })
        })
    })
})

router.post('/update/:id', (req, res) => {
    var data = req.body;
    desa.update(req.params.id, {
        nama: data.nama,
        kabupaten: data.kabupaten,
        kecamatan: data.kecamatan
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