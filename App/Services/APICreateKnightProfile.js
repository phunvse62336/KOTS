import { CREATE_KNIGHT_PROFILE } from '../Utils/Constants';
import axios from 'axios';

export const APICreateKnightProfile = async (phoneNumber, token) => {
  try {
    let response = await axios
      .post(CREATE_KNIGHT_PROFILE, {
        phone: phoneNumber,
        role: '2',
        token: token,
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
