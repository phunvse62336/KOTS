import { APPROVE_KNIGHT } from '../Utils/Constants';
import axios from 'axios';

export const APIIgnoreKnight = async (phone, action, status) => {
  try {
    let response = await axios
      .post(APPROVE_KNIGHT, {
        phone: phone,
        status: status,
        action: action,
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

    // let response = await fetch(
    //   'https://facebook.github.io/react-native/movies.json',
    // );
    // let responseJson = await response.json();
    // console.log(JSON.stringify(responseJson));
    // return responseJson.movies;
  } catch (e) {
    console.log(e.message);
    return { result: 3000, data: null };
  }
};
