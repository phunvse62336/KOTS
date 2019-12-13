import { UPDATE_KNIGHT_PROFILE } from '../Utils/Constants';
import axios from 'axios';

export const APIUpdateKnightProfile = async (
  phoneNumber,
  name,
  address,
  gender,
  token,
  dayOfBirth,
  teamId,
  avatar,
  front,
  back,
  certification1,
  certification2,
  certification3,
) => {
  try {
    console.log(
      phoneNumber,
      name,
      address,
      gender,
      token,
      dayOfBirth,
      teamId,
      avatar,
      front,
      back,
      certification1,
      certification2,
      certification3,
    );
    let response = await axios
      .post(UPDATE_KNIGHT_PROFILE, {
        phone: phoneNumber,
        name: name,
        address: address,
        gender: gender,
        token: token === null ? null : token,
        dateOfBirth: dayOfBirth,
        teamId: teamId === null ? null : teamId,
        avatar: avatar === null ? null : teamId,
        photoIdFront: front === null ? null : teamId,
        photoIdBack: back === null ? null : teamId,
        certification1: certification1 === null ? null : certification1,
        certification2: certification2 === null ? null : certification2,
        certification3: certification3 === null ? null : certification3,
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
