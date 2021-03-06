import React, {Component} from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from '../Navigation/AppNavigation';

export class App extends Component {
  constructor(props) {
    super(props);
    this.hasLocationPermission();
  }
  watchId = null;
  state = {
    loading: false,
    updatesEnabled: false,
    location: {},
  };

  hasLocationPermission = async () => {
    if (
      Platform.OS === 'ios' ||
      (Platform.OS === 'android' && Platform.Version < 23)
    ) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  };

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({updatesEnabled: true}, () => {
      this.watchId = Geolocation.watchPosition(
        position => {
          this.setState({location: position});
          console.log(position);
        },
        error => {
          this.setState({location: error});
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 0,
          interval: 5000,
          fastestInterval: 2000,
        },
      );
    });
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    firebase.notifications().onNotification(notification => {
      notification.android.setChannelId('kots-channel').setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  }

  componentDidMount() {
    const channel = new firebase.notifications.Android.Channel(
      'kots-channel',
      'kots channel',
      firebase.notifications.Android.Importance.Max,
    );
    firebase.notifications().android.createChannel(channel);
    this.checkPermission();
    this.createNotificationListeners();

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        // Get information about the notification that was opened
        const notification: Notification = notificationOpen.notification;
        var seen = [];
        alert(
          JSON.stringify(notification.data, function(key, val) {
            if (val != null && typeof val === 'object') {
              if (seen.indexOf(val) >= 0) {
                return;
              }
              seen.push(val);
            }
            return val;
          }),
        );
        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
  }

  componentWillUnmount() {
    this.notificationOpenedListener();
  }

  render() {
    return <AppNavigation />;
  }
}

export default App;
