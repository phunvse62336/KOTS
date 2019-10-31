import React, { Component } from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  Dimensions,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  GiftedChat,
  Bubble,
  SystemMessage,
  Actions,
} from 'react-native-gifted-chat';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';

import { HeaderMenu } from '../../../Components';
import { Colors } from '../../../Themes';
import { APIFindKnight } from '../../../Services/APIFindKnight';
import FirebaseService from '../../../Services/FirebaseService';
import messages from './messages';

export class SOSMessageScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerTitle: 'Sự cố #321',
      headerTintColor: Colors.appColor,
      headerTitleStyle: { color: Colors.appColor, fontWeight: 'bold' },
      headerRight: (
        <HeaderMenu
          item={navigation.getParam('item', 'abc')}
          phoneNumber={params ? navigation.state.params.phoneNumber : 'abc'}
          navigation={navigation}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      inverted: false,
      step: 0,
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      item: this.props.navigation.state.params.item,
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      latitude: '',
      longitude: '',
      user: {},
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
  }

  async componentDidMount() {
    this.watchLocation();
    let user = await AsyncStorage.getItem('USER');
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    this.setState({ user: JSON.parse(user) });
    FirebaseService.setConversationID(
      'messageID/' + this.state.item.id.toString(),
    );
    FirebaseService.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
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
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
    FirebaseService.closeChat();
  }

  watchLocation = () => {
    this.watchID = Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        console.log('item ' + JSON.stringify(position.coords));

        this.setState({
          latitude,
          longitude,
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  onSend = (messages = []) => {
    const step = this.state.step + 1;
    this.setState(previousState => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }];
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      };
    });
    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))
  };

  onLoadEarlier = () => {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true,
      };
    });
  };

  renderBubble = props => {
    return (
      <View>
        {this.renderAudio(props)}
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              backgroundColor: '#f0f0f0',
            },
          }}
        />
      </View>
    );
  };

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    );
  };

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
    const { user } = this.state;
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
      const fileName = `${this.messageIdGenerator()}.aac`;
      const file = {
        uri: Platform.OS === 'ios' ? audioPath : `file://${audioPath}`,
        name: fileName,
        type: 'audio/aac',
      };
      FirebaseService.uploadAudio(file).then(url => {
        const message = {};
        message._id = this.messageIdGenerator();
        message.createdAt = Date.now();
        message.user = {
          _id: FirebaseService.getUid(),
          name: `${user.name}`,
          avatar: user.avatar,
        };
        message.text = '';
        message.audio = url;
        message.messageType = 'audio';
        console.log('message' + JSON.stringify(message));
        FirebaseService.sendMessageAudio(message);
      });
    }
  };
  messageIdGenerator() {
    // generates uuid.
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = Math.random() * 16 || 0,
        v = c === 'x' ? r : (r && 0x3) || 0x8;
      return v.toString(16);
    });
  }
  renderAudio = props => {
    console.log(JSON.stringify(props.currentMessage) + 'abc ne');
    return !props.currentMessage.audio ? (
      <View />
    ) : (
      <Ionicons
        name="ios-play"
        size={35}
        color={this.state.playAudio ? 'red' : 'blue'}
        style={{
          left: 90,
          position: 'relative',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          backgroundColor: 'transparent',
        }}
        onPress={() => {
          console.log(JSON.stringify(props.currentMessage.audio) + ' props ne');

          this.setState({
            playAudio: true,
          });

          const sound = new Sound(props.currentMessage.audio, '', error => {
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
        }}
      />
    );
  };
  // onSendFromUser = (messages = []) => {
  //   const createdAt = new Date();
  //   const messagesToUpload = messages.map(message => ({
  //     ...message,
  //     user,
  //     createdAt,
  //     _id: Math.round(Math.random() * 1000000),
  //   }));
  //   this.onSend(messagesToUpload);
  // };
  renderAndroidMicrophone(props) {
    if (Platform.OS === 'android') {
      return (
        <TouchableOpacity
          style={{
            bottom: 5,
            right: 10,
            position: 'absolute',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            zIndex: 2,
            backgroundColor: Colors.appColor,
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.handleAudio}>
          <Ionicons
            name="ios-mic"
            size={35}
            color={this.state.startAudio ? 'red' : 'white'}
          />
        </TouchableOpacity>
      );
    }
  }

  renderAccessoryBar(props) {
    <View
      style={{
        height: 44,
        width: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: 'rgba(0,0,0,0.3)',
      }}>
      <TouchableOpacity>
        <MaterialIcons size={30} color="rgba(0,0,0,0.5)" name="photo" />
      </TouchableOpacity>
    </View>;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderAndroidMicrophone()}

        <GiftedChat
          messages={this.state.messages}
          alwaysShowSend
          renderBubble={this.renderBubble}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          onSend={message => {
            FirebaseService.sendMessage(message);
          }}
          renderAccessory={props => this.renderAccessoryBar(props)}
          user={{
            _id: FirebaseService.getUid(),
            name: this.state.user.name,
            avatar: 'https://placeimg.com/140/140/any',
          }}
        />
      </View>
    );
  }
}

export default SOSMessageScreen;
