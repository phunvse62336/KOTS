import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Container} from 'native-base';

const FullScreenLoadingHOC = (Comp: Object) => ({
  spinner,
  backgroundTopHeader = 'transparent',
  children,
  ...props
}: Object) => (
  <Container style={{flex: 1, backgroundColor: backgroundTopHeader}}>
    <Comp {...props}>{children}</Comp>
    {spinner && (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center',
          },
        ]}>
        <ActivityIndicator size="large" />
      </View>
    )}
  </Container>
);

export default FullScreenLoadingHOC(View);
