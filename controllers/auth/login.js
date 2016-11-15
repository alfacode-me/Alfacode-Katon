var router = require('express').Router();

var pengguna = require('../../model/pengguna');

module.exports = {
    path: '/auth/login',
    router: router
};

router.get('/', (req, res) => {
    res.locals.title = 'Masuk'
    res.render('auth/login');
});

router.post('/check', (req, res) => {
    var user = req.body;
    pengguna.checkuser(user.username, user.password, (result) => {
        console.log(result);
        if (result.status) {
            if (user.remember == 1) {
                if (result.data.info.kabupaten) {
                    res.cookie('kabupaten', result.data.info.kabupaten, {
                        httpOnly: true
                    })
                }
                if (result.data.info.kecamatan) {
                    res.cookie('kecamatan', result.data.info.kecamatan, {
                        httpOnly: true
                    })
                }
                res.cookie('alfacode', result.data.id_level, {
                    httpOnly: true
                });
                res.cookie('nama', result.data.info.nama, {
                    httpOnly: true
                });
                res.cookie('usernama', result.data.username, {
                    httpOnly: true
                });
                res.cookie('level', result.data.level, {
                    httpOnly: true
                });
            } else {
                if (result.data.info.kabupaten) {
                    res.cookie('kabupaten', result.data.info.kabupaten, {
                        maxAge: 3600000,
                        httpOnly: true
                    })
                }
                if (result.data.info.kecamatan) {
                    res.cookie('kecamatan', result.data.info.kecamatan, {
                        maxAge: 3600000,
                        httpOnly: true
                    })
                }
                res.cookie('alfacode', result.data.id_level, {
                    maxAge: 3600000,
                    httpOnly: true
                });
                res.cookie('nama', result.data.info.nama, {
                    maxAge: 3600000,
                    httpOnly: true
                });
                res.cookie('usernama', result.data.username, {
                    maxAge: 3600000,
                    httpOnly: true
                });
                res.cookie('level', result.data.level, {
                    maxAge: 3600000,
                    httpOnly: true
                });
            }
            res.json({
                status: true
            })
        } else {
            res.json({
                status: false
            })
        }
    })
})