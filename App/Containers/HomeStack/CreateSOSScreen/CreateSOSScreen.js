import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Picker,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-root-toast';

import Colors from '../../../Themes/Colors';
import Button from '../../../Components/Button';
import FirebaseService from '../../../Services/FirebaseService';
import { APISendSOS } from '../../../Services/APISendSOS';
import styles from './CreateSOSScreenStyles';
import { MESSAGES } from '../../../Utils/Constants';

const { width, height } = Dimensions.get('window');

export default class CreateSOSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      spinner: false,
      toast: false,

      height: 0,
      latitude: this.props.navigation.state.params.latitude,
      longitude: this.props.navigation.state.params.longitude,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      message: '',
      photoSource: null,
      videoSource: null,
      audioSource: null,
      startAudio: false,
      playAudio: false,
      audioPath: AudioUtils.MusicDirectoryPath + '/test.aac',
      stoppedRecording: false,

      audioSettings: {
        SampleRate: 22050,
        Channels: 1,
        AudioQuality: 'Low',
        AudioEncoding: 'aac',
        MeteringEnabled: true,
        IncludeBase64: true,
        AudioEncodingBitRate: 32000,
      },
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }

  componentDidMount() {
    this.checkPermission().then(async hasPermission => {
      this.setState({ hasPermission });
      if (!hasPermission) {
        return;
      }
      await AudioRecorder.prepareRecordingAtPath(
        this.state.audioPath,
        this.state.audioSettings,
      );
      AudioRecorder.onProgress = data => {
        console.log(data, 'onProgress data');
      };
      AudioRecorder.onFinished = data => {
        console.log(data, 'on finish');
      };
    });
  }

  checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }
    const rationale = {
      title: 'Microphone Permission',
      message:
        'AudioExample needs access to your microphone so you can record audio.',
    };
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      rationale,
    ).then(result => {
      console.log('Permission result:', result);
      return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    });
  }

  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }

  handleAudio = async () => {
    if (!this.state.startAudio) {
      if (this.state.stoppedRecording) {
        this.prepareRecordingPath(this.state.audioPath);
      }
      this.setState({
        startAudio: true,
      });
      await AudioRecorder.startRecording();
    } else {
      this.setState({ startAudio: false, stoppedRecording: true });
      await AudioRecorder.stopRecording();
      const { audioPath } = this.state;
      const fileName = 'test.aac';
      const file = {
        uri: Platform.OS === 'ios' ? audioPath : `file://${audioPath}`,
        name: fileName,
        type: 'audio/aac',
      };
      this.setState({
        photoSource: null,
        videoSource: null,
        audioSource: file,
      });

      // FirebaseService.uploadAudio(file).then(url => {
      //   const message = {};
      //   message._id = this.messageIdGenerator();
      //   message.createdAt = Date.now();
      //   message.user = {
      //     _id: FirebaseService.getUid(),
      //     name: `${user.name}`,
      //     avatar: user.avatar,
      //   };
      //   message.text = '';
      //   message.audio = url;
      //   message.messageType = 'audio';
      //   console.log('message' + JSON.stringify(message));
      //   FirebaseService.sendMessageAudio(message);
      // });
    }
  };

  sendHelp = () => {
    const { longitude, latitude, phoneNumber, message } = this.state;

    this.setState({ spinner: true });
    if (this.state.photoSource != null) {
      FirebaseService.uploadImage(this.state.photoSource)
        .then(async url => {
          console.log(url);
          let responseStatus = await APISendSOS(
            phoneNumber,
            message,
            longitude,
            latitude,
            MESSAGES.TYPE_CASE.NORMAL,
            url,
            null,
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
        .catch(error => {
          console.log(error);
          this.setState({
            spinner: false,
          });
        });
    }
  };

  selectPhotoTapped() {
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
        this.setState({
          photoSource: image,
          videoSource: null,
          audioSource: null,
        });
        // FirebaseService.uploadImage(image)
        //   .then(url => {
        //     alert('uploaded');
        //     this.setState({
        //       photoSource: url,
        //       videoSource: null,
        //       audioSource: null,
        //     });
        //   })
        //   .catch(error => console.log(error));
      }
    });
  }

  selectVideoTapped() {
    const options = {
      title: 'Video Picker',
      takePhotoButtonTitle: 'Take Video...',
      mediaType: 'video',
      videoQuality: 'medium',
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          videoSource: response.uri,
          audioSource: null,
          photoSource: null,
        });
      }
    });
  }

  // onChangeTextMessage = text => this.setState({message: text});

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
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
        <View style={styles.viewCase}>
          <Text style={styles.pickerText}>Trường Hợp</Text>
          <View style={styles.viewPicker}>
            <Picker
              selectedValue={this.state.language}
              style={styles.casePicker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ language: itemValue })
              }>
              <Picker.Item label="Java" value="java" />
              <Picker.Item label="JavaScript" value="js" />
            </Picker>
          </View>
        </View>
        <View style={styles.viewMessage}>
          <View style={styles.inputViewContainer}>
            <View style={styles.inputViewLabel}>
              <Text style={styles.colorText}>Tin Nhắn</Text>
            </View>
            <TextInput
              style={[
                styles.inputView,
                { height: Math.max(35, this.state.height) },
              ]}
              multiline={true}
              onChangeText={text => this.setState({ message: text })}
              onContentSizeChange={event => {
                this.setState({ height: event.nativeEvent.contentSize.height });
              }}
              placeholder="Viết vài dòng cho hiệp sĩ"
            />
          </View>
        </View>
        <View style={styles.viewMedia}>
          <TouchableOpacity
            style={styles.mediaTouchable}
            onPress={this.handleAudio}>
            <Icon
              name="microphone"
              size={40}
              color={this.state.startAudio ? 'red' : 'white'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaTouchable}
            onPress={this.selectPhotoTapped.bind(this)}>
            <Icon name="camera" size={40} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.mediaTouchable}
            onPress={this.selectVideoTapped.bind(this)}>
            <Icon name="video-camera" size={40} color="#ffffff" />
          </TouchableOpacity>
        </View>
        {this.state.photoSource === null ? null : (
          <Image
            style={styles.avatar}
            source={{ uri: this.state.photoSource.image }}
          />
        )}
        {this.state.videoSource && (
          <Video
            source={this.state.videoSource} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref;
            }} // Store reference
            onBuffer={this.onBuffer} // Callback when remote video is buffering
            onError={this.videoError} // Callback when video cannot be loaded
            style={styles.backgroundVideo}
          />
        )}
        {this.state.audioSource && (
          <TouchableOpacity
            style={{
              marginTop: 10,
              width: 150,
              height: 70,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.appColor,
              borderRadius: 25,
            }}
            onPress={() => {
              console.log(
                JSON.stringify(this.state.audioSource.uri) + ' props ne',
              );

              this.setState({
                playAudio: true,
              });

              const sound = new Sound(this.state.audioPath, '', error => {
                if (error) {
                  console.log('failed to load the sound', error);
                }
                this.setState({ playAudio: false });
                sound.play(success => {
                  console.log(success, 'success play');
                  if (!success) {
                    Alert.alert('There was an error playing this audio');
                  }
                });
              });
            }}>
            <Ionicons
              name="ios-play"
              size={50}
              color={this.state.playAudio ? 'red' : 'white'}
            />
          </TouchableOpacity>
        )}
        <View style={styles.viewButton}>
          <Button
            label="Yêu cầu giúp đỡ"
            title="Yêu cầu giúp đỡ"
            buttonTextStyle={styles.buttonHelpText}
            buttonStyle={styles.buttonHelp}
            buttonFunc={this.sendHelp}
          />
        </View>
      </ScrollView>
    );
  }
}
