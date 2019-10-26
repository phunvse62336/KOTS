import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase';

import AsyncStorage from '@react-native-community/async-storage';

export class MenuScreen extends Component {
  constructor(props) {
    super(props);
  }

  logout = async () => {
    try {
      await firebase.auth().signOut();
      AsyncStorage.clear();
      this.props.navigation.navigate('AuthNavigator');
    } catch (e) {
      alert('Có lỗi');
    }
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MenuScreen;
