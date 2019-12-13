import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Linking,
  Platform,
} from 'react-native';
import MapView, { Marker, Callout, AnimatedRegion } from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoder';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import Sound from 'react-native-sound';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';

import { MESSAGES } from '../../../Utils/Constants';
import { APIConfirmCase } from '../../../Services/APIConfirmCase';

import { CustomCallout } from '../../../Components';

import styles from './SOSDetailScreenStyles';
import { Colors, Images } from '../../../Themes';
import FirebaseService from '../../../Services/FirebaseService';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE = 10.782546;
const LONGITUDE = 106.650416;

export class SOSDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: false,
      isMapReady: false,
      item: this.props.navigation.state.params.item,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      latitude: parseFloat(
        this.props.navigation.state.params.item.startLatitude,
      ),
      longitude: parseFloat(
        this.props.navigation.state.params.item.startLongitude,
      ),
      address: '',
      message: this.props.navigation.state.params.item.message,
      isModalVisible: false,
      markerCoordinates: [],
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
      user: {},
    };
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  getAddressFromPosition = () => {
    let position = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };
    // alert(JSON.stringify(position));

    Geocoder.geocodePosition(position)
      .then(res => {
        this.setState({ address: res[0].formattedAddress });
      })
      .catch(err => console.log(err));
  };

  joinMessage = () => {
    const { phoneNumber, item } = this.state;

    this.props.navigation.navigate('SOSMessageScreen', {
      item: item,
      phoneNumber: phoneNumber,
    });
  };

  joinCase = async () => {
    const { phoneNumber, item } = this.state;
    this.setState({ spinner: true });
    let responseStatus = await APIConfirmCase(phoneNumber, item.id);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log(JSON.stringify(responseStatus));
      this.setState(prevState => ({
        case: responseStatus.data,
        spinner: false,
        phoneNumber: phoneNumber,
        item: {
          ...prevState.item, // keep all other key-value pairs
          status: 1,
          inCase: true,
        },
      }));
      this.props.navigation.navigate('SOSMessageScreen', {
        item: item,
        phoneNumber: phoneNumber,
      });
    } else {
      this.setState({
        spinner: false,
        phoneNumber: phoneNumber,
      });
      alert('Vui lòng thử lại sau!!!!');
    }
  };

  ignore = () => {
    alert('Từ Chối');
  };

  async componentDidMount() {
    this.getAddressFromPosition();
    let user = await AsyncStorage.getItem('USER');
    this.setState({ user: JSON.parse(user) });
    FirebaseService.setMyInCaseID(
      'knight/caseID/' + this.state.item.id + '/' + this.state.phoneNumber,
    );
    FirebaseService.setCaseID('knight/caseID/' + this.state.item.id);
    FirebaseService.trackingLocationInCase(location => {
      let data = location.message !== null ? location.message : null;
      let listLocation = [];
      console.log(JSON.stringify(data));
      if (data != null) {
        listLocation = Object.entries(data).map(([key, value]) => {
          let lastItem = Object.values(value).length - 1;
          console.log(lastItem);
          return {
            key,
            value: Object.values(value)[0],
          };
        });
        listLocation = listLocation.filter(
          item => item.key !== this.state.phoneNumber,
        );
        console.log(listLocation);
      }

      this.setState({
        markerCoordinates: listLocation,
      });
    });
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () =>
      this.onRefresh(),
    );
    if (this.state.item.inCase === true) {
      this.watchLocation();
    }
  }
  async onRefresh() {
    let user = await AsyncStorage.getItem('USER');
    this.setState({ user: JSON.parse(user) });
  }

  watchLocation = () => {
    const { coordinate } = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude: latitude,
          longitude: longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker2) {
            this.marker2._component.animateMarkerToCoordinate(
              newCoordinate,
              500,
            ); // 500 is the duration to animate the marker
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }
        // FirebaseService.sendLocationInCase(newCoordinate, this.state.user);

        this.setState({
          coordinate: {
            latitude,
            longitude,
          },
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
        distanceFilter: 30,
        interval: 30000,
      },
    );
  };

  renderMarkers = markerCoordinates => {
    return markerCoordinates.map((data, index) => {
      var coord = {
        latitude: data.value.latitude,
        longitude: data.value.longitude,
      };
      return (
        <MapView.Marker
          key={index}
          centerOffset={{ x: 25, y: 25 }}
          anchor={{ x: 0.5, y: 0.5 }}
          coordinate={coord}
          title={`Truck ${index}`}>
          <Image source={Images.logoApp} style={{ width: 20, height: 20 }} />
          <Callout onPress={() => Linking.openURL(`tel:${data.value.user.id}`)}>
            <View style={{ width: 170 }}>
              <Text style={{ fontSize: 18 }}>Thông tin hiệp sĩ</Text>
              <Text>Hiệp sĩ: {data.value.user.name}</Text>
              <Text>Liên hệ: {data.value.user.id}</Text>
            </View>
          </Callout>
        </MapView.Marker>
      );
    });
  };

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible });

  render() {
    const { longitude, latitude, markerCoordinates } = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{ color: '#fff' }}
          size="large"
        />

        <Modal
          isVisible={this.state.isModalVisible}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={800}
          backdropTransitionOutTiming={800}>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ScrollView
              contentContainerStyle={
                this.state.item.image === null && this.state.item.sound === null
                  ? { justifyContent: 'center', flex: 1 }
                  : {
                      justifyContent: 'center',
                    }
              }
              style={{ flex: 1, width: width * 0.9, backgroundColor: 'white' }}>
              <View
                style={
                  this.state.item.image === null &&
                  this.state.item.sound === null
                    ? {
                        alignSelf: 'center',
                        width: width * 0.8,
                        justifyContent: 'center',
                      }
                    : {
                        alignSelf: 'center',
                        width: width * 0.8,
                        justifyContent: 'center',
                        marginBottom: 20,
                        marginTop: 20,
                      }
                }>
                <Text style={{ fontSize: 20 }}>Thông tin tín hiệu</Text>
                <Text style={{ fontSize: 15, marginTop: 10 }}>
                  Người gửi: {this.state.item.user.name}
                </Text>
                <Text style={{ fontSize: 15, marginTop: 10 }}>
                  Liên hệ: {this.state.item.user.id}
                </Text>
                <Text style={{ fontSize: 15, marginTop: 10 }}>
                  Địa chỉ: {this.state.address}
                </Text>
                <Text style={{ fontSize: 15, marginTop: 10 }}>
                  Tin nhắn: {this.state.item.message}
                </Text>
                {this.state.item.image === null ? null : (
                  <Image
                    style={styles.avatar}
                    source={{ uri: this.state.item.image }}
                    resizeMode="contain"
                  />
                )}

                {this.state.item.sound && (
                  <TouchableOpacity
                    style={{
                      marginTop: 10,
                      width: 150,
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: Colors.appColor,
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      console.log(
                        JSON.stringify(this.state.item.sound) + ' props ne',
                      );

                      this.setState({
                        playAudio: true,
                      });

                      const sound = new Sound(
                        this.state.item.sound,
                        '',
                        error => {
                          if (error) {
                            console.log('failed to load the sound', error);
                          }
                          sound.play(success => {
                            this.setState({ playAudio: false });

                            console.log(success, 'success play');
                            if (!success) {
                              Alert.alert(
                                'There was an error playing this audio',
                              );
                            }
                          });
                        },
                      );
                    }}>
                    <Ionicons
                      name="ios-play"
                      size={50}
                      color={this.state.playAudio ? 'red' : 'white'}
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    alignSelf: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: width * 0.8,
                    alignItems: 'center',
                    marginTop: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`tel:${this.state.item.user.id}`)
                    }
                    style={styles.callButton}>
                    <Text style={styles.buttonText}>Gọi người gửi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this._toggleModal}
                    style={styles.ignoreButton}>
                    <Text style={styles.buttonText}>Đóng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          onLayout={this.onMapLayout}
          region={this.getMapRegion()}>
          {this.renderMarkers(markerCoordinates)}
          <Marker.Animated
            coordinate={this.state.coordinate}
            ref={marker => {
              this.marker2 = marker;
            }}>
            <Image source={Images.logoApp} style={{ width: 20, height: 20 }} />
          </Marker.Animated>
          {this.state.isMapReady && (
            <Marker
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={{ longitude, latitude }}>
              <Callout onPress={this._toggleModal}>
                <Text style={{ fontSize: 18 }}>Thông tin tín hiệu</Text>
                <Text>Người gửi: {this.state.item.user.name}</Text>
                <Text>Liên hệ: {this.state.item.user.id}</Text>
                <Text
                  style={{
                    color: Colors.appColor,
                    textDecorationLine: 'underline',
                    alignSelf: 'center',
                  }}>
                  Xem Thêm
                </Text>
              </Callout>
            </Marker>
          )}
        </MapView>
        {(this.state.item.status !== MESSAGES.CASE.SUCCESSED ||
          this.state.item.status !== MESSAGES.CASE.FAILED) &&
        this.state.item.inCase === false &&
        this.state.item.citizenId !== this.state.phoneNumber ? (
          <View style={styles.viewButton}>
            <TouchableOpacity onPress={this.joinCase} style={styles.joinButton}>
              <Text style={styles.buttonText}>Tham Gia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.ignore} style={styles.ignoreButton}>
              <Text style={styles.buttonText}>Từ Chối</Text>
            </TouchableOpacity>
          </View>
        ) : this.state.item.status === MESSAGES.CASE.SUCCESSED ? (
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={this.joinMessage}
              style={styles.joinButton}>
              <Text style={styles.buttonText}>Trò Chuyện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CaseReportScreen', {
                  item: this.state.item,
                })
              }
              style={styles.joinButton}>
              <Text style={styles.buttonText}>Báo cáo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.viewButton}>
            <TouchableOpacity
              onPress={this.joinMessage}
              style={styles.joinButton}>
              <Text style={styles.buttonText}>Trò Chuyện</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default SOSDetailScreen;
