import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';

import {HeaderUI, CaseView} from '../../../Components';

const CASE = [
  {
    id: 1,
    type: 'SOS',
    date: 'new Date()',
    name: 'Nguyen Van A',
    phoneNumber: '+84971930498',
    location: {
      latitude: 10.782546,
      longitude: 106.650416,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    status: 'Chưa Xử Lý',
  },
  {
    id: 2,
    type: 'Contact',
    date: 'new Date()',
    name: 'Nguyen Van B',
    phoneNumber: '+84971930498',
    location: {
      latitude: 10.782546,
      longitude: 106.650416,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    status: 'Chưa Xử Lý',
  },
  {
    id: 3,
    type: 'SOS',
    date: 'new Date()',
    name: 'Nguyen Van C',
    phoneNumber: '+84971930498',
    location: {
      latitude: 10.782546,
      longitude: 106.650416,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    status: 'Đang Xử Lý',
  },
  {
    id: 4,
    type: 'Contact',
    date: 'new Date()',
    name: 'Nguyen Van C',
    phoneNumber: '+84971930498',
    location: {
      latitude: 10.782546,
      longitude: 106.650416,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    status: 'Đã Xong',
  },
  {
    id: 5,
    type: 'Contact',
    date: 'new Date()',
    name: 'Nguyen Van C',
    phoneNumber: '+84971930498',
    location: {
      latitude: 10.782546,
      longitude: 106.650416,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    status: 'Đã Xong',
  },
];

export class SOSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      case: CASE,
    };
  }

  _renderItem = ({item, index}) => <CaseView item={item} index={index} />;

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <HeaderUI title="Danh Sách Sự Cố" />
        <FlatList
          data={CASE}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          renderItem={this._renderItem}
        />
      </View>
    );
  }
}

export default SOSScreen;
