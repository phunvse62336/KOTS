import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View} from 'react-native';
import {ApplicationStyles} from '../Themes';
const propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

class CustomCallout extends React.Component {
  render() {
    return (
      <View style={[ApplicationStyles.containerCallOut, this.props.style]}>
        <View style={ApplicationStyles.bubbleCallOut}>
          <View style={ApplicationStyles.flexOne}>{this.props.children}</View>
        </View>
        <View style={ApplicationStyles.arrowBorderCallOut} />
        <View style={ApplicationStyles.arrowCallOut} />
      </View>
    );
  }
}

CustomCallout.propTypes = propTypes;

export default CustomCallout;
