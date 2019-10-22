import {CLOSE_CASE_API} from '../Utils/Constants';
import axios from 'axios';

export const APICloseCase = async (
  phoneNumber,
  longitude,
  latitude,
  status,
  caseId,
) => {
  try {
    let response = await axios
      .post(CLOSE_CASE_API, {
        phone: phoneNumber,
        status: status,
        longitude: longitude,
        latitude: latitude,
        caseId: caseId,
      })
      .then(res => {
        console.log(res);
        return res.data;
      })
      .catch(err => {
        console.log(err);
        return {result: 3000, data: null};
      });
    return response;
  } catch (e) {
    console.log('ERROR' + e.message);
    return {result: 3000, data: null};
  }
};
