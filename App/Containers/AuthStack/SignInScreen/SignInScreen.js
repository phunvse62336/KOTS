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

import styles from './SignInScreenStyles';
import {Images, Colors} from '../../../Themes';

const {width, height} = Dimensions.get('screen');

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
    };
  }
  login = () => {
    if (this.state.phoneNumber !== '' && this.phone.isValidNumber() === true) {
      this.state.phoneNumber = this.state.phoneNumber.replace(/\s/g, '');

      this.props.navigation.navigate('ConfirmScreen', {
        phoneNumber: this.state.phoneNumber,
      });
    } else {
      Alert.alert('Số điện thoại không đúng', '');
    }
  };

  componentDidMount() {
    this.phone.focus();
  }

  render() {
    return (
      <View style={styles.container}>
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
          <TouchableOpacity style={styles.loginButton} onPress={this.login}>
            <Text style={styles.loginTextButton}>Đăng Nhập</Text>
          </TouchableOpacity>
          <View style={styles.viewRegister}>
            <Text style={styles.textRegister}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity>
              <Text style={styles.buttonRegister}>ĐĂNG KÝ</Text>
            </TouchableOpacity>
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
