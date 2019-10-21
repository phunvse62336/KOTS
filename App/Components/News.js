import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  viewImage: {
    flex: 0.4,
    width: width,
  },
  viewNews: {
    flex: 0.6,
    width: width,
  },
  textOverImageColor: {
    fontSize: 18,
    color: '#ffffff',
  },
  textOverImage: {
    position: 'absolute',
    top: '70%',
    backgroundColor: 'rgba(30, 30, 30, 0.8)',
    left: 0,
    right: 0,
    bottom: 0,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  newsContainer: {
    height: height * 0.2,
    marginTop: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#000000',
    borderTopColor: '#000000',
    flexDirection: 'row',
  },
  newsImageContainer: {
    flex: 0.4,
    padding: 10,
  },
  newsImage: {
    flex: 1,
    height: '100%',
    resizeMode: 'stretch',
  },
  newsDescription: {
    flex: 0.6,
    padding: 5,
  },
  topDescription: {
    flex: 0.8,
    fontSize: 13,
  },
  bottomDescription: {
    flex: 0.2,
  },
});

export default class News extends Component {
  constructor(props) {
    super(props);
  }

  newsDetail = () => {
    const {item, navigation} = this.props;
    navigation.navigate('NewsDetailScreen', {item: item});
  };

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity style={styles.newsContainer} onPress={this.newsDetail}>
        <View style={styles.newsImageContainer}>
          <Image style={styles.newsImage} source={{uri: item.image}} />
        </View>
        <View style={styles.newsDescription}>
          <Text style={styles.topDescription}>{item.description}</Text>
          <Text style={styles.bottomDescription}> {item.date} </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
