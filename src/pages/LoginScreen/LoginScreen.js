import React, { useState } from 'react';
import { View, SafeAreaView, ScrollView, Image, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../../redux/actions/auth';

import { LoginTextInput } from '../../components/LoginTextInput';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CheckboxInput } from '../../components/CheckboxInput';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import Notifier from '../../utils/notifier';

import imgMainBg from '../../../assets/images/MainScreen/MainBG.png';
import imgLogo from '../../../assets/images/Logo.png';
import imgLoginFormTop from '../../../assets/images/LoginScreen/LoginFormTop.png';
import imgLoginFormBottom from '../../../assets/images/LoginScreen/LoginFormBottom.png';
import imgLoginInputUserIcon from '../../../assets/images/LoginScreen/LoginInputUserIcon.png';
import imgLoginInputLockIcon from '../../../assets/images/LoginScreen/LoginInputLockIcon.png';

const _LoginScreen = ({ navigation, login, isPostingLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formHeight, saveFormHeight] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = () => {
    if (username.length && password.length) {
      login({ username, password })
        .then(res => {
          navigation.navigate('Dashboard');
        })
        .catch(e => {
          Notifier.error('Login Failed', 'Can not login with provided credentials');
        });
    } else {
      Notifier.error('Enter Credential', 'Please Enter Email and Password');
    }
  };

  const handleLoginLayout = e => {
    const { height } = e.nativeEvent.layout;
    saveFormHeight(height);
  };

  const paddingVertical = (Dimensions.get('window').height - formHeight) / 2 - 100;

  const paddingStyle = {
    paddingVertical: paddingVertical > 0 ? paddingVertical : 0,
  };

  const containerStyle = {
    opacity: formHeight ? 1 : 0,
  };

  return (
    <View style={styles.wrapper}>
      {isPostingLogin && <LoadingIndicator />}
      <ImageBackground style={styles.mainBg} source={imgMainBg}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ScrollView
            style={[styles.scrollWrapper, containerStyle]}
            contentContainerStyle={[styles.scrollContentStyle, paddingStyle]}
          >
            <Image style={styles.logo} source={imgLogo} />
            <View style={styles.loginForm} onLayout={handleLoginLayout}>
              <Image style={styles.loginFormTop} source={imgLoginFormTop} />
              <LoginTextInput
                value={username}
                onChangeText={setUsername}
                editable={!isPostingLogin}
                icon={<Image source={imgLoginInputUserIcon} style={styles.loginInputUserIcon} />}
                autoCompleteTye="email"
                placeholder="USERNAME"
              />
              <LoginTextInput
                value={password}
                onChangeText={setPassword}
                editable={!isPostingLogin}
                icon={<Image source={imgLoginInputLockIcon} style={styles.loginInputLockIcon} />}
                autoCompleteTye="password"
                placeholder="PASSWORD"
                secureTextEntry
              />
              <PrimaryButton style={styles.submitBtn} disabled={isPostingLogin} title="LOGIN" onPress={handleSubmit} />
              <CheckboxInput
                style={styles.rememberMe}
                title="Remember me"
                value={rememberMe}
                onChange={setRememberMe}
              />
              <Image style={styles.loginFormBottom} source={imgLoginFormBottom} />
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginTop: 30,
    width: '70%',
    height: 60,
    resizeMode: 'contain',
  },
  loginForm: {
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: 33,
    marginBottom: 25,
    width: '70%',
  },
  loginFormTop: {
    marginBottom: 30,
    width: '100%',
    height: 100,
    resizeMode: 'contain',
  },
  loginInputUserIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  loginInputLockIcon: {
    width: 16,
    height: 21,
    resizeMode: 'contain',
  },
  submitBtn: {
    marginTop: 7,
    marginBottom: 35,
  },
  rememberMe: {
    marginBottom: 35,
  },
  loginFormBottom: {
    width: '100%',
    height: 1,
    resizeMode: 'stretch',
    opacity: 0.4,
  },
});

const mapStateToProps = state => ({
  isPostingLogin: state.rootReducer.auth.isPostingLogin,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login,
    },
    dispatch,
  );

const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_LoginScreen);

export { LoginScreen };
