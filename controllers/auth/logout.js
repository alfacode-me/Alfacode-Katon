var router = require('express').Router();

module.exports = {
    path: '/auth/logout',
    router: router
};

router.post('/', (req, res) => {
    res.clearCookie('alfacode');
    res.clearCookie('level');
    res.clearCookie('nama');
    res.clearCookie('usernama');
    res.json({
        status: 1
    })
})