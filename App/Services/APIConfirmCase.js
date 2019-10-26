import { CONFIRM_CASE_API } from '../Utils/Constants';
import axios from 'axios';

export const APIConfirmCase = async (phoneNumber, caseId) => {
  try {
    console.log(phoneNumber + ' abc ' + caseId);
    let response = await axios
      .post(CONFIRM_CASE_API, {
        phone: phoneNumber,
        status: 1,
        caseId: caseId,
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
    console.log('ERROR' + e.message);
    return { result: 3000, data: null };
  }
};
