import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SignInScreen from '../Containers/AuthStack/SignInScreen/SignInScreen';
import ConfirmScreen from '../Containers/AuthStack/ConfirmScreen/ConfirmScreen';
import HomeScreen from '../Containers/HomeStack/HomeScreen/HomeScreen';

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
        headerTintColor: Colors.appColor,
        headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
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

const HomeTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const NewsTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const SOSTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const GroupTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const MenuTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const AppNavigator = createBottomTabNavigator(
  {
    HomeTabStack,
    NewsTabStack,
    SOSTabStack,
    GroupTabStack,
    MenuTabStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, tintColor}) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),

    tabBarOptions: {
      activeTintColor: '#1F06B6',
      inactiveTintColor: 'gray',
      showLabel: false,
    },
  },
);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const {routeName} = navigation.state;
  let iconName;
  if (routeName === 'HomeTabStack') {
    iconName = 'home';
  } else if (routeName === 'NewsTabStack') {
    iconName = 'newspaper';
  } else if (routeName === 'SOSTabStack') {
    iconName = 'bell';
  } else if (routeName === 'GroupTabStack') {
    iconName = 'users';
  } else if (routeName === 'MenuTabStack') {
    iconName = 'bars';
  }

  return <FontAwesome5 name={iconName} size={25} color={tintColor} />;
};

const SwitchNavigation = createSwitchNavigator({
  AuthNavigator,
  AppNavigator,
});

export default createAppContainer(SwitchNavigation);
