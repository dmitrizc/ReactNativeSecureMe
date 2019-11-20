import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const OutlinedButton = ({ title, onPress, style, ...props }) => {
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
    borderWidth: 2,
    borderColor: '#ff5386',
    borderRadius: 3,
    width: '100%',
    height: 37,
    backgroundColor: 'white',
  },
  title: {
    color: '#ff5386',
    fontFamily: 'Raleway Medium',
    fontSize: 15,
  },
});

export { OutlinedButton };
