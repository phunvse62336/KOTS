import React, { Component } from 'react';
import {
  Text,
  View,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  AppState,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import AppNavigation from '../Navigation/AppNavigation';
import NavigationService from '../Services/NavigationService';

import { NOTIFICATION_CHANNEL } from '../Utils/Constants';

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

  async requestWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'KOTS Need Write External Storage Permission',
          message:
            'KOTS needs access to write external storage ' +
            'so you can use some fetureas.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getLocationUpdates = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission) {
      return;
    }

    this.setState({ updatesEnabled: true }, () => {
      this.watchId = Geolocation.watchPosition(
        position => {
          this.setState({ location: position });
          console.log(position);
        },
        error => {
          this.setState({ location: error });
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
    // console.log(fcmToken);

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      // console.log(fcmToken);
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
      notification.android
        .setChannelId(NOTIFICATION_CHANNEL)
        .setSound('default');
      firebase.notifications().displayNotification(notification);
    });
  }

  async componentDidMount() {
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    this.requestWritePermission();
    var firebaseConfig = {
      apiKey: 'AIzaSyBL43OazIvXF1WeTnLaXiYQl0xJag5ALoo',
      authDomain: 'myfirebase-b1225.firebaseapp.com',
      databaseURL: 'https://myfirebase-b1225.firebaseio.com',
      projectId: 'myfirebase-b1225',
      storageBucket: 'myfirebase-b1225.appspot.com',
      messagingSenderId: '839306361620',
      appId: '1:839306361620:web:83e3fb44eba555ff6b2001',
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const channel = new firebase.notifications.Android.Channel(
      NOTIFICATION_CHANNEL,
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
        NavigationService.navigate('SOSDetailScreen', {
          item: JSON.parse(notification.data.item),
          phoneNumber: phoneNumber,
        });
        // alert(notification.data);
        console.log(notification.data.item);

        firebase
          .notifications()
          .removeDeliveredNotification(notification.notificationId);
      });
  }

  componentWillUnmount() {
    this.notificationOpenedListener();
  }

  render() {
    console.disableYellowBox = true;
    return (
      <AppNavigation
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;
