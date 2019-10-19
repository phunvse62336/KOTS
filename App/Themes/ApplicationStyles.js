import {Dimensions, Platform} from 'react-native';

import Fonts from './Fonts';
import Metrics from './Metrics';
import Colors from './Colors';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android
const {width, height} = Dimensions.get('window');

const ApplicationStyles = {
  flexOne: {flex: 1},
  headerView: {
    height: 56,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 15,
    elevation: 1,
  },
  buttonCaseView: {
    width: width * 0.9,
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  imageCaseView: {width: 90, height: 90, marginLeft: 5},
  inforCaseView: {
    marginLeft: 5,
    width: width * 0.4,
    height: 90,
  },
  doneTextCaseView: {fontSize: 17, color: 'gray'},
  SOSTextCaseView: {fontSize: 17, color: 'red'},
  normalCaseTextCaseView: {fontSize: 17, color: Colors.appColor},
  timeCaseView: {fontSize: 10, marginTop: 5, color: 'gray'},
  nameCaseView: {fontSize: 11, marginTop: 5},
  phoneCaseView: {fontSize: 11},
  buttonViewCaseView: {
    alignItems: 'center',
    height: 90,
    justifyContent: 'space-around',
  },
  doneStatusCaseView: {fontSize: 13, color: 'gray'},
  statusCaseView: {fontSize: 13},
  callButtonCaseView: {
    width: 70,
    height: 50,
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  containerCallOut: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubbleCallOut: {
    width: 250,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderColor: Colors.appColor,
    borderWidth: 2,
    elevation: 2,
  },
  arrowCallOut: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: Colors.appColor,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorderCallOut: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: Colors.appColor,
    alignSelf: 'center',
    marginTop: -0.5,
  },
  headerText: {color: Colors.appColor, fontWeight: 'bold', fontSize: 20},
};

export default ApplicationStyles;
