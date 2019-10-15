import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import SignInScreen from '../Containers/SignInScreen/SignInScreen';
import ConfirmScreen from '../Containers/ConfirmScreen/ConfirmScreen';

import styles from './Styles/NavigationStyles';
import {Colors} from '../Themes';

const AuthNavigator = createStackNavigator(
  {
    SignInScreen: {
      screen: SignInScreen,
      navigationOptions: {
        header: null,
      },
    },
    ConfirmScreen: {
      screen: ConfirmScreen,
      navigationOptions: {
        headerTitle: 'Nhập Mã Xác Nhận',
        headerTintColor: '#9ea1ab',
        headerTitleStyle: {color: Colors.appColor},
      },
    },
  },
  {
    // Default config for all screens
    initialRouteName: 'SignInScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default createAppContainer(AuthNavigator);
