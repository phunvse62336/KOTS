import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import { Colors } from '../../../Themes';
import { Team } from '../../../Components';
import { MESSAGES } from '../../../Utils/Constants';
import { APIGetListTeam } from '../../../Services/APIGetListTeam';
const { width, height } = Dimensions.get('screen');

const LIST_TEAM = [
  {
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
  },
  {
    id: 2,
    leaderId: '0971930499',
    name: 'Siêu nhân cuồng phong',
    created_at: '2019-11-08 19:00:00',
    updated_at: '2019-11-08 19:00:00',
    address: 'Quận 9, Hồ Chí Minh',
    leaderName: 'Bất Động Sản 55',
    knight: [
      {
        id: '0971930999',
        name: 'Provip51',
        address: 'A c',
        status: 0,
        gender: '1',
        dateOfBirth: '2015-11-08',
        token:
          'f4t05V-DeuY:APA91bFzQLC2ApktI2HChvy4HYtWjO_ximk8FjieQE-LBloaTHO5XFbNOs0RmiYwVDkdrwc8KIRR_6OOrF6zdtT5KauA8AtWy6BPBwOe75vAwN14KVi0C6-IehBWQIaJXKJbZ_CTQWzV',
        isDisable: 0,
        role: 2,
        image: 'images/default-avatar.png',
        isFirstLogin: 0,
        team_id: 2,
        password: null,
        created_at: '2019-11-08 13:27:53',
        updated_at: '2019-11-08 15:43:20',
      },
    ],
  },
];

export class JoinTeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listTeam: [],
      spinner: false,
      phoneNumber: '',
      token: '',
    };
  }

  spinnerLoading = () => {
    this.setState({ spinner: !this.state.spinner });
  };

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    this.setState({ spinner: true });
    let responseStatus = await APIGetListTeam(null);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      this.setState({
        listTeam: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
        token: fcmToken,
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
        token: fcmToken,
      });
      alert('Không thể tải danh sách dội. Vui lòng thử lại sau!');
    }
  }

  _renderItem = ({ item, index }) => (
    <Team
      navigation={this.props.navigation}
      item={item}
      index={index}
      phoneNumber={this.state.phoneNumber}
      spinnerLoading={this.spinnerLoading}
      token={this.state.token}
    />
  );

  render() {
    return (
      <View
        style={{
          flex: 1,
          width,
          alignItems: 'center',
        }}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{ color: '#fff' }}
          size="large"
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.appColor,
            marginTop: 20,
          }}>
          {' '}
          Vui lòng chọn một đội để tham gia{' '}
        </Text>

        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <FlatList
            data={this.state.listTeam}
            renderItem={this._renderItem}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default JoinTeamScreen;
