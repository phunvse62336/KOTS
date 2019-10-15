import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import {HeaderUI, Button} from '../../../Components';
import styles from './CreateProfileScreenStyles';
import {Colors} from '../../../Themes';
import {Date} from 'core-js';

const {height, width} = Dimensions.get('window');

const GenderData = ['Nữ', 'Nam', 'Khác'];

export class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: undefined,
      address: '',
      dayOfBirth: moment(),
    };
  }

  onChangeTextName = text => this.setState({name: text});

  onChangeTextAddress = text => this.setState({address: text});

  onGenderClick = indexValue => {
    this.setState({gender: indexValue});
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

  onUpdate = () => {
    this.props.navigation.navigate('AppNavigator');
  };

  render() {
    const {gender} = this.state;
    let date = moment();
    return (
      <SafeAreaView style={styles.container}>
        <HeaderUI />
        <View style={styles.inputViewContainer}>
          <View style={styles.inputViewLabel}>
            <Text style={styles.colorText}>Họ Tên</Text>
          </View>
          <TextInput
            style={styles.inputView}
            keyboardType="email-address"
            onChangeText={this.onChangeTextName}
          />
        </View>
        <View style={styles.inputViewContainer}>
          <View style={styles.inputViewLabel}>
            <Text style={styles.colorText}>Địa Chỉ</Text>
          </View>
          <TextInput
            style={styles.inputView}
            keyboardType="email-address"
            onChangeText={this.onChangeTextAddress}
          />
        </View>
        <View style={styles.buttonGroupContainer}>
          <Text style={styles.colorText}>Giới tính</Text>
          <View style={styles.buttonGroupView}>
            {this.renderButton(gender, 0, this.onGenderClick)}
            <View style={{width: 5}} />
            {this.renderButton(gender, 1, this.onGenderClick)}
            <View style={{width: 5}} />
            {this.renderButton(gender, 2, this.onGenderClick)}
          </View>
        </View>
        <DatePicker
          style={{width: 200}}
          date={this.state.dayOfBirth}
          mode="date"
          androidMode="spinner"
          placeholder="select date"
          format="DD-MM-YYYY"
          maxDate={date}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          style={{
            marginTop: 25,
            width: width * 0.8,
            alignItems: 'center',
          }}
          customStyles={{
            dateInput: {
              borderRadius: 10,
              borderColor: Colors.appColor,
              borderWidth: 2,
              height: 44,
            },
            dateText: {color: Colors.appColor},
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({dayOfBirth: date});
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
