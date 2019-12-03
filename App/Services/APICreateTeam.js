import { CREATE_TEAM } from '../Utils/Constants';
import axios from 'axios';

export const APICreateTeam = async (phoneNumber, name, address) => {
  try {
    let response = await axios
      .post(CREATE_TEAM, {
        phone: phoneNumber,
        name: name,
        address: address,
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
