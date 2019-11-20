import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, TouchableOpacity, View, ImageBackground, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';

import { toggleMenu } from '../../redux/actions/app';
import { getProfile, editProfile, patchProfile } from '../../redux/actions/auth';
import { WithMenu } from '../../WithMenu';

import { PageHeader, HEADER_TYPE } from '../../components/PageHeader';
import { UserAvatar } from '../../components/UserAvatar';
import { ProfileTextInput } from '../../components/ProfileTextInput';
import { OutlinedButton } from '../../components/OutlineButton';
import { PrimaryButton } from '../../components/PrimaryButton';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import imgPageTopBg from '../../../assets/images/PageTopBg.png';
import { makeURL } from '../../utils/makeUrl';
import { dataURItoBlob } from '../../utils/dataURI toBlob';
import { get as getDeep } from 'getobject';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose photo from FB' }],
  cameraType: 'front',
  mediaType: 'photo',
  storageOptions: {
    skipBackup: true,
    path: 'photos',
  },
};

const _ProfileScreen = ({
  navigation,
  toggleMenu,
  profile,
  isFetchingProfile,
  isPatchingProfile,
  isProfileEdited,
  editProfile,
  getProfile,
  patchProfile,
}) => {
  const [didFocusSubscription, setDidFocusSubscription] = useState(null);
  const [datePickerShown, setDatePickerShown] = useState(false);

  useEffect(() => {
    getProfile();

    const id = navigation.addListener('willFocus', payload => {
      if (getDeep(payload, 'state.routeName') === 'ProfileScreen') {
        console.log('Did focus', 'Profile Screen');

        getProfile();
      }
    });

    setDidFocusSubscription(id);

    return () => {
      if (didFocusSubscription) {
        didFocusSubscription.remove();
      }
    };
  }, []);

  const handleOpenMenu = () => {
    toggleMenu(true);
  };

  const handleOpenPwdChange = () => {
    navigation.push('ProfilePasswordScreen');
  };

  const handlePatchProfile = () => {
    patchProfile(profile);
  };

  const handleChangeDate = (e, date) => {
    setDatePickerShown(false);

    if (date) {
      editProfile('date_joined', moment(date).toISOString());
    }
  };

  const handleChooseAvatar = () => {
    console.log('Showing Image Picker');

    ImagePicker.showImagePicker(options, response => {
      console.log('Response from Image Picker', response);

      if (response.didCancel) {
        console.log('User cancelled Image Picker');
      } else if (response.error) {
        console.log('Image Picker Error', response.error);
      } else if (response.customButton) {
        console.log('Custom Button from Image Picker');
      } else {
        console.log('User selected Image');

        editProfile('avatar_new', response.uri);
        editProfile('avatar_new_blob', `data:image/jpeg;base64,${response.data}`);
      }
    });
  };

  const avatarUrl = makeURL(getDeep(profile, 'avatar'));
  const dateJoined = moment((profile && profile.date_joined) || undefined);

  const newAvatarUri = getDeep(profile, 'avatar_new');
  const newAvatarSource = { uri: newAvatarUri };

  const avatarToShow = newAvatarUri ? newAvatarSource : avatarUrl;

  return (
    <WithMenu>
      {(isFetchingProfile || isPatchingProfile) && <LoadingIndicator />}
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ImageBackground style={styles.headerWrapper} source={imgPageTopBg} imageStyle={styles.headerWrapperBg}>
            <PageHeader type={HEADER_TYPE.MAIN} title="My Profile" onPressMenu={handleOpenMenu} />
            <View style={styles.userAvatarWrapper}>
              <UserAvatar style={styles.userAvatar} size="big" source={avatarToShow} onPress={handleChooseAvatar} />
            </View>
          </ImageBackground>

          {!!profile && (
            <ScrollView
              style={bodyStyles.bodyScrollWrapper}
              contentContainerStyle={bodyStyles.bodyScrollWrapperContent}
            >
              <ProfileTextInput
                title="FIRST NAME"
                value={profile.first_name || ''}
                onChangeText={val => editProfile('first_name', val)}
              />
              <ProfileTextInput
                title="LAST NAME"
                value={profile.last_name || ''}
                onChangeText={val => editProfile('last_name', val)}
              />
              <TouchableOpacity onPress={() => setDatePickerShown(true)}>
                <ProfileTextInput
                  title="DOB"
                  value={moment(profile.date_joined).format('YYYY-MM-DD') || ''}
                  editable={false}
                />
              </TouchableOpacity>
              {/*<OutlinedButton title="Change" onPress={toggleDatePicker} />*/}
              <ProfileTextInput
                title="ADDRESS1"
                value={profile.address1 || ''}
                onChangeText={val => editProfile('address1', val)}
              />
              <ProfileTextInput
                title="ADDRESS2"
                value={profile.address2 || ''}
                onChangeText={val => editProfile('address2', val)}
              />
              <ProfileTextInput
                title="PHONE (WORK)"
                value={profile.phone_work || ''}
                onChangeText={val => editProfile('phone_work', val)}
              />
              <ProfileTextInput
                title="PHONE (HOME)"
                value={profile.phone_cell || ''}
                onChangeText={val => editProfile('phone_cell', val)}
              />
              <ProfileTextInput
                title="EMAIL (WORK)"
                value={profile.email_work || ''}
                onChangeText={val => editProfile('email_work', val)}
              />
              <ProfileTextInput
                title="EMAIL (HOME)"
                value={profile.email_home || ''}
                onChangeText={val => editProfile('email_home', val)}
              />
              <OutlinedButton style={bodyStyles.changePwdBtn} title="CHANGE PASSWORD" onPress={handleOpenPwdChange} />
            </ScrollView>
          )}

          <PrimaryButton
            disabled={isFetchingProfile || isPatchingProfile || !isProfileEdited}
            title="SAVE CHANGES"
            onPress={handlePatchProfile}
          />

          {datePickerShown && (
            <DateTimePicker value={dateJoined.toDate()} mode="date" onChange={handleChangeDate} />
          )}
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
    minHeight: 150,
    overflow: 'visible',
    zIndex: 2,
  },
  userAvatarWrapper: {
    flex: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 135,
    backgroundColor: 'transparent',
    bottom: -65,
  },
  headerWrapperBg: {
    resizeMode: 'cover',
  },
});

const bodyStyles = StyleSheet.create({
  bodyScrollWrapper: {
    flex: 1,
    flexShrink: 0,
    paddingLeft: 26,
    paddingRight: 26,
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
    zIndex: 1,
  },
  bodyScrollWrapperContent: {
    paddingTop: 62,
  },
  changePwdBtn: {
    marginVertical: 40,
  },
});

const mapStateToProps = state => ({
  profile: state.rootReducer.auth.profile,
  isFetchingProfile: state.rootReducer.auth.isFetchingProfile,
  isPatchingProfile: state.rootReducer.auth.isPatchingProfile,
  isProfileEdited: state.rootReducer.auth.isProfileEdited,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu,
      getProfile,
      editProfile,
      patchProfile,
    },
    dispatch,
  );

const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ProfileScreen);

export { ProfileScreen };
