import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Linking } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { APIGetListTeam } from '../../../Services/APIGetListTeam';
import { MESSAGES } from '../../../Utils/Constants';
import { Colors } from '../../../Themes';

export class WaitingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamId: this.props.navigation.state.params.teamId,
      teamData: '',
      spinner: true,
      isLeader: this.props.navigation.state.params.isLeader,
    };
  }

  async componentDidMount() {
    let responseStatus = await APIGetListTeam(this.state.teamId);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      this.setState({
        teamData: responseStatus.data,
        spinner: false,
      });
    } else {
      this.setState({
        spinner: false,
      });
      alert('Có lỗi. Vui lòng thử lại sau!');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{ color: '#fff' }}
          size="large"
        />
        {this.state.spinner === true ? null : this.state.isLeader === 0 ? (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              Bạn đã yêu cầu tham gia {'\n'}nhóm {this.state.teamData.name}
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 20 }}>
              Vui lòng liên hệ nhóm trưởng {this.state.teamData.leaderName}
              {'\n'} để yêu cầu gia nhập
            </Text>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: Colors.appColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 10,
              }}
              onPress={() =>
                Linking.openURL(`tel:${this.state.teamData.leaderId}`)
              }>
              <Text style={{ color: 'white' }}>Gọi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignInScreen')}>
              <Text
                style={{
                  color: Colors.appColor,
                  textDecorationLine: 'underline',
                  marginTop: 20,
                }}>
                Trở về trang đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 20, textAlign: 'center' }}>
              Bạn đã yêu cầu tạo {'\n'}nhóm {this.state.teamData.name}
            </Text>
            <Text style={{ fontSize: 15, textAlign: 'center', marginTop: 20 }}>
              Vui lòng liên hệ quản lý để yêu cầu xác nhận
            </Text>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
                backgroundColor: Colors.appColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
                borderRadius: 10,
              }}
              onPress={() => Linking.openURL('tel:0971930498')}>
              <Text style={{ color: 'white' }}>Gọi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignInScreen')}>
              <Text
                style={{
                  color: Colors.appColor,
                  textDecorationLine: 'underline',
                  marginTop: 20,
                }}>
                Trở về trang đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default WaitingScreen;
