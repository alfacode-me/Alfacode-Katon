var router = require('express').Router();

module.exports = {
    path: '/',
    router: router
}

router.use('/backend', (req, res, next) => {
    if (req.cookies['alfacode']) {
        next();
    } else {
        res.redirect('/auth/login');
    }
})

router.use('/auth/login', (req, res, next) => {
    if (req.cookies['alfacode']) {
        res.redirect('/backend');
    } else {
        next();
    }
})