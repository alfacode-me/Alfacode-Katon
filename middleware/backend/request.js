var router = require('express').Router();

module.exports = {
    path: '/',
    router: router
}

router.use('/backend', (req, res, next) => {
    res.locals.req = req;
    next();
})