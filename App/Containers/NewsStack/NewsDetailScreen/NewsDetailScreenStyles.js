import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '../../../Themes';

const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewTitle: {
    width: width * 0.9,
    marginBottom: 10,
  },
  viewTime: {
    width: width * 0.9,
    flexDirection: 'row',
    marginBottom: 15,
  },
  viewSubDescription: {
    width: width * 0.9,
  },
  viewDescription: {
    width: width * 0.9,
  },
  textTitle: {
    fontSize: 25,
    textAlign: 'justify',
  },
  textDescription: {
    fontSize: 17,
    textAlign: 'justify',
  },
  imageNews: {
    height: height * 0.3,
    width: width * 0.9,
    marginBottom: 10,
  },
  textsubDescription: {
    fontSize: 18,
    color: '#696969',
  },
  textSource: {
    color: '#1e90ff',
    marginRight: 5,
    fontSize: 13,
  },
  textDate: {
    color: '#696969',
    fontSize: 13,
  },
});
