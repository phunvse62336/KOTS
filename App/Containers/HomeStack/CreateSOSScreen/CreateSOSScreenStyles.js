import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../Themes';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCase: {
    height: 100,
    width: width * 0.8,
    // backgroundColor: '#00fa9a',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewMessage: {
    height: 200,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMedia: {
    flex: 0.2,
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  viewButton: {
    flex: 0.2,
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  casePicker: {
    height: 40,
    width: '100%',
  },
  viewPicker: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.appColor,
    overflow: 'hidden',
  },
  pickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  inputMessage: {
    width: '100%',
    height: 200,
  },
  mediaTouchable: {
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: Colors.appColor,
    borderRadius: 50,
  },
  buttonHelp: {
    width: '100%',
    backgroundColor: Colors.appColor,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonHelpText: {
    color: 'white',
    fontSize: 18,
  },
  inputViewContainer: {
    height: '100%',
    position: 'relative',
    marginTop: 25,
  },
  inputViewLabel: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -15,
    left: 15,
    padding: 5,
    zIndex: 0,
  },
  inputView: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.appColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
    fontSize: 15,
    color: Colors.appColor,
    zIndex: -1,
    textAlignVertical: 'top',
  },
  colorText: {
    color: Colors.appColor,
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  backgroundVideo: {
    width: 150,
    height: 150,
  },
});
