import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
import { Colors } from '../../../Themes';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAccount: {
    flex: 0.2,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderBottomWidth: 0.5,
  },
  viewSetting: {
    flex: 0.8,
    width: width * 0.9,
  },
  viewName: {
    marginLeft: 10,
  },
  mediaView: {
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: Colors.appColor,
    borderRadius: 50,
  },
  textTouch: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  viewTouch: {
    width: '100%',
    height: height * 0.1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  viewAccountTitle: {
    flex: 0.2,
  },
  textSettingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  viewAccountInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textName: {
    fontSize: 25,
    color: Colors.appColor,
  },
  textPhone: {
    fontSize: 20,
    color: '#a9a9a9',
  },
  viewFunctionBasic: {
    width: '100%',
    borderBottomWidth: 0.5,
  },
  viewFunctionInfo: {
    width: '100%',
  },
  viewBasic: {
    marginTop: 20,
  },
  viewInfo: {
    marginTop: 20,
  },
  iconStyle: {
    color: Colors.appColor,
    width: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
