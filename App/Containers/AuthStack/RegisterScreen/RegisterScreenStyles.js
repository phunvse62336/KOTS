import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');
import {Colors} from '../../../Themes';

export default StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  viewLogo: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {width: width / 2, height: width / 2},
  viewForm: {flex: 0.5},
  viewInput: {
    width: width * 0.7,
    flexDirection: 'row',
    borderColor: Colors.appColor,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  phoneInput: {
    height: 44,
    justifyContent: 'center',
    width: width * 0.5,
    marginLeft: 5,
  },
  colorApp: {color: Colors.appColor},
  registerButton: {
    width: width * 0.7,
    backgroundColor: Colors.appColor,
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  registerTextButton: {color: 'white', fontSize: 18},
  viewFooter: {
    flex: 0.1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  inlineViewFooter: {flexDirection: 'row', marginBottom: 20},
  textFooter: {fontSize: 13, textAlign: 'center'},
});
