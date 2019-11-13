import React from 'react';
import Menu, { MenuItem } from 'react-native-material-menu';
import { Image, TouchableOpacity, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';

import { APICloseCase } from '../Services/APICloseCase';
import { APILeaveCase } from '../Services/APILeaveCase';

import { MESSAGES } from '../Utils/Constants';
import { Colors } from '../Themes';

export default class HeaderMenu extends React.Component<props> {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      phoneNumber: this.props.phoneNumber,
      latitude: '',
      longitude: '',
    };
  }

  componentDidMount() {
    this.watchLocation();

    console.log('item ' + JSON.stringify(this.state.item));
    console.log('phoneNumber ' + JSON.stringify(this.state.phoneNumber));
  }

  watchLocation = () => {
    this.watchID = Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('item ' + JSON.stringify(position.coords));

        this.setState({
          latitude,
          longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  caseSuccess = async () => {
    const { phoneNumber, longitude, latitude, item } = this.state;
    console.log(
      phoneNumber + ' ' + 2 + ' ' + longitude + ' ' + latitude + ' ' + item.id,
    );
    let responseStatus = await APICloseCase(
      phoneNumber,
      longitude,
      latitude,
      2,
      item.id,
    );
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      alert('Đóng thành công');
      this.props.navigation.navigate('SOSScreen');
    } else {
      alert('Không gửi được. Vui lòng thử lại sau');
    }
  };

  caseFailed = async () => {
    const { phoneNumber, longitude, latitude, item } = this.state;
    console.log(
      phoneNumber + ' ' + 2 + ' ' + longitude + ' ' + latitude + ' ' + item.id,
    );
    let responseStatus = await APICloseCase(
      phoneNumber,
      longitude,
      latitude,
      3,
      item.id,
    );
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      alert('Đóng thành công');
      this.props.navigation.navigate('SOSScreen');
    } else {
      alert('Không gửi được. Vui lòng thử lại sau');
    }
  };

  leaveCase = () => {
    const { phoneNumber, item } = this.state;
    console.log(phoneNumber + ' ' + 2 + ' ' + ' ' + item.id);

    Alert.alert(
      'Rời Sự Cố',
      'Vui lòng xác nhận bạn muốn rời khỏi sự cố!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Xác Nhận',
          onPress: async () => {
            let responseStatus = await APILeaveCase(phoneNumber, item.id);
            if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
              console.log(JSON.stringify(responseStatus));
              alert('Bạn đã rời khỏi sự cố');
              this.props.navigation.navigate('SOSScreen');
            } else {
              alert('Không gửi được. Vui lòng thử lại sau');
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  voiceCall = () => {
    this._menu.hide();

    this.props.navigation.navigate('SOSVoiceChatScreen');
  };

  closeCase = () => {
    this.watchLocation();
    Alert.alert(
      'Đóng Sự Cố',
      'Vui lòng xác nhận trạng thái của sự cố!',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Thất Bại',
          onPress: () => {
            this.caseFailed();
          },
          style: 'cancel',
        },
        {
          text: 'Thành Công',
          onPress: () => {
            this.caseSuccess();
          },
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    return (
      <Menu
        ref={ref => (this._menu = ref)}
        button={
          <TouchableOpacity
            onPress={() => this._menu.show()}
            style={{
              paddingHorizontal: 16,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Feather name="more-vertical" color={Colors.appColor} size={30} />
          </TouchableOpacity>
        }>
        <MenuItem textStyle={{ color: '#000', fontSize: 16 }}>
          Thông tin sự cố
        </MenuItem>
        <MenuItem
          onPress={this.leaveCase}
          textStyle={{ color: '#000', fontSize: 16 }}>
          Rời sự cố
        </MenuItem>
        <MenuItem
          onPress={this.closeCase}
          textStyle={{ color: '#000', fontSize: 16 }}>
          Đóng sự cố
        </MenuItem>
      </Menu>
    );
  }
}
