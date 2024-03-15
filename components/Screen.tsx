import { View, SafeAreaView, ViewProps } from 'react-native';
import React, { PropsWithChildren } from 'react';

const Screen = ({ style, ...props }: ViewProps & PropsWithChildren) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[{ flex: 1 }, style]}>{props.children}</View>
    </SafeAreaView>
  );
};

export default Screen;
