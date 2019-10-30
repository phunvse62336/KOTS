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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');
import Colors from '../../../Themes/Colors';
import Button from '../../../Components/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCase: {
    height: 100,
    width: width * 0.8,
    // backgroundColor: '#00fa9a',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  viewMessage: {
    height: 200,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewMedia: {
    flex: 0.2,
    width: width,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginTop: 20,
  },
  viewButton: {
    flex: 0.2,
    width: width * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    height: 200,
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
    position: 'relative',
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
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.appColor,
    borderRadius: 10,
    paddingHorizontal: 20,
    width: width * 0.8,
    fontSize: 15,
    color: Colors.appColor,
    zIndex: -1,
    textAlignVertical: 'top',
  },
  colorText: {
    color: Colors.appColor,
  },
  avatar: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

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
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        alert(JSON.stringify(source));
        this.setState({
          photoSource: source,
          videoSource: null,
          audioSource: null,
        });
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
        {this.state.avatarSource === null ? null : (
          <Image style={styles.avatar} source={this.state.avatarSource} />
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
