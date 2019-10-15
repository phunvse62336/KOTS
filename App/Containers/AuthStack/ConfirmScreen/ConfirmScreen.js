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
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-community/async-storage';

import {Images, Colors} from '../../../Themes';
import styles from './ConfirmScreenStyles';
import {Button} from '../../../Components';

const {width, height} = Dimensions.get('screen');

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      action: this.props.navigation.state.params.action,
    };
  }

  confirm = async () => {
    if (this.state.action === 'login') {
      await AsyncStorage.setItem('LOGIN', '1');
      this.props.navigation.navigate('AppNavigator');
    } else {
      this.props.navigation.navigate('CreateProfile');
    }
  };

  componentDidMount() {}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.viewHeader}>
          <View style={styles.alignCenter}>
            <Text style={styles.helloText}>Xin Chào Hiệp Sĩ</Text>
            <Text style={styles.sendText}>
              Chúng tôi đã gửi mã xác nhận đến{'\n'}số điện thoại của bạn
            </Text>
            <Text style={styles.phoneText}>
              Gửi đến {this.state.phoneNumber}
            </Text>
          </View>
        </View>
        <View style={styles.viewCodeInput}>
          <CodeInput
            ref="codeInput"
            codeLength={4}
            space={5}
            size={50}
            inputPosition="left"
            onFulfill={code => this._onFulfill(code)}
            containerStyle={styles.containerCodeInput}
            codeInputStyle={styles.codeInput}
          />

          <Button
            buttonTextStyle={styles.registerText}
            buttonStyle={styles.registerButton}
            label="Xác Nhận"
            buttonFunc={this.confirm}
          />
        </View>
        <View style={styles.viewFooter}>
          <View style={styles.inlineViewFooter}>
            <Text>Không nhận được mã? </Text>
            <Button buttonTextStyle={styles.textFooter} label="Gửi Lại" />
          </View>
        </View>
      </View>
    );
  }
}

export default SignInScreen;
