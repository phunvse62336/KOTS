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
  render() {
    return (
      <View
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <View
          style={{
            flex: 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={Images.logoApp}
            style={{width: width / 2, height: width / 2}}
          />
        </View>
        <View style={{flex: 0.5}}>
          <View
            style={{
              width: width * 0.7,
              flexDirection: 'row',
              borderColor: '#1662BD',
              borderWidth: 2,
              borderRadius: 10,
              alignItems: 'center',
              paddingLeft: 10,
            }}>
            <Feather name="phone" color="#1662BD" size={30} />
            <TextInput
              keyboardType="phone-pad"
              style={{
                width: width * 0.5,
                height: 44,
                marginLeft: 10,
                color: '#1662BD',
                borderRadius: 10,
              }}
              placeholder="Vui lòng nhập số điện thoại"
            />
          </View>
          <TouchableOpacity
            style={{
              width: width * 0.7,
              backgroundColor: '#1662BD',
              height: 44,
              marginTop: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}
            onPress={() =>
              this.props.navigation.navigate('ConfirmScreen', {
                sdt: '0971940123',
              })
            }>
            <Text style={{color: 'white', fontSize: 18}}>Đăng Nhập</Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              alignSelf: 'center',
            }}>
            <Text style={{fontSize: 15}}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: '#1662BD',
                  textDecorationLine: 'underline',
                  fontSize: 15,
                }}>
                ĐĂNG KÝ
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.1,
            alignSelf: 'center',
            justifyContent: 'flex-end',
          }}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text style={{fontSize: 13, textAlign: 'center'}}>
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
