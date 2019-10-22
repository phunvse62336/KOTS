import React, {Component} from 'react';
import {Text, View, Platform, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {GiftedChat, Bubble, SystemMessage} from 'react-native-gifted-chat';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';

import {HeaderMenu} from '../../../Components';
import {Colors} from '../../../Themes';

import messages from './messages';

export class SOSMessageScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Sự cố #321',
    headerTintColor: Colors.appColor,
    headerTitleStyle: {color: Colors.appColor, fontWeight: 'bold'},
    headerRight: <HeaderMenu />,
  });

  constructor(props) {
    super(props);
    this.state = {
      inverted: false,
      step: 0,
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };
  }

  componentDidMount() {
    this.setState({
      messages: messages,
    });
  }
  onSend = (messages = []) => {
    const step = this.state.step + 1;
    this.setState(previousState => {
      const sentMessages = [{...messages[0], sent: true, received: true}];
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
      <View style={{flex: 1}}>
        <GiftedChat
          messages={this.state.messages}
          alwaysShowSend
          renderBubble={this.renderBubble}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    );
  }
}

export default SOSMessageScreen;
