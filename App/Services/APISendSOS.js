import { SEND_SOS_API } from '../Utils/Constants';
import axios from 'axios';

export const APISendSOS = async (
  phoneNumber,
  message,
  longitude,
  latitude,
  type,
  image,
  sound,
) => {
  try {
    console.log('image api ' + image);
    let response = await axios
      .post(SEND_SOS_API, {
        phone: phoneNumber,
        message: message,
        longitude: longitude,
        latitude: latitude,
        type: type,
        image: image === null ? null : image,
        sound: sound === null ? null : sound,
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
