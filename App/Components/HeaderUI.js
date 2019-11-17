import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-community/async-storage';

import { ApplicationStyles, Colors } from '../Themes/';
import { APIRequestLeave } from '../Services/APIRequestLeave';
import { MESSAGES } from '../Utils/Constants';
export default class HeaderUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: false,
      isLeader: false,
      leaderId: this.props.leaderId || '',
      phoneNumber: '',
      user: '',
    };
  }

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let user = await AsyncStorage.getItem('USER');
    let userJson = JSON.parse(user);

    if (this.state.leaderId === phoneNumber) {
      this.setState({
        isLeader: true,
        phoneNumber: phoneNumber,
        user: userJson,
      });
    } else {
      this.setState({
        phoneNumber: phoneNumber,
        user: userJson,
      });
    }
  }

  leave = async () => {
    if (this.state.user.status !== 3) {
      let responseStatus = await APIRequestLeave(this.state.phoneNumber);
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        await AsyncStorage.setItem('USER', JSON.stringify(responseStatus.data));
        this.setState({ user: responseStatus.data });
        alert('Yêu cầu rời khỏi nhóm thành công!!!');
      } else {
        alert('Có lỗi. Vui lòng thử lại sau!!!!');
      }
    } else {
      alert('Bạn đã yêu cầu rời nhóm. Vui lòng đời nhóm trưởng chấp nhận!!!');
    }
  };

  render() {
    return (
      <View
        style={{
          height: 56,
          width: '100%',
          alignItems: 'center',
          justifyContent:
            this.props.title === 'Tổ Đội' ? 'space-between' : 'center',
          paddingLeft: 16,
          paddingRight: 15,
          elevation: 2,
          backgroundColor: 'white',
          flexDirection: 'row',
        }}>
        {this.props.title === 'Tổ Đội' ? (
          <View style={{ width: 100 }}>
            <Text style={{ color: 'white' }}>ABC</Text>
          </View>
        ) : null}
        <Text
          style={{ color: Colors.appColor, fontWeight: 'bold', fontSize: 20 }}>
          {this.props.title}
        </Text>
        {this.props.title === 'Tổ Đội' ? (
          <View
            style={{
              flexDirection: 'row',
              width: 100,
              justifyContent: 'flex-end',
            }}>
            {this.state.isLeader === true ? (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() =>
                  this.props.navigation.navigate('RequestScreen', {
                    teamId: this.props.teamId,
                  })
                }>
                <MaterialIcons name="email" color={Colors.appColor} size={25} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={this.leave}>
                <Feather name="log-out" color={Colors.appColor} size={25} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('MesssageGroupScreen')
              }>
              <Feather
                name="message-circle"
                color={Colors.appColor}
                size={25}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ height: 56 }}>
            <Text style={{ color: 'white' }}>ABC</Text>
          </View>
        )}
      </View>
    );
  }
}
