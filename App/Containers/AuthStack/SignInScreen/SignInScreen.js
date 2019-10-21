import React, {Component} from 'react';
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
import PhoneInput from 'react-native-phone-input';
import firebase from 'react-native-firebase';
import Spinner from 'react-native-loading-spinner-overlay';

import styles from './SignInScreenStyles';
import {Images, Colors} from '../../../Themes';
import {Button} from '../../../Components';
import {APIFindKnight} from '../../../Services/APIFindKnight';
import {MESSAGES} from '../../../Utils/Constants';

const {width, height} = Dimensions.get('screen');

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, phoneNumber: '', confirmResult: null};
  }

  login = async () => {
    this.setState({loading: true});
    if (this.state.phoneNumber !== '' && this.phone.isValidNumber() === true) {
      const phoneNumber = this.state.phoneNumber.replace(/\s/g, '');
      // let response = await fetch('http://171.244.3.182/api/v1/Video');
      // let responseJson = await response.json();
      // this.setState({loading: false});

      // if (responseJson.status === 'SUCCESS') {
      //   alert('có rồi');
      // } else {
      //   alert('chưa có');
      // }
      let responseStatus = await APIFindKnight(phoneNumber);
      if (responseStatus.result === MESSAGES.AUTH.SUCCESS_CODE) {
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber)
          .then(confirmResult => {
            this.setState({loading: false});
            this.props.navigation.navigate('ConfirmScreen', {
              phoneNumber: this.state.phoneNumber,
              action: 'login',
              confirmResult: confirmResult,
            });
          })
          .catch(error => {
            this.setState({loading: false});
            alert(error);
          });
      } else {
        this.setState({loading: false});
        alert('Số điện thoại chưa được đăng ký!!!');
      }
    } else {
      this.setState({loading: false});

      Alert.alert('Số điện thoại không đúng', '');
    }
  };

  registerNavigate = () => {
    this.props.navigation.navigate('RegisterScreen', {
      phoneNumber: this.state.phoneNumber,
    });
  };

  componentDidMount() {
    this.phone.focus();
  }

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textStyle={{color: '#fff'}}
          size="large"
        />
        <View style={styles.viewLogo}>
          <Image source={Images.logoApp} style={styles.logo} />
        </View>
        <View style={styles.viewForm}>
          <View style={styles.viewInput}>
            <Feather name="phone" color={Colors.appColor} size={30} />
            <PhoneInput
              onChangePhoneNumber={text => {
                this.setState({phoneNumber: text});
              }}
              value={
                this.state.phoneNumber === '' ? '+84' : this.state.phoneNumber
              }
              ref={ref => {
                this.phone = ref;
              }}
              flagStyle={{display: 'none'}}
              style={styles.phoneInput}
              textStyle={styles.colorApp}
            />
          </View>
          <Button
            buttonTextStyle={styles.loginTextButton}
            buttonStyle={styles.loginButton}
            label="Đăng Nhập"
            buttonFunc={this.login}
          />
          <View style={styles.viewRegister}>
            <Text style={styles.textRegister}>Bạn chưa có tài khoản? </Text>
            <Button
              label="ĐĂNG KÝ"
              buttonTextStyle={styles.buttonRegister}
              buttonFunc={this.registerNavigate}
            />
          </View>
        </View>
        <View style={styles.viewFooter}>
          <View style={styles.inlineViewFooter}>
            <Text style={styles.textFooter}>
              Bằng việc sử dụng ứng dụng, bạn đồng ý rằng bạn đã đọc,{'\n'}hiểu
              và chấp thuận Điều Khoản Sử Dụng
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default SignInScreen;
