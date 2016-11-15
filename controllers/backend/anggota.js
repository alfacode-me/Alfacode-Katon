var router = require('express').Router();
var kabupaten = require('../../model/kabupaten');
var kecamatan = require('../../model/kecamatan');
var desa = require('../../model/desa');
var anggota = require('../../model/anggota');
var pengguna = require('../../model/pengguna');

module.exports = {
    path: '/backend/anggota',
    router: router
}

router.get('/add', (req, res) => {
    var level = res.locals.alfacode;
    level.kab = req.cookies['kabupaten'];
    kabupaten.get(level, (result) => {
        res.locals.dt_kabupaten = result;
        res.locals.title = "Tambah Anggota";
        res.locals.subtitle = "Menambahkan Anggota Baru"
        res.render('backend/anggota/add');
    })
})

router.get('/', (req, res) => {
    res.redirect('/backend/anggota/list/1')
})

router.get('/list', (req, res) => {
    res.redirect('/backend/anggota/list/1')
})

router.get('/list/:pg', (req, res) => {
    var level = res.locals.alfacode;
    if (level.desa) {
        anggota.pagidesa(req.params.pg, level.id, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.title = "Daftar Anggota";
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    } else if (level.kecamatan) {
        anggota.pagikecamatan(req.params.pg, level.id, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.title = "Daftar Anggota";
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    } else if (level.kabupaten) {
        anggota.pagikabupaten(req.params.pg, level.id, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.title = "Daftar Anggota";
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    } else {
        anggota.pagi(req.params.pg, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.title = "Daftar Anggota";
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    }
})

router.get('/detail/:id', (req, res) => {
    anggota.get(req.params.id, (result) => {
        res.locals.dt_anggota = result;
        res.locals.title = "Informasi Anggota";
        res.locals.subtitle = "detail informasi data anggota"
        res.render('backend/anggota/detail');
    })
})

router.get('/edit/:id', (req, res) => {
    res.locals.title = "Edit Anggota";
    res.locals.subtitle = "mengubah data anggota";
    anggota.get(req.params.id, (result) => {
        res.locals.dt_anggota = result;
        var level = res.locals.alfacode;
        level.kab = req.cookies['kabupaten'];
        kabupaten.get(level, (result) => {
            for (var i = 0; i < result.length; i++) {
                if (res.locals.dt_anggota.kabupaten.id == result[i].id) result[i].selected = true;
                else result[i].selected = false;
            }
            res.locals.dt_kabupaten = result;
            level.kec = req.cookies['kecamatan'];
            kecamatan.get(res.locals.dt_anggota.kabupaten.id, level, (result) => {
                for (var i = 0; i < result.length; i++) {
                    if (res.locals.dt_anggota.kecamatan.id == result[i].id) result[i].selected = true;
                    else result[i].selected = false;
                }
                res.locals.dt_kecamatan = result;
                desa.get(res.locals.dt_anggota.kecamatan.id, level, (result) => {
                    for (var i = 0; i < result.length; i++) {
                        if (res.locals.dt_anggota.desa.id == result[i].id) result[i].selected = true;
                        else result[i].selected = false;
                    }
                    res.locals.dt_desa = result;
                    res.render('backend/anggota/edit');
                })
            })
        })
    })
})

router.post('/save', (req, res) => {
    var data = req.body;
    anggota.save(data, (result) => {
        res.json({
            status: true
        });
    })
})

router.post('/update/:id', (req, res) => {
    anggota.update(req.params.id, req.body, (result) => {
        res.json({
            status: true
        });
    })
})

router.post('/delete', (req, res) => {
    var data = req.body;
    anggota.delete(data.id, (result) => {
        res.json({
            status: true
        });
    })
})

router.get('/desa/:id/:pg', (req, res) => {
    desa.name(req.params.id, (nama) => {
        res.locals.title = "Daftar Anggota Desa " + nama;
        anggota.pagidesa(req.params.pg, req.params.id, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    });
})

router.get('/kabupaten/:id/:pg', (req, res) => {
    kabupaten.name(req.params.id, (nama) => {
        res.locals.title = "Daftar Anggota Kabupaten " + nama;
        anggota.pagikabupaten(req.params.pg, req.params.id, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    });
})

router.get('/kecamatan/:id/:pg', (req, res) => {
    kecamatan.name(req.params.id, (nama) => {
        res.locals.title = "Daftar Anggota Kecamatan " + nama;
        anggota.pagikecamatan(req.params.pg, req.params.id, (pagi, result) => {
            res.locals.pagi = pagi;
            res.locals.dt_anggota = result;
            res.locals.subtitle = "daftar anggota yang terdaftar"
            res.render('backend/anggota/list');
        });
    });
})