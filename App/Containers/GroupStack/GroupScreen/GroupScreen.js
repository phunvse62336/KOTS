import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { HeaderUI, Member } from '../../../Components';
import { Colors } from '../../../Themes';
const { width, height } = Dimensions.get('window');

const DATA = [
  {
    id: 1,
    name: 'Nguyễn A',
    address: '12/1B ABC, Quận 1, TP.HCM',
    dob: '19',
    role: 1,
    phone: '+84971930498',
  },
  {
    id: 2,
    name: 'Nguyễn B',
    address: '12/1B ABC, Quận 2, TP.HCM',
    dob: '19',
    role: 0,
    phone: '+84971930499',
  },
  {
    id: 3,
    name: 'Nguyễn C',
    address: '12/1B ABC, Quận 3, TP.HCM',
    dob: '19',
    role: 0,
    phone: '+84971930412',
  },
  {
    id: 4,
    name: 'Nguyễn D',
    address: '12/1B ABC, Quận 4, TP.HCM',
    dob: '19',
    role: 0,
    phone: '+84971930444',
  },
  {
    id: 5,
    name: 'Nguyễn E',
    address: '12/1B ABC, Quận 5, TP.HCM',
    dob: '19',
    role: 0,
    phone: '+84971930498',
  },
];

export class GroupScreenStyles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  _renderItem = ({ item, index }) => <Member item={item} />;

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        <HeaderUI title="Tổ Đội" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: width * 0.95, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Đội: </Text>
            <Text style={{ fontSize: 20 }}>Hiệp sĩ quận 9</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Ngày Sáng Lập:{' '}
            </Text>
            <Text style={{ fontSize: 20 }}>13/08/2019</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Người sáng lập:{' '}
            </Text>
            <Text style={{ fontSize: 20 }}>phuprovip51</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Số lượng thành viên:{' '}
            </Text>
            <Text style={{ fontSize: 20 }}>4</Text>
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
            data={DATA}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item}
            renderItem={this._renderItem}
            style={{ alignSelf: 'center' }}
          />
        </ScrollView>
      </View>
    );
  }
}

export default GroupScreenStyles;
