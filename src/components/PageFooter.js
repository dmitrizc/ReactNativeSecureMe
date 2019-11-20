import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PageFooter = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}> &copy; 2019 THE K STREET GROUP, LLC </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 40,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontFamily: 'SourceSansPro',
    fontSize: 9,
    color: '#969696',
  },
});

export { PageFooter };
