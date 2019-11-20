import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const ProfileTextInput = ({ value, onChangeText, style, title, ...props }) => {
  return (
    <View style={[styles.wrapper, style]}>
      <Text style={styles.title}>{title}</Text>
      <TextInput style={styles.textInput} value={value} onChangeText={onChangeText} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginBottom: 20,
    borderBottomColor: 'rgba(84, 84, 84, 0.43)',
    borderBottomWidth: 0.3,
  },
  title: {
    marginBottom: 6,
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: '#cccccc',
  },
  textInput: {
    marginBottom: 3,
    padding: 0,
    height: 24,
    fontFamily: 'SourceSansPro Regular',
    fontSize: 18,
    color: '#808080',
  },
});

export { ProfileTextInput };
