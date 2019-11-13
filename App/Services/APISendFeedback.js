import { SEND_FEEDBACK_API } from '../Utils/Constants';
import axios from 'axios';

export const APISendFeedback = async (phoneNumber, content) => {
  try {
    let response = await axios
      .post(SEND_FEEDBACK_API, {
        phone: phoneNumber,
        content: content,
      })
      .then(res => {
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
