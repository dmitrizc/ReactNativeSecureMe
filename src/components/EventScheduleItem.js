import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventScheduleItem = ({ title, isActive, address, date, time, style, isSubscribed }) => {
  const wrapperStyle = isSubscribed ? [styles.wrapper, styles.wrapperSubscribed] : styles.wrapper;

  return (
    <View style={wrapperStyle}>
      <View style={styles.titleLine}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.status, isActive ? styles.statusActive : styles.statusInactive]} />
      </View>
      <Text style={styles.text}>{address}</Text>
      <View style={styles.datetimeLine}>
        <Text style={styles.text}>{date}</Text>
        <Text style={styles.text}>{time}</Text>
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
    paddingVertical: 15,
    paddingHorizontal: 9,
  },
  wrapperSubscribed: {
    backgroundColor: 'rgba(118, 188, 255, 0.2)',
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    width: '100%',
  },
  title: {
    flex: 1,
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 13,
    color: '#6b91bd',
  },
  status: {
    flex: 0,
    marginLeft: 3,
    width: 6,
    height: 6,
    borderRadius: 5,
    overflow: 'hidden',
  },
  statusActive: {
    backgroundColor: '#8bc53f',
  },
  statusInactive: {
    backgroundColor: '#fbb03b',
  },
  text: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: '#989c9f',
  },
  datetimeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    width: '100%',
  },
});

export { EventScheduleItem };
