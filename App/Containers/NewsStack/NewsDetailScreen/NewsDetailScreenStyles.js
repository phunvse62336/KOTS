import {StyleSheet, Dimensions} from 'react-native';

import {Colors} from '../../../Themes';

const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewTitle: {
    width: width * 0.9,
  },
  viewTime: {
    width: width * 0.9,
  },
  viewDescription: {
    width: width * 0.9,
  },
  textTitle: {
    fontSize: 25,
    textAlign: 'justify',
  },
  textTime: {
    fontSize: 13,
    marginBottom: 10,
  },
  textDescription: {
    width: width * 0.9,
    fontSize: 17,
    textAlign: 'justify',
  },
  imageNews: {
    height: height * 0.3,
    width: width,
  },
});
