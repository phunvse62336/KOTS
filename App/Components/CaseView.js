import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Images, Colors, ApplicationStyles} from '../Themes';

const {width, height} = Dimensions.get('window');

export class CaseView extends Component {
  constructor(props) {
    super(props);
  }

  callByPhone = () => {
    const {phoneNumber} = this.props.item;
    Linking.openURL(`tel:${phoneNumber}`);
  };

  viewDetail = () => {
    const {item, navigation} = this.props;
    navigation.navigate('SOSDetailScreen', {item: item});
  };

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        onPress={this.viewDetail}
        style={ApplicationStyles.buttonCaseView}>
        {item.type === 'SOS' ? (
          <Image
            source={Images.sosLogo}
            style={ApplicationStyles.imageCaseView}
          />
        ) : (
          <Image
            source={Images.contactLogo}
            style={ApplicationStyles.imageCaseView}
          />
        )}
        <View style={ApplicationStyles.inforCaseView}>
          {item.status === 'Đã Xong' ? (
            item.type === 'SOS' ? (
              <Text style={ApplicationStyles.SOSTextCaseView}>
                Tín Hiệu Khẩn cấp
              </Text>
            ) : (
              <Text style={ApplicationStyles.doneTextCaseView}>
                Cần Liên Lạc
              </Text>
            )
          ) : item.type === 'SOS' ? (
            <Text style={ApplicationStyles.SOSTextCaseView}>
              Tín Hiệu Khẩn cấp
            </Text>
          ) : (
            <Text style={ApplicationStyles.normalCaseTextCaseView}>
              Cần Liên Lạc
            </Text>
          )}
          <Text style={ApplicationStyles.timeCaseView}>4 phút trước</Text>
          <Text style={ApplicationStyles.nameCaseView}>
            Người gửi: {item.name}
          </Text>
          <Text style={ApplicationStyles.phoneCaseView}>
            SĐT: {item.phoneNumber}
          </Text>
        </View>
        <View style={ApplicationStyles.buttonViewCaseView}>
          {item.status === 'Đã Xong' ? (
            <Text style={ApplicationStyles.doneStatusCaseView}>
              {item.status}
            </Text>
          ) : (
            <Text style={ApplicationStyles.statusCaseView}>{item.status}</Text>
          )}
          <TouchableOpacity
            onPress={this.callByPhone}
            style={ApplicationStyles.callButtonCaseView}>
            <FontAwesome name="phone" color="white" size={30} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

export default CaseView;
