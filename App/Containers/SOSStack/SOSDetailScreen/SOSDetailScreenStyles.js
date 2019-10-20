import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');
import {Colors} from '../../../Themes';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  viewButton: {
    height: 100,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: width,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  joinButton: {
    height: 44,
    width: 100,
    backgroundColor: '#0FC277',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  ignoreButton: {
    height: 44,
    width: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {fontSize: 15, color: 'white'},
});
