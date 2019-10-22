import React from 'react';
import Menu, {MenuItem} from 'react-native-material-menu';
import {AsyncStorage, Image, Share, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {Colors} from '../Themes';

export default class HeaderMenu extends React.Component<props> {
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
        <MenuItem
          onPress={() => this.hideMenu()}
          textStyle={{color: '#000', fontSize: 16}}>
          Gọi đồng đội
        </MenuItem>
        <MenuItem textStyle={{color: '#000', fontSize: 16}}>
          Thông tin sự cố
        </MenuItem>
        <MenuItem textStyle={{color: '#000', fontSize: 16}}>Rời sự cố</MenuItem>
        <MenuItem
          onPress={() => this.LogoutUser()}
          textStyle={{color: '#000', fontSize: 16}}>
          Đóng sự cố
        </MenuItem>
      </Menu>
    );
  }
}
