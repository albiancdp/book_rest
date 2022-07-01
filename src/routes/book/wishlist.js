import express from 'express';
import configs from '../../configs/global_config';
import indexController from '../../controllers/index';
import indexValidator from '../../validators/index';
const router = express.Router();

router.route(configs.routeBase + '/wishlist')
  .post(indexValidator.create_validator(), indexController.wishlistController.createWishlist);
router.route(configs.routeBase + '/wishlist/detail')
  .get(indexController.wishlistController.readWishlist);
router.route(configs.routeBase + '/wishlist/list')
  .get(indexValidator.list_validator(), indexController.wishlistController.listWishlist);
router.route(configs.routeBase + '/wishlist/:id')
  .delete(indexController.wishlistController.deleteWishlist);
router.route(configs.routeBase + '/wishlist')
  .put(indexController.wishlistController.updateWishlist);

export default router;
