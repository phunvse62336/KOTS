import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
import {Colors} from '../../../Themes';

export default StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
  viewHeader: {flex: 0.3, justifyContent: 'center'},
  alignCenter: {alignItems: 'center'},
  helloText: {fontSize: 18},
  sendText: {fontSize: 18, textAlign: 'center'},
  phoneText: {fontSize: 18, marginTop: 20},
  viewCodeInput: {
    flex: 0.6,
    alignItems: 'center',
  },
  containerCodeInput: {marginTop: 30},
  codeInput: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: Colors.appColor,
    color: Colors.appColor,
  },
  registerButton: {
    width: width * 0.5,
    backgroundColor: '#1662BD',
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: height * 0.3,
  },
  registerText: {color: 'white', fontSize: 18},
  viewFooter: {flex: 0.1, justifyContent: 'flex-end'},
  inlineViewFooter: {flexDirection: 'row', marginBottom: 10},
  textFooter: {color: Colors.appColor, textDecorationLine: 'underline'},
});
