import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavigationActions, SwitchActions, withNavigation } from 'react-navigation';
import { get as getDeep } from 'getobject';

import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { logout } from '../redux/actions/auth';
import { toggleMenu } from '../redux/actions/app';
import { makeURL } from '../utils/makeUrl';
import { UserAvatar } from '../components/UserAvatar';

import imgMainBg from '../../assets/images/MainScreen/MainBG.png';
import imgMenuHomeIcon from '../../assets/images/Menu/MenuHomeIcon.png';
import imgMenuCalendarIcon from '../../assets/images/Menu/MenuCalendarIcon.png';
import imgMenuProfileIcon from '../../assets/images/Menu/MenuProfileIcon.png';
import imgMenuLogoutIcon from '../../assets/images/Menu/MenuLogoutIcon.png';

const _DrawerMenu = ({ navigation, logout, toggleMenu, profile }) => {
  const handleGotoHome = () => {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'Dashboard' }));
    toggleMenu(false);
  };

  const handleGotoEvents = () => {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'MyEventsScreen' }));
    toggleMenu(false);
  };

  const handleGotoProfile = () => {
    navigation.dispatch(NavigationActions.navigate({ routeName: 'ProfileScreen' }));
    toggleMenu(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.log(e);
    }

    navigation.dispatch(SwitchActions.jumpTo({ routeName: 'AuthLoading' }));
    toggleMenu(false);
  };

  const avatarUrl = makeURL(getDeep(profile, 'avatar'));
  const firstName = getDeep(profile, 'first_name') || '';
  const lastName = getDeep(profile, 'last_name') || '';
  const name = `${firstName} ${lastName}`;

  return (
    <View style={styles.wrapper}>
      <ImageBackground style={styles.mainBg} source={imgMainBg}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ScrollView style={styles.scrollWrapper} contentContainerStyle={styles.scrollContentStyle}>
            <UserAvatar style={styles.userAvatar} size="big" source={avatarUrl} />
            <Text style={styles.username}>{name}</Text>
            <Text style={styles.email}>{profile.email || ''}</Text>
            <View style={styles.divider} />

            <View style={styles.menuList}>
              <TouchableOpacity style={styles.menuItem} onPress={handleGotoHome}>
                <View style={styles.menuItemIconWrapper}>
                  <Image style={styles.menuItemHomeIcon} source={imgMenuHomeIcon} />
                </View>
                <Text style={styles.menuItemTitle}>HOME</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleGotoEvents}>
                <View style={styles.menuItemIconWrapper}>
                  <Image style={styles.menuItemCalendarIcon} source={imgMenuCalendarIcon} />
                </View>
                <Text style={styles.menuItemTitle}>MY EVENTS</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem} onPress={handleGotoProfile}>
                <View style={styles.menuItemIconWrapper}>
                  <Image style={styles.menuItemProfileIcon} source={imgMenuProfileIcon} />
                </View>
                <Text style={styles.menuItemTitle}>MY PROFILE</Text>
              </TouchableOpacity>

              <View style={styles.dividerSmall} />

              <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                <View style={styles.menuItemIconWrapper}>
                  <Image style={styles.menuItemLogoutIcon} source={imgMenuLogoutIcon} />
                </View>
                <Text style={styles.menuItemTitle}>LOGOUT</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  mainBg: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  safeContentWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContentStyle: {
    paddingHorizontal: 8,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  userAvatar: {
    marginTop: 41,
    marginBottom: 18,
  },
  username: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'center',
  },
  email: {
    marginBottom: 16,
    fontFamily: 'SourceSansPro Regular',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  divider: {
    flex: 0,
    marginBottom: 35,
    height: 0,
    borderTopWidth: 0.3,
    borderTopColor: 'rgba(233, 238, 233, 0.3)',
    width: '100%',
  },
  menuList: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    width: '100%',
  },
  menuItem: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: 42,
  },
  menuItemIconWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 9,
    width: 32,
    height: '100%',
  },
  menuItemHomeIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  menuItemCalendarIcon: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  menuItemProfileIcon: {
    width: 18,
    height: 21,
    resizeMode: 'contain',
  },
  menuItemLogoutIcon: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  menuItemTitle: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 15,
    color: '#d1cece',
  },
  dividerSmall: {
    flex: 0,
    marginTop: 15,
    marginBottom: 9,
    height: 0,
    borderTopWidth: 0.3,
    borderTopColor: 'rgba(233, 238, 233, 0.3)',
    width: '100%',
  },
});

const mapStateToProps = state => ({
  profile: state.rootReducer.auth.profile,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout,
  toggleMenu,
}, dispatch);

const DrawerMenu = withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(_DrawerMenu),
);

export { DrawerMenu };
