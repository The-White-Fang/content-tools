const { Router } = require('express');

const router = Router();

const authRouter = require('./auth');

router.use('/', authRouter);

module.exports = router;
