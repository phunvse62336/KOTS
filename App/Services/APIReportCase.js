import { REPORT_CASE } from '../Utils/Constants';
import axios from 'axios';

export const APIReportCase = async (
  caseId,
  report,
  criminalName,
  criminalAge,
  criminalImage,
) => {
  try {
    let response = await axios
      .post(REPORT_CASE, {
        caseId,
        criminalName,
        criminalAge,
        criminalImage,
        report: report === null ? null : report,
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return { result: 3000, data: null };
      });
    return response;
  } catch (e) {
    return { result: 3000, data: null };
  }
};
