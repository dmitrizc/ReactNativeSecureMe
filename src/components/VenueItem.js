import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';

const VenueItem = ({ title, address, category, phone }) => {
  const handlePressPhone = phone => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:$\{${phone}\}`;
    } else {
      phoneNumber = `telprompt:$\{${phone}\}`;
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.titleLine}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.text}>{address}</Text>
      <View style={styles.categoryPhoneLine}>
        <Text style={styles.text}>{category}</Text>
        <TouchableOpacity onPress={() => handlePressPhone(phone)}>
          <Text style={styles.text}>{phone}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    borderTopColor: 'rgba(153, 157, 163, 0.4)',
    borderTopWidth: 1,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    width: '100%',
  },
  title: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 17,
    color: '#6b91bd',
  },
  text: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 14,
    color: '#989c9f',
  },
  categoryPhoneLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    width: '100%',
  },
});

export { VenueItem };
