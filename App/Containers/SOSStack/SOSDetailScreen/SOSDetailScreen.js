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
      latitude: this.props.navigation.state.params.item.location.latitude,
      longitude: this.props.navigation.state.params.item.location.longitude,
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

  joinCase = () => {
    alert('Tham gia');
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
                  <Text>Người gửi: {this.state.item.name}</Text>
                  <Text>Vị trí: {this.state.address}</Text>
                  <Text>Liên hệ: {this.state.item.phoneNumber}</Text>
                </CustomCallout>
              </Callout>
            </Marker>
          )}
        </MapView>
        <View
          style={{
            height: 100,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: width,
            borderTopWidth: 2,
            borderBottomWidth: 2,
          }}>
          <TouchableOpacity
            onPress={this.joinCase}
            style={{
              height: 44,
              width: 100,
              backgroundColor: '#0FC277',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, color: 'white'}}>Tham Gia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.ignore}
            style={{
              height: 44,
              width: 100,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{fontSize: 15, color: 'white'}}>Từ Chối</Text>
          </TouchableOpacity>
        </View>
      </View>
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

export default SOSDetailScreen;
