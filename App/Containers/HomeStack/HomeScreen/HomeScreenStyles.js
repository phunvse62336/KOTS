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
});
