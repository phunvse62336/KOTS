import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { Colors } from '../Themes';
import { MESSAGES } from '../Utils/Constants';
import { APIApproveKnight } from '../Services/APIApproveKnight';
import { APIIgnoreKnight } from '../Services/APIIgnoreKnight';

const { width, height } = Dimensions.get('screen');
const GenderData = ['Nữ', 'Nam', 'Khác'];

export class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      action: this.props.requestAction,
      //action = 0 => join
      //action = 1 => leave
    };
  }

  approve = async () => {
    if (this.state.action === 0) {
      let responseStatus = await APIApproveKnight(
        this.state.item.id,
        'join',
        1,
      );
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        this.props.removeItemJoin(this.state.item.id);
        alert(
          'Đã thêm thành công hiệp sĩ ' + this.state.item.name + ' vào đội',
        );
      } else {
        alert('Có lỗi. Vui lòng thử lại sau!!!');
      }
    } else {
      let responseStatus = await APIApproveKnight(
        this.state.item.id,
        'leave',
        0,
      );
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        this.props.removeItemLeave(this.state.item.id);
        alert('Đã loại hiệp sĩ ' + this.state.item.name + ' ra khỏi đội');
      } else {
        alert('Có lỗi. Vui lòng thử lại sau!!!');
      }
    }
  };

  ignore = async () => {
    if (this.state.action === 0) {
      let responseStatus = await APIIgnoreKnight(this.state.item.id, 'join', 0);
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        this.props.removeItemJoin(this.state.item.id);
        alert('Từ chối yêu cầu tham gia của hiệp sĩ ' + this.state.item.name);
      } else {
        alert('Có lỗi. Vui lòng thử lại sau!!!');
      }
    } else {
      let responseStatus = await APIIgnoreKnight(
        this.state.item.id,
        'leave',
        1,
      );
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        this.props.removeItemLeave(this.state.item.id);
        alert('Từ chối yêu cầu rời khỏi của hiệp sĩ ' + this.state.item.name);
      } else {
        alert('Có lỗi. Vui lòng thử lại sau!!!');
      }
    }
  };

  render() {
    const { item } = this.state;
    return (
      <View
        style={{
          width: width * 0.9,
          justifyContent: 'center',
          height: 130,
          backgroundColor: 'white',
          borderColor: Colors.appColor,
          borderRadius: 10,
          borderWidth: 2,
          marginBottom: 10,
        }}>
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 15, marginTop: 5 }}>Tên: {item.name}</Text>
          <Text style={{ fontSize: 15, marginTop: 5 }}>
            Địa chỉ: {item.address}
          </Text>
          <Text style={{ fontSize: 15, marginTop: 5 }}>
            Giới tính: {GenderData[item.gender]}
          </Text>
        </View>
        <View
          style={{
            width: width * 0.9,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <TouchableOpacity onPress={this.approve}>
            <Text style={{ color: 'green' }}>Chấp Thuận</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.ignore}>
            <Text style={{ color: 'red' }}>Bỏ qua</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Request;
