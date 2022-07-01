import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const deleteWishlist = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resWishlist = await indexDomain.wishlistDomain.deleteWishlist(req.params.id);
    if (!resWishlist) return responseHelper.notFound(res, 'Wishlist Not Found');
    return responseHelper.success(res, 'Delete Wishlist', resWishlist);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default deleteWishlist;
