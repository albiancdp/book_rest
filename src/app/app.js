import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import mongoose from 'mongoose';
import configs from '../configs/global_config';
import rateLimitConfig from '../configs/rate_limit';
import corsConfig from '../configs/cors';
import routers from '../routes/index';

const app = express();
const apiLimiter = rateLimit(rateLimitConfig);
const apiCors = cors(corsConfig);

app.use(apiCors);
app.use(apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.disable('x-powered-by');
// import routers
app.use(routers);

// handle route not found
app.use((req, res, next) => {
  res.status(404).send({
    'status': false,
    'code': 404,
    'message': 'Not Found',
    'data': {},
    'error_code': 'not_found',
    'errors': {}
  });
});

// connect to mongoDB
mongoose.connect(configs.mongoDbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('mongoDB connected');
}).catch((err) => {
  throw new Error(err);
});

export default app;
