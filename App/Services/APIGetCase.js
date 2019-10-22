import {GET_CASE_API} from '../Utils/Constants';

export const APIGetCase = async phoneNumber => {
  try {
    let response = await fetch(GET_CASE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone: phoneNumber,
        role: '2',
      }),
    });
    let responseJson = await response.json();
    return responseJson;

    // let response = await fetch(
    //   'https://facebook.github.io/react-native/movies.json',
    // );
    // let responseJson = await response.json();
    // console.log(JSON.stringify(responseJson));
    // return responseJson.movies;
  } catch (e) {
    console.log(e.message);
    return {result: 3000, data: null};
  }
};
