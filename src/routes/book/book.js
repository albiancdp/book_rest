import express from 'express';
import configs from '../../configs/global_config';
import indexController from '../../controllers/index';
import indexValidator from '../../validators/index';
const router = express.Router();

router.route(configs.routeBase + '/book')
  .get(indexValidator.get_book_validator(), indexController.bookController.getBook);

export default router;
