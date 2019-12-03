import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { HeaderUI } from '../../../Components';
import { Colors } from '../../../Themes';
class JoinOrCreateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 20,
        }}>
        <Text
          style={{ color: Colors.appColor, fontSize: 18, fontWeight: 'bold' }}>
          Bạn chưa tham gia đội nào, vui lòng...
        </Text>
        <TouchableOpacity
          style={{
            width: 200,
            height: 44,
            backgroundColor: Colors.appColor,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => this.props.navigation.navigate('CreateTeamScreen')}>
          <Text style={{ color: 'white', fontSize: 15 }}>Tạo đội mới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 200,
            height: 44,
            backgroundColor: Colors.appColor,
            marginTop: 20,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => this.props.navigation.navigate('JoinTeamScreen')}>
          <Text style={{ color: 'white', fontSize: 15 }}>
            Tham gia đội có sẵn
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default JoinOrCreateScreen;
