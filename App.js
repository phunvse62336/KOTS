/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Button,
} from 'react-native';

class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
    };
  }

  changeName = () => {
    this.setState({name: 'Hung'});
  };

  render() {
    return (
      <View style={{height: 100, width: 100, backgroundColor: 'red'}}>
        <Text style={{fontSize: 20}}>{this.state.name}</Text>
        <TouchableOpacity
          style={{backgroundColor: 'blue'}}
          onPress={this.changeName}>
          <Text>Change</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class App extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <App2 name="phu" />
      </View>
    );
  }
}

export default App;
