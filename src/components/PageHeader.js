import React, { Fragment } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

import imgMenuIcon from '../../assets/images/Menu/MenuIcon.png';
import imgNotificationIcon from '../../assets/images/Menu/NotificationIcon.png';
import imgMenuBackIcon from '../../assets/images/Menu/MenuBackIcon.png';
import imgLogo from '../../assets/images/Logo.png';

const HEADER_TYPE = {
  DASHBOARD: 'dashboard-header',
  MAIN: 'main-header',
  SUB: 'sub-header',
};

const HeaderButton = ({ children, style, ...props }) => (
  <TouchableOpacity style={[styles.headerButton, style]} {...props}>
    {children}
  </TouchableOpacity>
);

const PageHeader = ({ title, type, onPressMenu, onPressNotification, onPressBack, style, ...props }) => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      {type === HEADER_TYPE.MAIN && (
        <Fragment>
          <HeaderButton onPress={onPressMenu}>
            <Image style={styles.menuBtnIcon} source={imgMenuIcon} />
          </HeaderButton>

          <Text style={styles.title}>{title}</Text>

          <HeaderButton onPress={onPressNotification}>
            <Image style={styles.notificationBtnIcon} source={imgNotificationIcon} />
          </HeaderButton>
        </Fragment>
      )}
      {type === HEADER_TYPE.DASHBOARD && (
        <Fragment>
          <HeaderButton onPress={onPressMenu}>
            <Image style={styles.menuBtnIcon} source={imgMenuIcon} />
          </HeaderButton>

          <Image style={styles.dashboardLogo} source={imgLogo} />

          <HeaderButton onPress={onPressNotification}>
            <Image style={styles.notificationBtnIcon} source={imgNotificationIcon} />
          </HeaderButton>
        </Fragment>
      )}
      {type === HEADER_TYPE.SUB && (
        <Fragment>
          <HeaderButton onPress={onPressBack}>
            <Image style={styles.menuBackIcon} source={imgMenuBackIcon} />
          </HeaderButton>

          <Text style={styles.title}>{title}</Text>

          <HeaderButton />
        </Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 56,
  },
  headerButton: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 71,
    height: 56,
    backgroundColor: 'transparent',
  },
  title: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 24,
  },
  menuBtnIcon: {
    width: 22,
    height: 15,
    resizeMode: 'contain',
  },
  notificationBtnIcon: {
    width: 20,
    height: 21,
    resizeMode: 'contain',
  },
  menuBackIcon: {
    width: 11,
    height: 22,
    resizeMode: 'contain',
  },
  dashboardLogo: {
    width: 120,
    height: 25,
    resizeMode: 'contain',
  },
});

export { PageHeader, HEADER_TYPE };
