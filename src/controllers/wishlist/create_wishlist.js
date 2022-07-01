import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import indexDomain from '../../domains/index';
import validateHelper from '../../helpers/utils/validator_rebuild';

const createWishlist = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const resWishlist = await indexDomain.wishlistDomain.createWishlist(req.body);
    if(!resWishlist.status) return responseHelper.errorValidate(res, resWishlist.notValid);
    return responseHelper.success(res, 'Create Wishlist', resWishlist.data);
  }
  catch (err) {
    return responseHelper.errorService(res, err.message);
  };
};

export default createWishlist;
