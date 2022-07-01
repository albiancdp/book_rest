import express from 'express';
// import router
import defaultRouter from './default/index';
import bookRouter from './book/index';
import healthCheckRouter from './server-health-check/index';

const router = express.Router();

router.use(defaultRouter);
router.use(bookRouter);
router.use(healthCheckRouter);

export default router;
