import apiCall from '../../services/axios';
import { validationResult } from 'express-validator';
import responseHelper from '../../helpers/utils/response';
import validateHelper from '../../helpers/utils/validator_rebuild';

const defaults = async (req, res) => {
  try {
    const notValids = validationResult(req);
    if (!notValids.isEmpty()) {
      const valid = validateHelper(notValids);
      return responseHelper.errorValidate(res, valid);
    };
    const dataResponse = await apiCall('https://www.googleapis.com/books/v1/volumes', req.query);
    const dataMap = dataResponse.items.map(item => {
      return {
        bookId: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail || '',
        link: item.volumeInfo.infoLink,
        rating: item.volumeInfo.averageRating || 0,
      };
    });
    return responseHelper.success(res, 'Success Get From Google API', dataMap);
  } catch (error) {
    return responseHelper.errorService(res, error.message);
  }
};

export default defaults;
