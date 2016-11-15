var router = require('express').Router();

module.exports = {
    path: '/',
    router: router
}

router.use('/', (req, res, next) => {
    res.redirect('/backend/anggota');
})