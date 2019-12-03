import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './MenuScreenStyles';
import { APIRemoveToken } from '../../../Services/APIRemoveToken';

export class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { phoneNumber: '', user: {} };
  }

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let user = await AsyncStorage.getItem('USER');
    this.setState({ user: JSON.parse(user), phoneNumber: phoneNumber });
  }

  logout = async () => {
    try {
      await firebase.auth().signOut();
      AsyncStorage.clear();
      let responseStatus = await APIRemoveToken(this.state.phoneNumber);

      this.props.navigation.navigate('AuthNavigator');
    } catch (e) {
      alert('Có lỗi');
    }
  };

  refresh = data => {
    this.setState(prevState => {
      let user = Object.assign({}, prevState.user); // creating copy of state variable jasper
      user.name = data; // update the name property, assign a new value
      return { user }; // return new object jasper object
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewAccount}>
          <View style={styles.viewAccountInfo}>
            <View style={styles.mediaView}>
              <Icon name="user" size={35} color="#ffffff" />
            </View>
            <View style={styles.viewName}>
              <Text style={styles.textName}>{this.state.user.name}</Text>
              <Text style={styles.textPhone}>{this.state.user.id}</Text>
            </View>
          </View>
        </View>
        <ScrollView style={styles.viewSetting}>
          <View style={styles.viewBasic}>
            <Text style={styles.textSettingTitle}>Chức năng</Text>
            <View style={styles.viewFunctionBasic}>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() =>
                  this.props.navigation.navigate('FeedBackScreen')
                }>
                <Icon name="comment" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Gửi feedback</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() => this.props.navigation.navigate('PoliceScreen')}>
                <Icon name="address-book" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Danh sách cảnh sát</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.textSettingTitle}>Tài khoản</Text>
            <View style={styles.viewFunctionInfo}>
              <TouchableOpacity
                style={styles.viewTouch}
                onPress={() =>
                  this.props.navigation.navigate('UpdateProfileScreen', {
                    onGoBack: this.refresh,
                  })
                }>
                <Icon name="user" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Xem thông tin chi tiết</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewTouch} onPress={this.logout}>
                <Icon name="sign-out" size={30} style={styles.iconStyle} />
                <Text style={styles.textTouch}>Đăng xuất</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default MenuScreen;
