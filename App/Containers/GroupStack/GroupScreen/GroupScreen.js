import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import { APIGetListTeam } from '../../../Services/APIGetListTeam';
import { MESSAGES } from '../../../Utils/Constants';

import { HeaderUI, Member } from '../../../Components';
import { Colors } from '../../../Themes';
const { width, height } = Dimensions.get('window');

const DATA = {
  id: 1,
  leaderId: '0971930498',
  name: 'Con Chim Non',
  created_at: '2019-11-08 19:00:00',
  updated_at: '2019-11-08 19:00:00',
  address: 'Gò Vấp, Hồ Chí Minh',
  leaderName: 'Hiệp sĩ trong tay có kiếm',
  knight: [
    {
      id: '0362293456',
      name: 'Nguyễn Phú Phát',
      address: 'Bình Phước, Hồ Chí Minh',
      status: 0,
      gender: 'male',
      dateOfBirth: null,
      token: '1234',
      isDisable: 0,
      role: 2,
      image: 'images/default-avatar.png',
      isFirstLogin: 0,
      team_id: 1,
      password: null,
      created_at: '2019-10-20 14:54:15',
      updated_at: '2019-10-20 14:54:15',
    },
    {
      id: '0906393976',
      name: 'Bất Động Sản',
      address: 'Hóc Môn, Hồ Chí Minh',
      status: 1,
      gender: 'male',
      dateOfBirth: '1997-12-10',
      token: '1234',
      isDisable: 0,
      role: 1,
      image: 'images/default-avatar.png',
      isFirstLogin: 0,
      team_id: 1,
      password: null,
      created_at: '2019-10-24 17:05:35',
      updated_at: '2019-11-05 07:31:40',
    },
    {
      id: '0971930444',
      name: 'Bds',
      address: 'Nds',
      status: 0,
      gender: '1',
      dateOfBirth: '1970-01-01',
      token: '',
      isDisable: 0,
      role: 2,
      image: 'images/default-avatar.png',
      isFirstLogin: 0,
      team_id: 1,
      password: null,
      created_at: '2019-11-08 13:14:14',
      updated_at: '2019-11-08 13:27:34',
    },
    {
      id: '0971930498',
      name: 'Hiệp sĩ trong tay có kiếm',
      address: 'Hóc Môn, Hồ Chí Minh',
      status: 2,
      gender: '1',
      dateOfBirth: '1997-03-10',
      token: '',
      isDisable: 0,
      role: 2,
      image: 'images/default-avatar.png',
      isFirstLogin: 0,
      team_id: 1,
      password: null,
      created_at: '2019-10-19 03:00:00',
      updated_at: '2019-11-11 13:58:22',
    },
  ],
};

export class GroupScreenStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      phoneNumber: '',
      user: {},
      spinner: true,
      isRefreshing: false,
    };
    this.focusListener = this.props.navigation.addListener('didFocus', () =>
      this.onRefresh(),
    );
  }

  _renderItem = ({ item, index }) => (
    <Member
      item={item}
      leaderId={this.state.data.leaderId}
      phone={this.state.phoneNumber}
    />
  );

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let user = await AsyncStorage.getItem('USER');
    let userJson = JSON.parse(user);
    let responseStatus = await APIGetListTeam(userJson.team_id);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      this.setState({
        phoneNumber: phoneNumber,
        user: JSON.parse(user),

        data: responseStatus.data,
        spinner: false,
      });
    } else {
      this.setState({
        phoneNumber: phoneNumber,
        user: JSON.parse(user),

        spinner: false,
      });
      alert('Không thể tải danh sách thành viên. Vui lòng thử lại sau!');
    }
  }

  async onRefresh() {
    let user = await AsyncStorage.getItem('USER');
    let userJson = JSON.parse(user);
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    let responseStatus = await APIGetListTeam(userJson.team_id);

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        data: responseStatus.data,
        isRefreshing: false,
      });
    } else {
      this.setState({
        isRefreshing: false,
      });
      alert('Vui lòng thử lại sau!!!!');
    }

    // if (this.state.item !== null) {
    //   NavigationService.navigate('SOSDetailScreen', {
    //     item: this.state.item,
    //     phoneNumber: phoneNumber,
    //   });
    // }
  }

  render() {
    const { data } = this.state;
    return this.state.data === null ? (
      <Spinner
        visible={this.state.spinner}
        textStyle={{ color: '#fff' }}
        size="large"
      />
    ) : (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <HeaderUI
          title="Tổ Đội"
          leaderId={this.state.data === null ? null : this.state.data.leaderId}
          navigation={this.props.navigation}
          teamId={this.state.data.id}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: width * 0.95, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đội: </Text>
            <Text style={{ fontSize: 20 }}>{this.state.data.name}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Ngày Sáng Lập:{' '}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {' '}
              {moment(this.state.data.created_at, 'YYYY-MM-DD HH-mm-ss').format(
                'DD/MM/YYYY',
              )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
              width: width * 0.95,
            }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Người sáng lập:{' '}
            </Text>
            <Text style={{ fontSize: 20, width: width * 0.5 }}>
              {this.state.data.leaderName}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Số lượng thành viên:{' '}
            </Text>
            <Text style={{ fontSize: 20 }}>
              {this.state.data.knight.length}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: Colors.appColor,
              marginTop: 20,
              marginBottom: 20,
              width: width * 0.8,
              alignSelf: 'center',
            }}
          />
          <FlatList
            data={this.state.data.knight}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item}
            renderItem={this._renderItem}
            style={{ alignSelf: 'center' }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        </ScrollView>
      </View>
    );
  }
}

export default GroupScreenStyles;
