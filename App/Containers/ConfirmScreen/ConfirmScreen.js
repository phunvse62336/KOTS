import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Images} from '../../Themes';

const {width, height} = Dimensions.get('screen');

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let sdt = this.props.navigation.state.params.sdt;
    alert(sdt);
  }
  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text>Confirm</Text>
      </View>
    );
  }
}

export default SignInScreen;
