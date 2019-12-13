import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const { width, height } = Dimensions.get('window');
import { Colors, Images } from '../../../Themes';
import Button from '../../../Components/Button';
import { placeholder } from '@babel/types';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-picker';

import Toast from 'react-native-root-toast';
import { APIReportCase } from '../../../Services/APIReportCase';
import { MESSAGES } from '../../../Utils/Constants';
import FirebaseService from '../../../Services/FirebaseService';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  viewCase: {
    flex: 0.2,
    width: width * 0.8,
    // backgroundColor: '#00fa9a',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewMessage: {
    height: 70,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  viewMedia: {
    flex: 0.2,
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  viewButton: {
    flex: 0.5,
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  casePicker: {
    height: 40,
    width: '100%',
  },
  viewPicker: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.appColor,
    overflow: 'hidden',
  },
  pickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.appColor,
  },
  inputMessage: {
    width: '100%',
    height: 100,
  },
  mediaTouchable: {
    marginRight: 5,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: Colors.appColor,
    borderRadius: 50,
    marginTop: 50,
  },
  buttonHelp: {
    width: '100%',
    backgroundColor: Colors.appColor,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonHelpText: {
    color: 'white',
    fontSize: 18,
  },
  inputViewContainer: {
    height: '100%',
    marginTop: 25,
  },
  inputViewLabel: {
    position: 'absolute',
    backgroundColor: '#fff',
    top: -15,
    left: 15,
    padding: 5,
    zIndex: 0,
  },
  inputView: {
    borderWidth: 2,
    borderColor: Colors.appColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
    fontSize: 15,
    color: Colors.appColor,
    zIndex: -1,
  },
  colorText: {
    color: Colors.appColor,
  },
});

class CaseReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      image: '',
      item: this.props.navigation.state.params.item,
      notice: '',
    };
  }

  onChangeTextName = text => this.setState({ name: text });

  onChangeTextAge = text => this.setState({ age: text });

  onChangeTextDes = text => this.setState({ notice: text });

  sendFeedBack = () => {
    const { image, name, notice, age, item } = this.state;
    if (image === '' || name === '' || age === '') {
      this.setState({ spinner: true });

      FirebaseService.uploadImage(image)
        .then(async url => {
          // alert('uploaded');
          let responseStatus = await APIReportCase(
            item.id,
            notice,
            name,
            age,
            url,
          );
          if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
            console.log(JSON.stringify(responseStatus));
            this.setState({
              toast: true,
              spinner: false,
            });
            setTimeout(() => {
              this.setState({
                toast: false,
              });
            }, 3000); // hide toast after 5s
            setTimeout(() => {
              this.props.navigation.navigate('HomeScreen');
            }, 4000); // hide toast after 5s
          } else {
            this.setState({
              spinner: false,
            });

            alert('Không gửi được. Vui lòng thử lại sau');
          }

          setTimeout(
            () =>
              this.setState({
                toast: false,
              }),
            5000,
          ); // hide toast after 5s
        })
        .catch(error => console.log(error));
    } else {
      alert('Vui lòng điền hết thông tin');
    }
  };

  selectImage = () => {
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
        this.setState({ image: image });
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ alignItems: 'center' }}
          style={{ flex: 1 }}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Đang Xử Lý'}
            textStyle={{ color: '#fff' }}
            size="large"
          />
          <Toast
            visible={this.state.toast}
            position={Toast.positions.CENTER}
            shadow={false}
            animation={false}
            hideOnPress={true}>
            Gửi Thành Công
          </Toast>
          <View style={styles.viewMessage}>
            <View style={styles.inputViewContainer}>
              <View style={styles.inputViewLabel}>
                <Text style={styles.colorText}>Tên</Text>
              </View>
              <TextInput
                style={[styles.inputView]}
                onChangeText={this.onChangeTextName}
              />
            </View>
          </View>
          <View style={styles.viewMessage}>
            <View style={styles.inputViewContainer}>
              <View style={styles.inputViewLabel}>
                <Text style={styles.colorText}>Tuổi</Text>
              </View>
              <TextInput
                style={[styles.inputView]}
                onChangeText={this.onChangeTextAge}
              />
            </View>
          </View>
          <View style={styles.viewMessage}>
            <View style={styles.inputViewContainer}>
              <View style={styles.inputViewLabel}>
                <Text style={styles.colorText}>Chi tiết (Tùy chọn)</Text>
              </View>
              <TextInput
                multiline={true}
                onChangeText={this.onChangeTextDes}
                style={{
                  borderWidth: 2,
                  borderColor: Colors.appColor,
                  borderRadius: 10,
                  paddingHorizontal: 20,
                  width: width * 0.8,
                  fontSize: 15,
                  color: Colors.appColor,
                  zIndex: -1,
                  height: 100,
                }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity
                style={styles.mediaTouchable}
                onPress={this.selectImage.bind(this)}>
                <Icon name="camera" size={40} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.image === '' ? null : (
            <Image
              source={{
                uri: this.state.image.image,
              }}
              style={{
                width: width * 0.4,
                height: height * 0.4,
                marginBottom: 20,
              }}
            />
          )}
          <View style={styles.viewButton}>
            <Button
              label="Gửi báo cáo"
              title="Gửi báo cáo"
              buttonTextStyle={styles.buttonHelpText}
              buttonStyle={styles.buttonHelp}
              buttonFunc={this.sendFeedBack}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CaseReportScreen;
