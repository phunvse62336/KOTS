import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../Themes';

import moment from 'moment';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonView: {
    height: 144,
    width: width * 0.9,
    borderColor: Colors.appColor,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  viewTextContainer: { marginLeft: 10 },
  textName: {
    fontSize: 20,
    color: Colors.appColor,
    fontWeight: 'bold',
  },
  viewText: { flexDirection: 'row' },
});

export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity style={styles.buttonView}>
        <View style={styles.viewIcon}>
          <FontAwesome name="user" size={70} color="white" />
        </View>
        <View style={styles.viewTextContainer}>
          <Text style={styles.textName}>{item.name}</Text>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: 'bold' }}>Điện thoại: </Text>
            <Text>{item.id}</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: 'bold' }}>Tuổi: </Text>
            <Text>{item.dateOfBirth}</Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: 'bold' }}>Địa chỉ: </Text>
            <Text style={{ width: width * 0.38 }} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
          <View style={styles.viewText}>
            <Text style={{ fontWeight: 'bold' }}>Chức vụ: </Text>
            <Text
              style={{
                color:
                  item.id === this.props.leaderId ? Colors.appColor : 'black',
              }}>
              {item.id === this.props.leaderId ? 'Đội trưởng' : 'Đội viên'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
