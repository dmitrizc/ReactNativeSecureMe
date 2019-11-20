import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

import imgDefaultAvatar from '../../assets/images/DefaultAvatar.png';

const UserAvatar = ({ style, size, onPress, source }) => {
  const wrapperStyle = [styles.wrapper, style];
  switch (size) {
    case 'big':
      wrapperStyle.push(styles.bigWrapper);
      break;
    case 'small':
    default:
      wrapperStyle.push(styles.smallWrapper);
      break;
  }

  return (
    <View style={wrapperStyle}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.image} source={source || imgDefaultAvatar} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    borderColor: '#f4f4f4',
    backgroundColor: '#f4f4f4',
    overflow: 'hidden',
  },
  smallWrapper: {
    width: 52,
    height: 52,
    borderRadius: 30,
    borderWidth: 3,
  },
  bigWrapper: {
    width: 103,
    height: 103,
    borderRadius: 60,
    borderWidth: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export { UserAvatar };

