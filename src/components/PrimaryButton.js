import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ title, onPress, style, ...props }) => {
  return (
    <TouchableOpacity style={[styles.wrapper, style]} onPress={onPress} {...props}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ff5386',
    borderRadius: 3,
    width: '100%',
    height: 35,
    backgroundColor: '#ff5386',
  },
  title: {
    color: '#fff',
    fontFamily: 'Raleway Medium',
    fontSize: 15,
  },
});

export { PrimaryButton };
