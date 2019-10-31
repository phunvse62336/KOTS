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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

import Colors from '../../../Themes/Colors';
import Button from '../../../Components/Button';
import FirebaseService from '../../../Services/FirebaseService';
import styles from './CreateSOSScreenStyles';
const { width, height } = Dimensions.get('window');

export default class CreateSOSScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      height: 0,
      latitude: this.props.navigation.state.params.latitude,
      longitude: this.props.navigation.state.params.longitude,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      message: '',
      photoSource: null,
      videoSource: null,
      audioSource: null,
    };
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.selectVideoTapped = this.selectVideoTapped.bind(this);
  }

  sendHelp = () => {
    alert(this.state.message);
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
        if (Platform.OS == 'ios') {
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
            alert('uploaded');
            this.setState({
              photoSource: url,
              videoSource: null,
              audioSource: null,
            });
          })
          .catch(error => console.log(error));
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
          <TouchableOpacity style={styles.mediaTouchable}>
            <Icon name="microphone" size={40} color="#ffffff" />
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
            source={{ uri: this.state.photoSource }}
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
