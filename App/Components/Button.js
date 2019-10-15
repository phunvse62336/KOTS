import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {buttonTextStyle, buttonStyle, label, buttonFunc} = this.props;
    return (
      <TouchableOpacity style={buttonStyle} onPress={buttonFunc}>
        <Text style={buttonTextStyle}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  buttonStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object.isRequired,
};
