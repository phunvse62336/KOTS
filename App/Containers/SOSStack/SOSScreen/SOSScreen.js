import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Modal from 'react-native-modal';

import { HeaderUI, CaseView } from '../../../Components';
import { MESSAGES } from '../../../Utils/Constants';
import { APIGetCase } from '../../../Services/APIGetCase';
import NavigationService from '../../../Services/NavigationService';

const { width, height } = Dimensions.get('window');

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
      item: this.props.navigation.getParam('item', null),
      isModalVisible: false,
      renderCase: [],
      filterName: 'Tất Cả',
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
        renderCase: responseStatus.data,
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
    // alert(JSON.stringify(this.state.item));
    // if (this.state.item !== null) {
    //   NavigationService.navigate('SOSDetailScreen', {
    //     item: this.state.item,
    //     phoneNumber: phoneNumber,
    //   });
    // }
    const { navigation } = this.props;
    //Adding an event listner om focus
    //So whenever the screen will have focus it will set the state to zero
    this.focusListener = navigation.addListener('didFocus', () =>
      this.onRefresh(),
    );
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  _renderItem = ({ item, index }) => (
    <CaseView
      item={item}
      index={index}
      navigation={this.props.navigation}
      phoneNumber={this.state.phoneNumber}
    />
  );

  async onRefresh() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
    let responseStatus = await APIGetCase(phoneNumber);

    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState({
        case: responseStatus.data,
        renderCase: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
        isRefreshing: false,
        filterName: 'Tất Cả',
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
        isRefreshing: false,
      });
      alert('Vui lòng thử lại sau!!!!');
    }

    // if (this.state.item !== null) {
    //   NavigationService.navigate('SOSDetailScreen', {
    //     item: this.state.item,
    //     phoneNumber: phoneNumber,
    //   });
    // }
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  filterList = filter => {
    const listCase = this.state.case;
    if (filter === 5) {
      this.setState({
        renderCase: listCase,
        filterName: 'Tất Cả',
        isModalVisible: false,
      });
    } else {
      const filterCase = listCase.filter(data => {
        if (filter === 1 || filter === 4) {
          return data.status === 1 || data.status === 4;
        } else {
          return data.status === filter;
        }
      });
      var listName = '';
      if (filter === 0) {
        listName = 'Chưa xử lý';
      } else if (filter === 1 || filter === 4) {
        listName = 'Đang xử lý';
      } else if (filter === 2) {
        listName = 'Thành Công';
      } else if (filter === 3) {
        listName = 'Thất Bại';
      }
      this.setState({
        renderCase: filterCase,
        filterName: listName,
        isModalVisible: false,
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <HeaderUI title="Danh Sách Sự Cố" />
        <Modal
          isVisible={this.state.isModalVisible}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                flex: 0.7,
                width: width * 0.8,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: width * 0.8,
                  height: 44,
                  backgroundColor: '#91b1db',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    width: 44,
                    height: 44,
                    justifyContent: 'center',
                    marginLeft: 10,
                  }}
                  onPress={this._toggleModal}>
                  <FontAwesome name="close" color="black" size={35} />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Bộ Lọc</Text>
                <View style={{ width: 44, height: 44 }} />
              </View>
              <View style={{ width: width * 0.7, justifyContent: 'center' }}>
                <TouchableOpacity
                  style={{
                    width: width * 0.7,
                    height: 44,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                  }}
                  onPress={() => this.filterList(5)}>
                  <Text>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width * 0.7,
                    height: 44,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                  }}
                  onPress={() => this.filterList(0)}>
                  <Text>Chưa xử lý</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width * 0.7,
                    height: 44,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                  }}
                  onPress={() => this.filterList(1)}>
                  <Text>Đang xử lý</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width * 0.7,
                    height: 44,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                  }}
                  onPress={() => this.filterList(2)}>
                  <Text>Thành công</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: width * 0.7,
                    height: 44,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    justifyContent: 'center',
                  }}
                  onPress={() => this.filterList(3)}>
                  <Text>Thất bại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {this.state.spinner === true ? (
          <Spinner
            visible={this.state.spinner}
            textContent={'Đang Xử Lý'}
            textStyle={{ color: '#fff' }}
            size="large"
          />
        ) : (
          <ScrollView
            style={{
              marginTop: 10,
              width: width * 0.9,
            }}
            showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              onPress={this._toggleModal}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}>
              <Feather name="filter" size={30} color="black" />
              <Text style={{ fontSize: 17 }}>
                {this.state.filterName}: ({this.state.renderCase.length})
              </Text>
            </TouchableOpacity>
            <FlatList
              data={this.state.renderCase}
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
          </ScrollView>
        )}
      </View>
    );
  }
}

export default SOSScreen;
