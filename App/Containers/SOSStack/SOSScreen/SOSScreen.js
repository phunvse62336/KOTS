import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';

import {HeaderUI, CaseView} from '../../../Components';
import {MESSAGES} from '../../../Utils/Constants';
import {APIGetCase} from '../../../Services/APIGetCase';

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
    phoneNumber: '+84971930497',
    location: {
      latitude: 10.808143,
      longitude: 106.678754,
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
    phoneNumber: '+84971930496',
    location: {
      latitude: 10.811137,
      longitude: 106.675836,
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
    phoneNumber: '+84971930495',
    location: {
      latitude: 10.8009887,
      longitude: 106.6967738,
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
    phoneNumber: '+84971930494',
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
    this.state = {spinner: true, case: [], phoneNumber: ''};
  }

  componentDidMount = async () => {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let responseStatus = await APIGetCase(phoneNumber);

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({case: responseStatus.data, spinner: false});
    } else {
      this.setState({
        spinner: false,
      });
      alert('Vui lòng thử lại sau!!!!');
    }
  };

  _renderItem = ({item, index}) => (
    <CaseView item={item} index={index} navigation={this.props.navigation} />
  );

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <HeaderUI title="Danh Sách Sự Cố" />
        {this.state.spinner === true ? (
          <Spinner
            visible={this.state.spinner}
            textContent={'Đang Xử Lý'}
            textStyle={{color: '#fff'}}
            size="large"
          />
        ) : (
          <FlatList
            data={this.state.case}
            extraData={this.state}
            showsVerticalScrollIndicator={false}
            renderItem={this._renderItem}
          />
        )}
      </View>
    );
  }
}

export default SOSScreen;
