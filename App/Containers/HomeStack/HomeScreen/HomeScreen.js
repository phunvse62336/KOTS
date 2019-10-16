import React, {Component} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Button,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import PubNubReact from 'pubnub-react';
import Geolocation from 'react-native-geolocation-service';
import {FloatingAction} from 'react-native-floating-action';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

import {Images} from '../../../Themes';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      toast: false,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0,
      }),
    };

    // Replace "X" with your PubNub Keys
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-f375e940-4c95-4b08-a2af-01feeb1f80c2',
      subscribeKey: 'sub-c-10a702e4-efe0-11e9-b715-9abbdb5d0da2',
    });
    this.pubnub.init(this);
  }

  componentDidMount() {
    this.watchLocation();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.latitude !== prevState.latitude) {
      this.pubnub.publish({
        message: {
          latitude: this.state.latitude,
          longitude: this.state.longitude,
        },
        channel: 'location',
      });
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  watchLocation = () => {
    const {coordinate} = this.state;

    this.watchID = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;

        const newCoordinate = {
          latitude,
          longitude,
        };

        if (Platform.OS === 'android') {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500,
            ); // 500 is the duration to animate the marker
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 30,
      },
    );
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  sendSOS = name => {
    if (name === 'bt_sos') {
      this.setState({spinner: true});
      setTimeout(() => {
        this.setState({spinner: false, toast: true});
      }, 2000);
      setTimeout(
        () =>
          this.setState({
            toast: false,
          }),
        5000,
      ); // hide toast after 5s
    } else {
    }
  };

  render() {
    const actions = [
      {
        text: 'Liên Hệ',
        icon: Images.phoneContact,
        name: 'bt_contact',
        position: 1,
        textColor: '#FFF',
        textBackground: 'transparent',
        textStyle: {fontSize: 18, fontWeight: 'bold'},
        buttonSize: 56,
        margin: 0,
        size: 50,
        textElevation: 0,
      },
      {
        text: 'Khẩn Cấp',
        color: '#FF2929',
        icon: Images.sosText,
        name: 'bt_sos',
        position: 2,
        textColor: '#fff',
        textBackground: 'transparent',
        textStyle: {fontSize: 18, fontWeight: 'bold'},
        buttonSize: 56,
        textElevation: 0,
        margin: 0,
        size: 50,
      },
    ];
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Đang Xử Lý'}
            textStyle={{color: '#fff'}}
            size="large"
          />
          <Toast
            visible={this.state.toast}
            position={Toast.positions.CENTER}
            shadow={false}
            animation={false}
            hideOnPress={true}>
            Gửi Thành Công
          </Toast>
          <MapView
            style={styles.map}
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}>
            <Marker.Animated
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={this.state.coordinate}
            />
          </MapView>
        </View>
        <FloatingAction
          color="#00BFFF"
          position="right"
          actions={actions}
          distanceToEdge={16}
          iconWidth={30}
          iconHeight={30}
          onPressItem={name => this.sendSOS(name)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;
