var router = require('express').Router();

var pengguna = require('../../model/pengguna');

module.exports = {
    path: '/',
    router: router
}

router.use('/backend', (req, res, next) => {
    var id = req.cookies['alfacode'];
    var nama = req.cookies['nama'];
    var username = req.cookies['usernama'];
    var level = req.cookies['level'];
    var alfacode = {}
    alfacode.id = id;
    alfacode.level = level;
    if (level == "desa") {
        alfacode.desa = true;
        alfacode.username = username;
        alfacode.name = "Ds. " + nama;
        alfacode.fullname = "Desa " + nama;
    } else if (level == "kecamatan") {
        alfacode.kecamatan = true;
        alfacode.username = username;
        alfacode.name = "Kc. " + nama;
        alfacode.fullname = "Kecamatan " + nama;
    } else if (level == "kabupaten") {
        alfacode.kabupaten = true;
        alfacode.username = username;
        alfacode.name = "Kb. " + nama;
        alfacode.fullname = "Kabupaten " + nama;
    } else if (level == "provinsi") {
        alfacode.provinsi = true;
        alfacode.username = username;
        alfacode.name = "Prov. " + nama;
        alfacode.fullname = "Provinsi " + nama;
    }
    res.locals.alfacode = alfacode;
    next();
})