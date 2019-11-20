import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View, ImageBackground, StyleSheet } from 'react-native';

import { toggleMenu } from '../../redux/actions/app';
import { WithMenu } from '../../WithMenu';

import { PageHeader, HEADER_TYPE } from '../../components/PageHeader';
import { ProfileTextInput } from '../../components/ProfileTextInput';
import { PrimaryButton } from '../../components/PrimaryButton';

import imgPageTopBg from '../../../assets/images/PageTopBg.png';

const _ProfilePasswordScreen = ({ navigation, toggleMenu }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <WithMenu>
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ImageBackground style={styles.headerWrapper} source={imgPageTopBg} imageStyle={styles.headerWrapperBg}>
            <PageHeader type={HEADER_TYPE.SUB} title="Change Password" onPressBack={handleGoBack} />
          </ImageBackground>

          <ScrollView style={bodyStyles.bodyScrollWrapper} contentContainerStyle={bodyStyles.bodyScrollWrapperContent}>
            <ProfileTextInput title="OLD PASSWORD*" autoCompleteTye="password" secureTextEntry />
            <ProfileTextInput title="NEW PASSWORD*" autoCompleteTye="password" secureTextEntry />
            <ProfileTextInput title="CONFIRM PASSWORD*" autoCompleteTye="password" secureTextEntry />
            <PrimaryButton style={bodyStyles.changePwdBtn} title="CHANGE PASSWORD" />
          </ScrollView>
        </SafeAreaView>
      </View>
    </WithMenu>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  safeContentWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerWrapper: {
    flex: 0,
    width: '100%',
    minHeight: 56,
    overflow: 'visible',
    zIndex: 2,
  },
  headerWrapperBg: {
    resizeMode: 'cover',
  },
});

const bodyStyles = StyleSheet.create({
  bodyScrollWrapper: {
    flex: 1,
    flexShrink: 0,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
    zIndex: 1,
  },
  bodyScrollWrapperContent: {
    paddingTop: 40,
  },
  changePwdBtn: {
    marginVertical: 45,
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleMenu }, dispatch);

const ProfilePasswordScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ProfilePasswordScreen);

export { ProfilePasswordScreen };
