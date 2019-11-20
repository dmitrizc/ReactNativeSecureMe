import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

import imgEventDefaultIcon from '../../../assets/images/Events/EventsDefaultIcon.png';

const EventItem = ({ image, title, address, status, date, time, ...props }) => {
  return (
    <TouchableOpacity style={styles.wrapper} {...props}>
      <View style={styles.imageWrapper}>
        <Image style={styles.image} source={image || imgEventDefaultIcon} />
      </View>
      <View style={styles.infoWrapper}>
        <Text style={styles.infoTitle}>{title}</Text>
        <View style={styles.addressLine}>
          <Text style={styles.infoText}>{address}</Text>
          <Text style={[styles.infoStatus, status === 'LIVE' ? styles.infoStatusActive : null]}>{status}</Text>
        </View>
        <View style={styles.datetimeLine}>
          <Text style={styles.infoText}>{date}</Text>
          <Text style={styles.infoText}>{time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(153, 157, 163, 0.4)',
    paddingTop: 13,
    paddingRight: 2,
    paddingBottom: 15,
    paddingLeft: 5,
  },
  imageWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    width: 38,
    height: 38,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#dee6ee',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoWrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 5,
  },
  infoTitle: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 13,
    color: '#6B91BD',
  },
  addressLine: {
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoText: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 10,
    color: '#989C9F',
  },
  infoStatus: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 9,
    color: '#989C9F',
  },
  infoStatusActive: {
    color: '#8bc53f',
  },
  datetimeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export { EventItem };
