export const MESSAGES = {
  CODE: {
    SUCCESS_CODE: 200,
    FAILED_CODE: 3000,
  },
  CASE: {
    CREATE: 0,
    CONFIRM: 1,
    SUCCESSED: 2,
    FAILED: 3,
    PENDING: 4,
  },
  TYPE_CASE: {
    SOS: 1,
    NORMAL: 2,
  },
};

export const NOTIFICATION_CHANNEL = 'kots-channel';

export const BASE_URL = 'https://kots.herokuapp.com/api/';

export const FIND_KNIGHT_API = BASE_URL + 'findKnight';

export const SEND_SOS_API = BASE_URL + 'sendCase';

export const GET_CASE_API = BASE_URL + 'getCase';

export const CONFIRM_CASE_API = BASE_URL + 'confirmCase';

export const CLOSE_CASE_API = BASE_URL + 'closeCase';
