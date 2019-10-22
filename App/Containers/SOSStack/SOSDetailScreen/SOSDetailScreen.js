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
      isMapReady: false,
      item: this.props.navigation.state.params.item,
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
    this.props.navigation.navigate('SOSMessageScreen');
  };

  joinCase = () => {
    this.props.navigation.navigate('SOSMessageScreen');
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
        {this.state.item.status === 'Chưa Xử Lý' ? (
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
