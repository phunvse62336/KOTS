import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Picker,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

import { HeaderUI, Button } from '../../../Components';
import styles from './CreateProfileScreenStyles';
import { Colors } from '../../../Themes';
import { APIUpdateKnightProfile } from '../../../Services/APIUpdateKnightProfile';
import { APIGetListTeam } from '../../../Services/APIGetListTeam';

import { MESSAGES } from '../../../Utils/Constants';

const { height, width } = Dimensions.get('window');

const GenderData = ['Nữ', 'Nam', 'Khác'];

export class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: 1,
      address: '',
      dateOfBirth: new Date(),
      token: '',
      phoneNumber: '',
      spinner: false,
    };
  }

  onChangeTextName = text => this.setState({ name: text });

  onChangeTextAddress = text => this.setState({ address: text });

  onGenderClick = indexValue => {
    this.setState({ gender: indexValue });
  };

  renderButton = (currentGender, indexGender, onPress) => (
    <TouchableOpacity
      onPress={() => onPress(indexGender)}
      style={
        currentGender === indexGender
          ? styles.selectedButton
          : styles.disabledButton
      }>
      <Text
        style={
          currentGender === indexGender
            ? styles.selecctedText
            : styles.disabledText
        }>
        {GenderData[indexGender]}
      </Text>
    </TouchableOpacity>
  );

  onUpdate = async () => {
    const {
      name,
      gender,
      dateOfBirth,
      address,
      phoneNumber,
      token,
    } = this.state;

    if (name !== '' || address !== '') {
      this.setState({ spinner: true });
      let responseStatus = await APIUpdateKnightProfile(
        phoneNumber,
        name,
        address,
        gender,
        token,
        dateOfBirth,
        null,
      );
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        console.log(JSON.stringify(responseStatus));
        this.setState({
          spinner: false,
        });
        // await AsyncStorage.setItem('LOGIN', '1');
        await AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
        await AsyncStorage.setItem('USER', JSON.stringify(responseStatus.data));

        this.props.navigation.navigate('JoinTeam');
      } else {
        this.setState({
          spinner: false,
        });
        alert('Không gửi được. Vui lòng thử lại sau');
      }
    } else {
      alert('Vui lòng điền hết thông tin!');
    }
    // this.props.navigation.navigate('AppNavigator');
  };

  async componentDidMount() {
    // alert(this.state.dateOfBirth);
    // let phoneNumber = await AsyncStorage.getItem('');
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');

    this.setState({
      token: fcmToken,
      phoneNumber: phoneNumber,
    });
  }

  render() {
    const { gender } = this.state;
    let nowDate = moment();
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{ color: '#fff' }}
          size="large"
        />
        <HeaderUI title="Khởi tạo thông tin" />
        <View style={styles.inputViewContainer}>
          <View style={styles.inputViewLabel}>
            <Text style={styles.colorText}>Họ Tên</Text>
          </View>
          <TextInput
            style={styles.inputView}
            onChangeText={this.onChangeTextName}
          />
        </View>
        <View style={styles.inputViewContainer}>
          <View style={styles.inputViewLabel}>
            <Text style={styles.colorText}>Địa Chỉ</Text>
          </View>
          <TextInput
            style={styles.inputView}
            onChangeText={this.onChangeTextAddress}
          />
        </View>
        <View style={styles.buttonGroupContainer}>
          <Text style={styles.colorText}>Giới tính</Text>
          <View style={styles.buttonGroupView}>
            {this.renderButton(gender, 0, this.onGenderClick)}
            <View style={{ width: 5 }} />
            {this.renderButton(gender, 1, this.onGenderClick)}
            <View style={{ width: 5 }} />
            {this.renderButton(gender, 2, this.onGenderClick)}
          </View>
        </View>
        <DatePicker
          date={this.state.dateOfBirth}
          mode="date"
          androidMode="spinner"
          placeholder="select date"
          format="DD-MM-YYYY"
          maxDate={nowDate}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={styles.datePicker}
          customStyles={{
            dateInput: {
              borderRadius: 10,
              borderColor: Colors.appColor,
              borderWidth: 2,
              height: 44,
            },
            dateText: { color: Colors.appColor },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({ dateOfBirth: date });
          }}
        />

        <Button
          label="Cập Nhật"
          buttonTextStyle={styles.updateTextButton}
          buttonStyle={styles.updateButton}
          buttonFunc={this.onUpdate}
        />
      </SafeAreaView>
    );
  }
}

export default CreateProfileScreen;
