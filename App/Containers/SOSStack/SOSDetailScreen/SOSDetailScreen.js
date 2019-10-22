import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Callout, AnimatedRegion} from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import Spinner from 'react-native-loading-spinner-overlay';

import {MESSAGES} from '../../../Utils/Constants';
import {APIConfirmCase} from '../../../Services/APIConfirmCase';

import {CustomCallout} from '../../../Components';

import styles from './SOSDetailScreenStyles';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
    };
  }
  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  onMapLayout = () => {
    this.setState({isMapReady: true});
  };

  getAddressFromPosition = () => {
    let position = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };
    // alert(JSON.stringify(position));

    Geocoder.geocodePosition(position)
      .then(res => {
        this.setState({address: res[0].formattedAddress});
      })
      .catch(err => console.log(err));
  };

  joinMessage = () => {
    const {phoneNumber, item} = this.state;

    this.props.navigation.navigate('SOSMessageScreen', {
      item: item,
      phoneNumber: phoneNumber,
    });
  };

  joinCase = async () => {
    const {phoneNumber, item} = this.state;
    this.setState({spinner: true});
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

  componentDidMount() {
    this.getAddressFromPosition();
  }

  render() {
    const {longitude, latitude} = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Đang Xử Lý'}
          textStyle={{color: '#fff'}}
          size="large"
        />
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          onLayout={this.onMapLayout}
          region={this.getMapRegion()}>
          {this.state.isMapReady && (
            <Marker
              ref={marker => {
                this.marker = marker;
              }}
              coordinate={{longitude, latitude}}>
              <Callout tooltip>
                <CustomCallout>
                  <Text style={{fontSize: 18}}>Thông tin tín hiệu</Text>
                  <Text>Người gửi: {this.state.item.user.name}</Text>
                  <Text>Vị trí: {this.state.address}</Text>
                  <Text>Liên hệ: {this.state.item.user.id}</Text>
                </CustomCallout>
              </Callout>
            </Marker>
          )}
        </MapView>
        {this.state.item.status === MESSAGES.CASE.CREATE ? (
          <View style={styles.viewButton}>
            <TouchableOpacity onPress={this.joinCase} style={styles.joinButton}>
              <Text style={styles.buttonText}>Tham Gia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.ignore} style={styles.ignoreButton}>
              <Text style={styles.buttonText}>Từ Chối</Text>
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
