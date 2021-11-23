import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export const ScreenFrame: React.FunctionComponent = ({ children }) => {
  return <SafeAreaView style={styles.safeAreaView}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
