import React, { Component } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './CreateTeamScreenStyles';
import { APICreateTeam } from '../../../Services/APICreateTeam';
import { MESSAGES } from '../../../Utils/Constants';

import { HeaderUI, Button } from '../../../Components';

class CreateTeamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', address: '', phoneNumber: '', spinner: false };
  }
  async componentDidMount() {
    // alert(this.state.dateOfBirth);
    // let phoneNumber = await AsyncStorage.getItem('');
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');

    this.setState({
      phoneNumber: phoneNumber,
    });
  }
  onChangeTextName = text => this.setState({ name: text });

  onChangeTextAddress = text => this.setState({ address: text });

  onCreate = async () => {
    const { phoneNumber, name, address } = this.state;
    if (name !== '' || address !== '') {
      this.setState({ spinner: true });
      let responseStatus = await APICreateTeam(phoneNumber, name, address);
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        console.log(JSON.stringify(responseStatus));
        this.setState({
          spinner: false,
        });
        this.props.navigation.navigate('AuthNavigator');
      }
    } else {
      alert('Vui lòng điền hết thông tin!');
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{ color: '#fff' }}
          size="large"
        />
        <HeaderUI title="Tạo đội mới" />
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
            <Text style={styles.colorText}>Địa Chỉ Hoạt Động</Text>
          </View>
          <TextInput
            style={styles.inputView}
            onChangeText={this.onChangeTextAddress}
          />
        </View>
        <Button
          label="Tạo đội"
          buttonTextStyle={styles.updateTextButton}
          buttonStyle={styles.updateButton}
          buttonFunc={this.onCreate}
        />
      </SafeAreaView>
    );
  }
}

export default CreateTeamScreen;
