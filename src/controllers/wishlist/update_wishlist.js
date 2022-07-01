import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const updateWishlist = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const wishlistId = req.body.id;
    delete req.body.id;
    const resWishlist = await indexDomain.wishlistDomain.updateWishlist(wishlistId, req.body);
    if (!resWishlist) return responseHelper.notFound(res, 'Wishlist Not Found');
    return responseHelper.success(res, 'Update Wishlist', {});
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default updateWishlist;
