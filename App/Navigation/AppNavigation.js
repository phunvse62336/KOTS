import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AuthLoadingScreen from '../Containers/AuthLoadingScreen';

import SignInScreen from '../Containers/AuthStack/SignInScreen/SignInScreen';
import ConfirmScreen from '../Containers/AuthStack/ConfirmScreen/ConfirmScreen';
import RegisterScreen from '../Containers/AuthStack/RegisterScreen/RegisterScreen';
import CreateProfileScreen from '../Containers/AuthStack/CreateProfileScreen/CreateProfileScreen';

import HomeScreen from '../Containers/HomeStack/HomeScreen/HomeScreen';
import CreateSOSScreen from '../Containers/HomeStack/CreateSOSScreen/CreateSOSScreen';

import NewsScreen from '../Containers/NewsStack/NewsScreen/NewsScreen';
import NewsDetailScreen from '../Containers/NewsStack/NewsDetailScreen/NewsDetailScreen';

import SOSScreen from '../Containers/SOSStack/SOSScreen/SOSScreen';
import SOSDetailScreen from '../Containers/SOSStack/SOSDetailScreen/SOSDetailScreen';
import SOSMessageScreen from '../Containers/SOSStack/SOSMessageScreen/SOSMessageScreen';
import SOSVoiceChatScreen from '../Containers/SOSStack/SOSVoiceChatScreen/SOSVoiceChatScreen';

import MenuScreen from '../Containers/MenuStack/MenuScreen/MenuScreen';
import PoliceScreen from '../Containers/MenuStack/PoliceScreen/PoliceScreen';

import styles from './Styles/NavigationStyles';
import { Colors } from '../Themes';

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
        headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
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
  CreateSOSScreen: {
    screen: CreateSOSScreen,
    navigationOptions: {
      headerTitle: 'Yêu Cầu Giúp Đỡ',
      headerTintColor: Colors.appColor,
      headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
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
  NewsDetailScreen: {
    screen: NewsDetailScreen,
    navigationOptions: {
      headerTitle: 'Chi tiết bài báo',
      headerTintColor: Colors.appColor,
      headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
    },
  },
});

const SOSTabStack = createStackNavigator({
  SOSScreen: {
    screen: SOSScreen,
    navigationOptions: {
      header: null,
    },
  },
  SOSDetailScreen: {
    screen: SOSDetailScreen,
    navigationOptions: {
      headerTitle: 'Chi Tiết Sự Cố',
      headerTintColor: Colors.appColor,
      headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
    },
  },
  SOSMessageScreen: {
    screen: SOSMessageScreen,
    navigationOptions: {
      headerTitle: 'Chi Tiết Sự Cố',
      headerTintColor: Colors.appColor,
      headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
    },
  },
  SOSVoiceChatScreen: {
    screen: SOSVoiceChatScreen,
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
  MenuScreen: {
    screen: MenuScreen,
    navigationOptions: {
      header: null,
    },
  },
  PoliceScreen: {
    screen: PoliceScreen,
    navigationOptions: {
      headerTitle: 'Danh sách cảnh sát',
      headerTintColor: Colors.appColor,
      headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
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
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
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
  const { routeName } = navigation.state;
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
