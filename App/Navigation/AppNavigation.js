import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AuthLoadingScreen from '../Containers/AuthLoadingScreen';

import SignInScreen from '../Containers/AuthStack/SignInScreen/SignInScreen';
import ConfirmScreen from '../Containers/AuthStack/ConfirmScreen/ConfirmScreen';
import RegisterScreen from '../Containers/AuthStack/RegisterScreen/RegisterScreen';
import CreateProfileScreen from '../Containers/AuthStack/CreateProfileScreen/CreateProfileScreen';

import HomeScreen from '../Containers/HomeStack/HomeScreen/HomeScreen';
import NewsScreen from '../Containers/HomeStack/NewsScreen/NewsScreen';

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
    RegisterScreen: {
      screen: RegisterScreen,
      navigationOptions: {
        header: null,
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

const CreateProfile = createStackNavigator({
  CreateProfileScreen: {
    screen: CreateProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const HomeTabStack = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const NewsTabStack = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const SOSTabStack = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const GroupTabStack = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
    navigationOptions: {
      header: null,
    },
  },
});

const MenuTabStack = createStackNavigator({
  NewsScreen: {
    screen: NewsScreen,
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

const SwitchNavigation = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AuthNavigator,
    CreateProfile,
    AppNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(SwitchNavigation);
