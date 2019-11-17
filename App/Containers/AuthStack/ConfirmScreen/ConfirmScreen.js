import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';

import { Images, Colors } from '../../../Themes';
import styles from './ConfirmScreenStyles';
import { Button } from '../../../Components';
import { APICreateKnightProfile } from '../../../Services/APICreateKnightProfile';
import { APILogin } from '../../../Services/APILogin';

import { MESSAGES } from '../../../Utils/Constants';

const { width, height } = Dimensions.get('screen');

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      action: this.props.navigation.state.params.action,
      confirmResult: this.props.navigation.state.params.confirmResult,
      user: this.props.navigation.state.params.user,
      token: '',
      code: '',
    };
  }

  confirm = async () => {
    const { phoneNumber, token } = this.state;

    if (this.state.action === 'login') {
      let user = JSON.stringify(this.state.user);
      let responseStatus = await APILogin(phoneNumber, token);
      console.log('ABC ' + JSON.stringify(responseStatus));
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        console.log('vo ne');
        await AsyncStorage.setItem('LOGIN', '1');
        await AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
        await AsyncStorage.setItem('USER', user);
        // alert(user);
        this.props.navigation.navigate('AppNavigator');
      }
    } else if (this.state.action === 'register') {
      // alert(token);
      let responseStatus = await APICreateKnightProfile(phoneNumber, token);
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
        this.props.navigation.navigate('CreateProfile');
      }
    } else if (this.state.action === 'updateProfile') {
      AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
      this.props.navigation.navigate('CreateProfile');
    } else if (this.state.action === 'joinTeam') {
      AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
      this.props.navigation.navigate('JoinTeam');
    } else if (this.state.action === 'waiting') {
      AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
      this.props.navigation.navigate('WaitingScreen', {
        teamId: this.state.user.team_id,
      });
    }
  };

  _onFulfill(code) {
    this.setState({ loading: true, code: code });

    const { confirmResult } = this.state;
    if (confirmResult && code.length) {
      confirmResult
        .confirm(code)
        .then(async user => {
          this.setState({ loading: false });
          // await AsyncStorage.setItem('FIREBASE_USER', user);

          this.confirm();
          // alert(JSON.stringify(user));
          // await AsyncStorage.setItem('LOGIN', '1');
          // this.props.navigation.navigate('AppNavigator');
        })
        .catch(error => {
          this.setState({ loading: false });
          // alert(JSON.stringify(error));
          Alert.alert(
            'Confirmation Code',
            'Code not match!',
            [{ text: 'OK' }],
            {
              cancelable: false,
            },
          );

          this.refs.codeInput.clear();
        });
    }
  }

  async componentDidMount() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    // console.log(fcmToken);

    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      // console.log(fcmToken);
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    this.setState({ token: fcmToken });
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textStyle={{ color: '#fff' }}
          size="large"
        />
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
            codeLength={6}
            space={3}
            size={50}
            inputPosition="left"
            keyboardType="numeric"
            onFulfill={code => this._onFulfill(code)}
            containerStyle={styles.containerCodeInput}
            codeInputStyle={styles.codeInput}
          />

          <Button
            buttonTextStyle={styles.registerText}
            buttonStyle={styles.registerButton}
            label="Xác Nhận"
            buttonFunc={() => this._onFulfill(this.state.code)}
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
