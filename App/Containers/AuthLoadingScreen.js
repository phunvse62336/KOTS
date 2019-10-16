import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('LOGIN');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(
      userToken ? 'AppNavigator' : 'AuthNavigator',
    );
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <Spinner
          visible={true}
          textStyle={{
            color: '#FFF',
          }}
        />
      </View>
    );
  }
}
