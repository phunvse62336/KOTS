import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { Colors } from '../Themes';
import { APIUpdateKnightProfile } from '../Services/APIUpdateKnightProfile';
import { MESSAGES } from '../Utils/Constants';
const { width, height } = Dimensions.get('screen');

export class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      token: this.props.token,
    };
  }

  joinAPI = async () => {
    this.props.spinnerLoading();
    console.log('vào đây rồi nè 1 ');

    let responseStatus = await APIUpdateKnightProfile(
      this.props.phoneNumber,
      null,
      null,
      null,
      this.state.token,
      null,
      this.state.item.id,
    );

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      await AsyncStorage.setItem('LOGIN', '1');
      await AsyncStorage.setItem('PHONENUMBER', this.props.phoneNumber);
      await AsyncStorage.setItem('USER', JSON.stringify(responseStatus.data));
      this.props.spinnerLoading();
      this.props.navigation.navigate('AppNavigator');
    } else {
      this.props.spinnerLoading();
      alert('Có lỗi. Xin vui lòng gửi lại sau!');
    }
  };

  joinTeam = async () => {
    Alert.alert(
      'Tham gia đội',
      'Vui lòng xác nhận bạn muốn tham gia đôin này!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Xác Nhận',
          onPress: () => {
            this.joinAPI();
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    const { item } = this.state;
    return (
      <TouchableOpacity
        onPress={this.joinTeam}
        style={{
          width: width * 0.8,
          height: 120,
          borderColor: Colors.appColor,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: 20,
          marginBottom: 10,
        }}>
        <Text>Đội: {item.name}</Text>
        <Text>
          Ngày lập:{' '}
          {moment(item.created_at, 'YYYY-MM-DD HH-mm-ss').format('DD/MM/YYYY')}
        </Text>
        <Text>Đội trưởng: {item.leaderName}</Text>
        <Text>Khu vực hoạt động: {item.address}</Text>
        <Text>Số lượng thành viên: {item.knight.length}</Text>
      </TouchableOpacity>
    );
  }
}

export default Team;
