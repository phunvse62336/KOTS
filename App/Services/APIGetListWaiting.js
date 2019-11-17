import { GET_LIST_WAITING_KNIGHT } from '../Utils/Constants';
import axios from 'axios';

export const APIGetListWaiting = async teamId => {
  try {
    let response = await axios
      .post(GET_LIST_WAITING_KNIGHT, { teamId: teamId })
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
