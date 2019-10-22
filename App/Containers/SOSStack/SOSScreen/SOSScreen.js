import React, {Component} from 'react';
import {Text, View, FlatList, RefreshControl} from 'react-native';
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
    this.state = {
      spinner: true,
      case: [],
      phoneNumber: '',
      isRefreshing: false, //for pull to refresh
      messageRefresh: this.props.navigation.getParam('otherParam', ''),
    };
  }

  componentDidMount = async () => {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    let responseStatus = await APIGetCase(phoneNumber);
    console.log('BEFORE ' + JSON.stringify(responseStatus));

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        case: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
      });
      alert('Vui lòng thử lại sau!!!!');
    }
    const {navigation} = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () =>
      this.onRefresh(),
    );
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _renderItem = ({item, index}) => (
    <CaseView
      item={item}
      index={index}
      navigation={this.props.navigation}
      phoneNumber={this.state.phoneNumber}
    />
  );

  async onRefresh() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    this.setState({isRefreshing: true}); // true isRefreshing flag for enable pull to refresh indicator
    let responseStatus = await APIGetCase(phoneNumber);

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        case: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
        isRefreshing: false,
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
        isRefreshing: false,
      });
      alert('Vui lòng thử lại sau!!!!');
    }
  }

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
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
              />
            }
          />
        )}
      </View>
    );
  }
}

export default SOSScreen;
