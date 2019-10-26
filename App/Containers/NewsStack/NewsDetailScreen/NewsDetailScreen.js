import React, { Component } from 'react';
import { View, Text, Image, ScrollView, Dimensions } from 'react-native';
import styles from './NewsDetailScreenStyles';
import Moment from 'react-moment';

const { width, height } = Dimensions.get('window');

export default class NewsDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewTitle}>
            <Text style={styles.textTitle}>{this.state.item.title}</Text>
          </View>
          <View style={styles.viewSubDescription}>
            <Text style={styles.textsubDescription}>
              {this.state.item.subDescription}
            </Text>
          </View>
          <View style={styles.viewTime}>
            <Text style={styles.textSource}>{this.state.item.source}</Text>
            <Moment fromNow element={Text} style={styles.textDate}>
              {this.state.item.date}
            </Moment>
          </View>
          <Image
            source={{ uri: this.state.item.image }}
            style={styles.imageNews}
          />

          <View style={styles.viewDescription}>
            <Text style={styles.textDescription}>
              {this.state.item.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
