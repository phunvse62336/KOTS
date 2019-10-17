import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';

import {Images, Colors} from '../Themes';

const {width, height} = Dimensions.get('window');

export class CaseView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        style={{
          width: width * 0.9,
          height: 120,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderColor: 'black',
          borderWidth: 2,
          borderRadius: 10,
          marginTop: 10,
          flexDirection: 'row',
        }}>
        {item.type === 'SOS' ? (
          <Image
            source={Images.sosLogo}
            style={{width: 90, height: 90, marginLeft: 5}}
          />
        ) : (
          <Image
            source={Images.contactLogo}
            style={{width: 90, height: 90, marginLeft: 5}}
          />
        )}
        <View style={{marginLeft: 5}}>
          {item.type === 'SOS' ? (
            <Text style={{fontSize: 18, color: 'red'}}>Tín Hiệu Khẩn cấp</Text>
          ) : (
            <Text style={{fontSize: 18, color: Colors.appColor}}>
              Cần Liên Lạc
            </Text>
          )}
          <Text style={{fontSize: 10}}>4 phút trước</Text>
          <Text style={{fontSize: 11}}>Người Gửi: {item.name}</Text>
          <Text style={{fontSize: 11}}>SĐT: {item.phoneNumber}</Text>
        </View>
        <View
          style={{
            marginLeft: 5,
            marginRight: 5,
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 12}}>{item.status}</Text>
          <TouchableOpacity>
            <Text>Chi Tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Chi Tiết</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CaseView;
