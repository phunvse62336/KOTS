import { GET_POLICECONTACT } from '../Utils/Constants';
import axios from 'axios';

export const APIGetPoliceContact = async () => {
  try {
    let response = await axios
      .get(GET_POLICECONTACT)
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
