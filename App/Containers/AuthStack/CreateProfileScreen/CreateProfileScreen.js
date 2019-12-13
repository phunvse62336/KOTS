import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Picker,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import { HeaderUI, Button } from '../../../Components';
import styles from './CreateProfileScreenStyles';
import { Colors } from '../../../Themes';
import { APIUpdateKnightProfile } from '../../../Services/APIUpdateKnightProfile';
import FirebaseService from '../../../Services/FirebaseService';

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
      avatar: '',
      frontID: '',
      backID: '',
      certification1: '',
      certification2: '',
      certification3: '',
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
      avatar,
      frontID,
      backID,
      certification1,
      certification2,
      certification3,
    } = this.state;

    if (
      name !== '' &&
      address !== '' &&
      avatar !== '' &&
      frontID !== '' &&
      backID !== ''
    ) {
      this.setState({ spinner: true });

      console.log('API');
      let responseStatus = await APIUpdateKnightProfile(
        phoneNumber,
        name,
        address,
        gender,
        token,
        dateOfBirth,
        null,
        avatar,
        frontID,
        backID,
        certification1 === '' ? null : certification1,
        certification2 === '' ? null : certification2,
        certification3 === '' ? null : certification3,
      );
      if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
        console.log(JSON.stringify(responseStatus));
        this.setState({
          spinner: false,
        });
        // await AsyncStorage.setItem('LOGIN', '1');
        await AsyncStorage.setItem('PHONENUMBER', this.state.phoneNumber);
        await AsyncStorage.setItem('USER', JSON.stringify(responseStatus.data));
        this.props.navigation.navigate('JoinOrCreate');
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

  renderAddBlock = addFunc => (
    <TouchableOpacity
      style={{
        width: width / 4,
        height: width / 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.appColor,
        borderWidth: 1,
        borderRadius: 8,
        borderStyle: 'dashed',
        marginTop: 10,
      }}
      onPress={addFunc}>
      <FontAwesome name="plus" size={24} color={Colors.appColor} />
    </TouchableOpacity>
  );

  selectAvatarTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var path = '';
        if (Platform.OS === 'ios') {
          path = response.uri.toString();
        } else {
          path = response.path.toString();
        }
        const image = {
          image: response.uri.toString(),
          path: path,
          fileName: response.fileName,
        };
        FirebaseService.uploadImage(image)
          .then(url => {
            // alert('uploaded');
            this.setState({ avatar: url });
          })
          .catch(error => console.log(error));
      }
    });
  };

  removeAvatar = () => {
    this.setState({ avatar: '' });
  };

  selectFrontIDTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var path = '';
        if (Platform.OS === 'ios') {
          path = response.uri.toString();
        } else {
          path = response.path.toString();
        }
        const image = {
          image: response.uri.toString(),
          path: path,
          fileName: response.fileName,
        };
        FirebaseService.uploadImage(image)
          .then(url => {
            // alert('uploaded');
            this.setState({ frontID: url });
          })
          .catch(error => console.log(error));
      }
    });
  };

  removeFrontID = () => {
    this.setState({ frontID: '' });
  };

  selectBackIDTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var path = '';
        if (Platform.OS === 'ios') {
          path = response.uri.toString();
        } else {
          path = response.path.toString();
        }
        const image = {
          image: response.uri.toString(),
          path: path,
          fileName: response.fileName,
        };
        FirebaseService.uploadImage(image)
          .then(url => {
            // alert('uploaded');
            this.setState({ backID: url });
          })
          .catch(error => console.log(error));
      }
    });
  };

  removeBackID = () => {
    this.setState({ backID: '' });
  };

  selectCerti1Tapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var path = '';
        if (Platform.OS === 'ios') {
          path = response.uri.toString();
        } else {
          path = response.path.toString();
        }
        const image = {
          image: response.uri.toString(),
          path: path,
          fileName: response.fileName,
        };
        FirebaseService.uploadImage(image)
          .then(url => {
            // alert('uploaded');
            this.setState({ certification1: url });
          })
          .catch(error => console.log(error));
      }
    });
  };

  removeCerti1 = () => {
    this.setState({ certification1: '' });
  };

  selectCerti2Tapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var path = '';
        if (Platform.OS === 'ios') {
          path = response.uri.toString();
        } else {
          path = response.path.toString();
        }
        const image = {
          image: response.uri.toString(),
          path: path,
          fileName: response.fileName,
        };
        FirebaseService.uploadImage(image)
          .then(url => {
            // alert('uploaded');
            this.setState({ certification2: url });
          })
          .catch(error => console.log(error));
      }
    });
  };

  removeCerti2 = () => {
    this.setState({ certification2: '' });
  };

  selectCerti3Tapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        var path = '';
        if (Platform.OS === 'ios') {
          path = response.uri.toString();
        } else {
          path = response.path.toString();
        }
        const image = {
          image: response.uri.toString(),
          path: path,
          fileName: response.fileName,
        };
        FirebaseService.uploadImage(image)
          .then(url => {
            // alert('uploaded');
            this.setState({ certification3: url });
          })
          .catch(error => console.log(error));
      }
    });
  };

  removeCerti3 = () => {
    this.setState({ certification3: '' });
  };

  renderImageBlock = (url, removeFunc) => (
    <View style={{ marginTop: 10 }}>
      <Image
        resizeMode="cover"
        source={{
          uri: url,
        }}
        style={{
          width: width / 4,
          height: width / 4,
          borderRadius: 8,
        }}
      />
      <TouchableOpacity
        style={{
          top: 5,
          right: 5,
          position: 'absolute',
        }}
        onPress={removeFunc}>
        <FontAwesome name="remove" size={21} color="white" />
      </TouchableOpacity>
    </View>
  );

  renderImage = (url, addFunc, removeFunc) => {
    if (url === '') {
      return this.renderAddBlock(addFunc);
    }
    return this.renderImageBlock(url, removeFunc);
  };

  render() {
    const { gender, choice } = this.state;
    let nowDate = moment();
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{ color: '#fff' }}
          size="large"
        />
        <HeaderUI title="Khởi tạo thông tin" />
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <View style={styles.buttonGroupContainer}>
            <Text style={[styles.colorText, { marginBottom: 10 }]}>
              Vui lòng cung cấp thêm một số hình ảnh để xác nhận
            </Text>
            <Text style={styles.colorText}>Ảnh khuôn mặt</Text>
            {this.renderImage(
              this.state.avatar,
              this.selectAvatarTapped,
              this.removeAvatar,
            )}
          </View>
          <View style={styles.buttonGroupContainer}>
            <Text style={styles.colorText}>Cung cấp chứng minh nhân dân</Text>
            <View style={{ flexDirection: 'row' }}>
              {this.renderImage(
                this.state.frontID,
                this.selectFrontIDTapped,
                this.removeFrontID,
              )}
              <View style={{ marginLeft: 10 }}>
                {this.renderImage(
                  this.state.backID,
                  this.selectBackIDTapped,
                  this.removeBackID,
                )}
              </View>
            </View>
          </View>
          <View style={styles.buttonGroupContainer}>
            <Text style={styles.colorText}>
              Chứng nhận (Không bắt buộc, tối đa 3 hình)
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {this.renderImage(
                this.state.certification1,
                this.selectCerti1Tapped,
                this.removeCerti1,
              )}
              <View style={{ marginLeft: 10 }}>
                {this.state.certification1 === ''
                  ? null
                  : this.renderImage(
                      this.state.certification2,
                      this.selectCerti2Tapped,
                      this.removeCerti2,
                    )}
              </View>
              <View style={{ marginLeft: 10 }}>
                {this.state.certification2 === ''
                  ? null
                  : this.renderImage(
                      this.state.certification3,
                      this.selectCerti3Tapped,
                      this.removeCerti3,
                    )}
              </View>
            </View>
          </View>

          <Button
            label="Cập Nhật"
            buttonTextStyle={styles.updateTextButton}
            buttonStyle={styles.updateButton}
            buttonFunc={this.onUpdate}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default CreateProfileScreen;
