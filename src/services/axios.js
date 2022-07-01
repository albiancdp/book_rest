import axios from 'axios';

const apiCall = async (link, query) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url: link,
        method: 'get',
        params: {
          q: query.q,
          startIndex: query.startIndex || 0,
        }
      }).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default apiCall;
