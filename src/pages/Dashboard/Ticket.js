import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet } from 'react-native';
import imgDashboardTicketBg from '../../../assets/images/Dashboard/DashboardTicketBg.png';
import imgDefaultEvent from '../../../assets/images/PageTopBg.png';

const Ticket = ({ style, image, title, isLive, venueName, address, date, time }) => {
  return (
    <ImageBackground
      style={[styles.ticketWrapper, style]}
      source={imgDashboardTicketBg}
      imageStyle={styles.ticketWrapperBg}
    >
      <View style={styles.upperPart}>
        <View style={styles.upperImageWrapper}>
          <Image style={styles.upperImage} source={image || imgDefaultEvent} />
        </View>
        <Text style={styles.upperTitle} numberOfLines={2}>
          {title}
        </Text>
      </View>
      <View style={styles.downPart}>
        <View style={styles.downIcon}>{!!isLive && <Text style={styles.downStatus}>LIVE</Text>}</View>
        <View style={styles.downInfo}>
          <Text style={styles.downInfoText}>{venueName}</Text>
          <Text style={[styles.downInfoText, styles.downInfoAddress]}>{address}</Text>
          <View style={styles.downInfoDateTime}>
            <Text style={styles.downInfoText}>{date}</Text>
            <Text style={styles.downInfoText}>{time}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ticketWrapper: {
    flex: 0,
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
    minHeight: 155,
    borderRadius: 5,
    overflow: 'hidden',
  },
  ticketWrapperBg: {
    resizeMode: 'cover',
  },
  upperPart: {
    flex: -1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 17,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 14,
    width: '100%',
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomWidth: 1,
  },
  upperImageWrapper: {
    marginRight: 7,
    width: 52,
    height: 52,
    borderRadius: 30,
    borderColor: '#f4f4f4',
    borderWidth: 3,
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
  },
  upperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  upperTitle: {
    flex: 1,
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 16,
    color: 'white',
  },
  downPart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
    paddingRight: 16,
    width: '100%',
  },
  downIcon: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginRight: 7,
    width: 52,
  },
  downStatus: {
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 2,
    paddingTop: 2,
    paddingBottom: 1,
    paddingHorizontal: 6,
    backgroundColor: '#8bc53f',
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 11,
    color: 'white',
    overflow: 'hidden',
  },
  downInfo: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  downInfoText: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: 'white',
  },
  downInfoAddress: {
    marginBottom: 15,
  },
  downInfoDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export { Ticket };
