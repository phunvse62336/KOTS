import { LEAVE_CASE_API } from '../Utils/Constants';
import axios from 'axios';

export const APILeaveCase = async (phoneNumber, caseId) => {
  try {
    let response = await axios
      .post(LEAVE_CASE_API, {
        phone: phoneNumber,
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
    console.log(e.message);
    return { result: 3000, data: null };
  }
};
