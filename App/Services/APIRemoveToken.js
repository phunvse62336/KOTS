import { REMOVE_TOKEN_API } from '../Utils/Constants';
import axios from 'axios';

export const APIRemoveToken = async phoneNumber => {
  try {
    let response = await axios
      .post(REMOVE_TOKEN_API, {
        phone: phoneNumber,
      })
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return { result: 3000, data: null };
      });
    return response;
  } catch (e) {
    console.log(e.message);
    return { result: 3000, data: null };
  }
};
