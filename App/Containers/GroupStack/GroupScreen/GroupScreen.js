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
    <Member item={item} phone={this.state.phoneNumber} />
  );

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let user = await AsyncStorage.getItem('USER');
    let userJson = JSON.parse(user);
    let responseStatus = await APIGetListTeam(userJson.team_id);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      this.setState({
        phoneNumber: phoneNumber,
        user: userJson,
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
          isLeader={this.state.user.isLeader}
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
