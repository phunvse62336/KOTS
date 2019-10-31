import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import HeaderUI from '../../../Components/HeaderUI';
import { News } from '../../../Components';
import styles from './NewsScreenStyles';

import { APIGetNews } from '../../../Services/APIGetNews';
import { MESSAGES } from '../../../Utils/Constants';

const { width, height } = Dimensions.get('window');

export default class NewsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      itemsCount: 5,
      toast: false,
      spinner: false,
    };
  }

  renderNewItem = () => {
    if (this.state.itemsCount < this.state.news.length) {
      this.setState(prevState => ({ itemsCount: prevState.itemsCount + 5 }));
    }
  };

  async componentDidMount() {
    this.setState({ spinner: true });
    let responseStatus = await APIGetNews();
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.state.news = responseStatus.data;
      this.setState({
        toast: true,
        spinner: false,
      });
      setTimeout(
        () =>
          this.setState({
            toast: false,
          }),
        3000,
      ); // hide toast after 5s
    } else {
      this.setState({
        spinner: false,
      });
      alert('Không thể kết nối vui lòng thử lại sau');
    }

    setTimeout(
      () =>
        this.setState({
          toast: false,
        }),
      5000,
    ); // hide toast after 5s
  }

  _renderItem = ({ item, index }) => (
    <News item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{ color: '#fff', zIndex: 0 }}
          size="large"
        />
        <HeaderUI title="Tin Tức" />
        <ScrollView style={styles.containerScrollView}>
          <View style={styles.viewImage}>
            <ImageBackground
              source={{
                uri:
                  'https://znews-photo.zadn.vn/w660/Uploaded/ngotgs/2019_10_14/a_1.jpg',
              }}
              style={styles.bannerImage}>
              <View style={styles.textOverImage}>
                <Text style={styles.textOverImageColor}>
                  Công an Hà Nội bổ sung 15 tổ cảnh sát 141
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.viewFlat}>
            <FlatList
              data={this.state.news.slice(0, this.state.itemsCount)}
              extraData={this.state}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item}
              renderItem={this._renderItem}
            />
          </View>
          <TouchableOpacity style={styles.btnLoad} onPress={this.renderNewItem}>
            <Text style={styles.textLoadMore}>Xem Thêm</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export { NewsScreen };
