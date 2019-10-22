import {SEND_SOS_API} from '../Utils/Constants';

export const APISendSOS = async (phoneNumber, longitude, latitude) => {
  try {
    let response = await fetch(SEND_SOS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        message: 'Help me',
        longitude: longitude,
        latitude: latitude,
        type: 2,
      }),
    });
    let responseJson = await response.json();
    console.log(responseJson);

    return responseJson;
  } catch (e) {
    console.log('ERROR' + e.message);
    return {result: 3000, data: null};
  }
};
