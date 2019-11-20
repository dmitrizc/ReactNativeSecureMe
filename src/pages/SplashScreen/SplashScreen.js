import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

import { getProfile, getToken } from '../../utils/storage';
import { loginWithStoredToken } from '../../redux/actions/auth';

import imgMainBg from '../../../assets/images/MainScreen/MainBG.png';
import imgLogo from '../../../assets/images/Logo.png';

const _SplashScreen = ({ navigation, loginWithStoredToken }) => {
  const [didFocusSubscription, setDidFocusSubscription] = useState(null);

  useEffect(() => {
    const id = navigation.addListener('didFocus', () => {
      setTimeout(async () => {
        try {
          const token = await getToken();
          const profile = await getProfile();
          loginWithStoredToken(token, profile);
          navigation.navigate(token ? 'App' : 'Auth');
        } catch (e) {
          this.props.navigate('Auth');
        }
      }, 1000);
    });

    setDidFocusSubscription(id);

    return () => {
      if (didFocusSubscription) {
        didFocusSubscription.remove();
      }
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={imgMainBg} style={styles.mainBg}>
        <Image source={imgLogo} style={styles.logo} />
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: '77%',
    resizeMode: 'contain',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loginWithStoredToken,
    },
    dispatch,
  );

const SplashScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_SplashScreen);

export { SplashScreen };
