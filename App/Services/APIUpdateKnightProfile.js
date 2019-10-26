import { UPDATE_KNIGHT_PROFILE } from '../Utils/Constants';
import axios from 'axios';

export const APIUpdateKnightProfile = async (
  phoneNumber,
  name,
  address,
  gender,
  token,
) => {
  try {
    let response = await axios
      .post(UPDATE_KNIGHT_PROFILE, {
        phone: phoneNumber,
        name: name,
        address: address,
        gender: gender,
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
