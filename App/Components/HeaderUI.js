import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ApplicationStyles from '../Themes/ApplicationStyles';

export default class HeaderUI extends Component {
  render() {
    return (
      <View style={ApplicationStyles.headerView}>
        <Text style={ApplicationStyles.headerText}>Khởi tạo thông tin</Text>
      </View>
    );
  }
}
