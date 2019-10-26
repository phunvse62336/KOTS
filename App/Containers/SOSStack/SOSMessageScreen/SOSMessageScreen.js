import React, { Component } from 'react';
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { GiftedChat, Bubble, SystemMessage } from 'react-native-gifted-chat';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-community/async-storage';

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
    };
  }

  async componentDidMount() {
    this.watchLocation();
    let user = await AsyncStorage.getItem('USER');
    let phoneNumber = await AsyncStorage.getItem('PHONENUMBER');
    this.setState({ user: user });
    FirebaseService.setConversationID(this.state.item.id.toString());
    FirebaseService.loadMessages(message => {
      this.setState(previousState => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
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
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
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

  render() {
    return (
      <View style={{ flex: 1 }}>
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
          user={{
            _id: FirebaseService.getUid(),
            name: this.state.user.name,
          }}
        />
      </View>
    );
  }
}

export default SOSMessageScreen;
