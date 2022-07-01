import wishlistModel from '../models/wishlist';

const sortView = {
  createdAt: { createdAt: -1 },
  title: { title: -1 },
  rating: { rating: -1 },
};

const createWishlist = async (data) => {
  return new Promise((resolve, reject) => {
    wishlistModel.create(data)
      .then(result => {
        resolve({ status: true, data: result });
      }).catch(err => {
        let notValid = {};
        if (err.code === 11000) {
          // edit value in object
          Object.keys(err.keyValue).forEach((key) => {
            notValid[key] = err.keyValue[key] + ' is Already Exist';
          });
          resolve({ status: false, notValid: notValid });
        };
        reject(err);
      });
  });
};

const listWishlist = async (req) => {
  return new Promise((resolve, reject) => {
    const sorting = sortView[req.query.sort || 'createdAt'];
    const search = req.query.search;
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    let response = {
      docs: [],
      page: page,
      limit: limit,
    };
    wishlistModel.aggregate([
      {
        $match: {
          $or: [
            { 'title': { $regex: new RegExp(search), $options: 'i' } },
            { 'author': { $regex: new RegExp(search), $options: 'i' } },
          ]
        }
      },
      { $sort: sorting },
      {
        $facet: {
          total: [
            { $count: 'total' },
          ],
          data: [
            {
              $project: {
                _id: 1,
                title: 1,
                thumbnail: 1,
                author: 1,
                rating: 1,
                createdAt: 1,
              }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
          ],
        },
      },
      {
        $project: {
          total: '$total.total',
          data: '$data',
        },
      }
    ]).then(result => {
      response.docs = result[0].data;
      response.totalItem = result[0].total[0];
      response.totalPage = Math.ceil(response.totalItem / limit) || 0;
      response.startItem = (page - 1) * limit;
      response.endItem = response.startItem + result[0].data.length;
      response.nextPage = response.page < response.totalPage ? true : false;
      response.prevPage = response.page > 1 && response.page <= response.totalPage ? true : false;
      resolve(response);
    }).catch(err => {
      reject(err);
    });
  });
};

const readWishlist = async (wishlistId) => {
  return new Promise((resolve, reject) => {
    wishlistModel.findById(wishlistId)
      .then(result => {
        if (!result) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};

const updateWishlist = async (wishlistId, dataUpdate) => {
  return new Promise((resolve, reject) => {
    let notValid = {};
    wishlistModel.findByIdAndUpdate(wishlistId, dataUpdate)
      .then(async (result) => {
        if (!result) {
          resolve(false);
        } else {
          resolve(result);
        }
      })
      .catch(err => {
        // handle error unique key mongoose
        if (err.code === 11000) {
          // edit value in object
          Object.keys(err.keyValue).forEach((key) => {
            notValid[key] = err.keyValue[key] + ' is Already Exist';
          });
          resolve({ status: false, notValid: notValid });
        };
        resolve(false);
      });
  });
};

const deleteWishlist = async (wishlistId) => {
  return new Promise((resolve, reject) => {
    wishlistModel.findByIdAndDelete(wishlistId)
      .then(result => {
        if (!result) {
          resolve(false);
        } else {
          resolve(result);
        }
      }).catch(err => {
        reject(err);
      });
  });
};

export default {
  createWishlist,
  listWishlist,
  readWishlist,
  updateWishlist,
  deleteWishlist,
};
