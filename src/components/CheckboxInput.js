import React from 'react';
import { Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

import imgLoginCheckEmpty from '../../assets/images/LoginScreen/LoginCheckEmpty.png';
import imgLoginCheckFull from '../../assets/images/LoginScreen/LoginCheckFull.png';

const CheckboxInput = ({ value = false, onChange, title, style, ...props }) => {
  const handlePress = () => {
    onChange(!value);
  };

  return (
    <TouchableOpacity style={[styles.wrapper, style]} {...props} onPress={handlePress}>
      <Image style={styles.checkbox} source={value ? imgLoginCheckFull : imgLoginCheckEmpty} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  checkbox: {
    marginRight: 8,
    width: 15,
    height: 15,
  },
  title: {
    color: '#d1d1d1',
    fontFamily: 'OpenSans SemiBold',
    fontSize: 12,
  },
});

export { CheckboxInput };
