import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { APIGetListWaiting } from '../../../Services/APIGetListWaiting';
import { MESSAGES } from '../../../Utils/Constants';
import { Colors } from '../../../Themes';
import { Request } from '../../../Components';
const REQUEST_DATA = ['Tham Gia', 'Rời Khỏi'];
const { width, height } = Dimensions.get('window');
const GenderData = ['Nữ', 'Nam', 'Khác'];

export class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true,
      loading: true,
      teamId: this.props.navigation.state.params.teamId,
      listJoin: [],
      listLeave: [],
      list: 0,
      renderList: [],
    };
  }

  async componentDidMount() {
    let responseStatus = await APIGetListWaiting(this.state.teamId);
    if (responseStatus.result === MESSAGES.CODE.SUCCESS_CODE) {
      console.log('Vô đây');
      this.setState({
        spinner: false,
        loading: false,
        listJoin: responseStatus.data.listJoin,
        listLeave: responseStatus.data.listLeave,
        renderList: responseStatus.data.listJoin,
      });
    } else {
      this.setState({
        spinner: false,
        loading: false,
      });
      alert('Có lỗi, xin vui lòng thử lại sau!!!');
    }
  }

  renderButton = (currentList, indexList, onPress) => (
    <TouchableOpacity
      onPress={() => onPress(indexList)}
      style={{
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={
          currentList === indexList
            ? {
                color: Colors.appColor,
                fontSize: 20,
                textDecorationLine: 'underline',
              }
            : { color: '#343438', fontSize: 20 }
        }>
        {REQUEST_DATA[indexList]}(
        {indexList === 0
          ? this.state.listJoin.length
          : this.state.listLeave.length}
        )
      </Text>
    </TouchableOpacity>
  );

  onListClick = indexValue => {
    if (indexValue === 0) {
      this.setState({ list: indexValue, renderList: this.state.listJoin });
    } else {
      this.setState({ list: indexValue, renderList: this.state.listLeave });
    }
  };

  _renderItem = ({ item, index }) => (
    <Request
      item={item}
      requestAction={this.state.list}
      removeItemJoin={this.removeItemJoin}
      removeItemLeave={this.removeItemLeave}
    />
  );

  removeItemJoin = id => {
    let listJoin = this.state.listJoin;
    listJoin = listJoin.filter(data => data.id !== id);
    this.setState({ listJoin: listJoin, renderList: listJoin });
  };

  removeItemLeave = id => {
    let listLeave = this.state.listLeave;
    listLeave = listLeave.filter(data => data.id !== id);
    this.setState({ listLeave: listLeave, renderList: listLeave });
  };

  render() {
    const { list } = this.state;
    console.log('LIST JOIN' + JSON.stringify(this.state.listJoin));
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Spinner
          visible={this.state.spinner}
          textStyle={{ color: '#fff' }}
          size="large"
        />
        <View
          style={{
            height: 36,
            width: '80%',
            flexDirection: 'row',
            marginTop: 20,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          {this.renderButton(list, 0, this.onListClick)}
          <View style={{ width: 5 }} />
          {this.renderButton(list, 1, this.onListClick)}
          <View style={{ width: 5 }} />
        </View>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={this.state.renderList}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            extraData={this.state}
          />
        </View>
      </View>
    );
  }
}

export default RequestScreen;
