import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
const { width, height } = Dimensions.get('window');
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

import Police from '../../../Components/Police';
import { APIGetPoliceContact } from '../../../Services/APIGetPoliceContact';
import { MESSAGES } from '../../../Utils/Constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewPoliceList: {
    width: width * 0.9,
  },
});

export default class PoliceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      toast: false,
      spinner: false,
      polices: [],
    };
  }

  async componentDidMount() {
    this.setState({ spinner: true });
    let responseStatus = await APIGetPoliceContact();
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.state.polices = responseStatus.data;
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
    <Police item={item} index={index} navigation={this.props.navigation} />
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
        <View styles={styles.viewPoliceList}>
          <FlatList
            data={this.state.polices}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
          />
        </View>
      </View>
    );
  }
}

export { PoliceScreen };
