import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const LoginTextInput = ({ value, onChangeText, icon, ...props }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconWrapper}>{icon}</View>
      <View style={styles.textInputWrapper}>
        <TextInput style={styles.textInput} value={value} onChangeText={onChangeText} {...props} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: '#d1d1d1',
    borderRadius: 3,
    width: '100%',
    height: 35,
    backgroundColor: 'transparent',
  },
  iconWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 42,
    height: '100%',
    backgroundColor: 'transparent',
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    height: '100%',
    backgroundColor: '#d1d1d1',
  },
  textInput: {
    flex: 1,
    paddingLeft: 0,
    width: '100%',
    height: 33,
    backgroundColor: '#d1d1d1',
    color: '#7e7e78',
    fontFamily: 'Raleway SemiBold',
    fontSize: 12,
  },
});

export { LoginTextInput };
