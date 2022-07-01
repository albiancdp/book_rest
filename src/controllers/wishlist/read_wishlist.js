import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const readWishlist = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resWishlist = await indexDomain.wishlistDomain.readWishlist(req.query.id);
    if (!resWishlist) return responseHelper.notFound(res, 'Wishlist Not Found');
    return responseHelper.success(res, 'Detail Wishlist', resWishlist);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default readWishlist;
