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
import {MESSAGES} from './../Utils/Constants';
const {width, height} = Dimensions.get('window');

export class CaseView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props.item);
  }

  callByPhone = () => {
    const {citizenId} = this.props.item;
    Linking.openURL(`tel:${citizenId}`);
  };

  viewDetail = () => {
    const {item, navigation, phoneNumber} = this.props;
    navigation.navigate('SOSDetailScreen', {
      item: item,
      phoneNumber: phoneNumber,
    });
  };

  renderStatus = param => {
    switch (param) {
      case MESSAGES.CASE.CREATE:
        return 'Chưa xử lý';
      case MESSAGES.CASE.CONFIRM:
        return 'Đang xử lý';
      case MESSAGES.CASE.SUCCESSED:
        return 'Thành Công';
      case MESSAGES.CASE.FAILED:
        return 'Thất Bại';
      case MESSAGES.CASE.PENDING:
        return 'Chưa xử lý';
    }
  };

  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity
        onPress={this.viewDetail}
        style={ApplicationStyles.buttonCaseView}>
        {item.type === MESSAGES.TYPE_CASE.SOS ? (
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
          {item.status === MESSAGES.CASE.SUCCESSED ||
          item.status === MESSAGES.CASE.FAILED ? (
            item.type === MESSAGES.TYPE_CASE.SOS ? (
              <Text style={ApplicationStyles.doneTextCaseView}>
                Tín Hiệu Khẩn cấp
              </Text>
            ) : (
              <Text style={ApplicationStyles.doneTextCaseView}>
                Cần Liên Lạc
              </Text>
            )
          ) : item.type === MESSAGES.TYPE_CASE.SOS ? (
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
            Người gửi: {item.user.name}
          </Text>
          <Text style={ApplicationStyles.phoneCaseView}>
            SĐT: {item.user.id}
          </Text>
        </View>
        <View style={ApplicationStyles.buttonViewCaseView}>
          {item.status === MESSAGES.CASE.SUCCESSED ||
          item.status === MESSAGES.CASE.FAILED ? (
            <Text style={ApplicationStyles.doneStatusCaseView}>
              {this.renderStatus(item.status)}
            </Text>
          ) : (
            <Text style={ApplicationStyles.statusCaseView}>
              {this.renderStatus(item.status)}
            </Text>
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
