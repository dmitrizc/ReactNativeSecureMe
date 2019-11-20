import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { get as getDeep } from 'getobject';

import { toggleMenu } from '../../redux/actions/app';
import { getHomeEventLive } from '../../redux/actions/home';
import { makeURL } from '../../utils/makeUrl';
import { getTimeRange, getStartDate, getDateRange, checkIfTodayInRange } from '../../utils/eventTimeUtils';

import { WithMenu } from '../../WithMenu';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { PageHeader, HEADER_TYPE } from '../../components/PageHeader';
import { PageFooter } from '../../components/PageFooter';
import { UserAvatar } from '../../components/UserAvatar';
import { Ticket } from './Ticket';
import { EventScheduleItem } from '../../components/EventScheduleItem';
import { EventItem } from '../MyEventsScreen/EventItem';

import imgPageTopBg from '../../../assets/images/PageTopBg.png';
import events from '../../redux/reducers/events';

const _Dashboard = ({ navigation, toggleMenu, getHomeEventLive, profile, eventsLive, isFetchingEventLive }) => {
  const [didFocusSubscription, setDidFocusSubscription] = useState(null);

  useEffect(() => {
    getHomeEventLive();

    const id = navigation.addListener('willFocus', payload => {
      if (getDeep(payload, 'state.routeName') === 'Dashboard') {
        console.log('Did focus', 'Dashboard');
        getHomeEventLive();
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

  const handleGotoDetails = id => {
    navigation.push('EventDetails', { eventid: id });
  };

  const handlePressEventLive = () => {
    const eventid = getDeep(eventsLive, '0.event.id') || null;

    if (eventid) {
      handleGotoDetails(eventid);
    }
  };

  const avatarUrl = makeURL(getDeep(profile, 'avatar'));
  const firstName = getDeep(profile, 'first_name') || '';
  const lastName = getDeep(profile, 'last_name') || '';
  const name = `${firstName} ${lastName}`;
  const email = getDeep(profile, 'email') || '';

  const eventLive = getDeep(eventsLive, '0') || null;
  const eventAvatarUrl = makeURL(getDeep(eventLive, 'event.logo'));
  const eventName = getDeep(eventLive, 'event.name') || '';
  const isEventLive = getDeep(eventLive, 'event.enable') || false;
  const eventAddress1 = getDeep(eventLive, 'event.venue.address1') || '';
  const eventAddress2 = getDeep(eventLive, 'event.venue.address2') || '';
  // const eventAddress = `${eventAddress1} ${eventAddress2}`;
  const venueName = getDeep(eventLive, 'event.venue.name') || '';
  const venueCity = getDeep(eventLive, 'event.venue.city') || '';
  const venueState = getDeep(eventLive, 'event.venue.state') || '';
  const eventAddress = `${venueCity}, ${venueState}`;

  const startTime = getDeep(eventLive, 'event.start_datetime');
  const endTime = getDeep(eventLive, 'event.end_datetime');

  const eventsUpcoming = [];

  if (eventsLive && eventsLive.length) {
    for (let i = 1; i < eventsLive.length; i++) {
      const event = eventsLive[i].event;
      const address1 = getDeep(event, 'venue.address1') || '';
      const address2 = getDeep(event, 'venue.address2') || '';
      const address = `${address1} ${address2}`;
      const startTime = getDeep(event, 'start_datetime') || null;
      const endTime = getDeep(event, 'end_datetime') || null;

      eventsUpcoming.push(
        <EventItem
          key={event.id || Math.random()}
          image={makeURL(getDeep(event, 'logo'))}
          title={event.name || ''}
          address={address}
          status={event.enabled ? 'LIVE' : 'COMING UP'}
          date={getDateRange(startTime, endTime)}
          time={getTimeRange(startTime, endTime)}
          onPress={() => handleGotoDetails(event.id)}
        />,
      );
    }
  }

  return (
    <WithMenu>
      {isFetchingEventLive && <LoadingIndicator />}
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ImageBackground style={styles.headerWrapper} source={imgPageTopBg} imageStyle={styles.headerWrapperBg}>
            <PageHeader type={HEADER_TYPE.DASHBOARD} onPressMenu={handleOpenMenu} />
            <View style={styles.userInfo}>
              <UserAvatar style={styles.userInfoAvatar} size="small" source={avatarUrl} />
              <View style={styles.userInfoMeta}>
                <Text style={styles.userInfoMetaName} numberOfLines={1}>{name}</Text>
                <Text style={styles.userInfoMetaEmail} numberOfLines={1}>{email}</Text>
              </View>
            </View>
          </ImageBackground>

          <ScrollView style={bodyStyles.bodyScrollWrapper}>
            {!!eventLive && (
              <TouchableOpacity onPress={handlePressEventLive}>
                <Ticket
                  image={eventAvatarUrl}
                  title={eventName}
                  isLive={isEventLive && checkIfTodayInRange(startTime, endTime)}
                  venueName={venueName}
                  address={eventAddress}
                  date={getDateRange(startTime, endTime)}
                  // time={getTimeRange(startTime, endTime)}
                />
              </TouchableOpacity>
            )}

            {eventsUpcoming}
          </ScrollView>

          <PageFooter />
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
    height: 185,
  },
  headerWrapperBg: {
    resizeMode: 'cover',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 18,
    paddingLeft: 27,
    paddingRight: 20,
    width: '100%',
  },
  userInfoAvatar: {
    marginRight: 9,
    flex: 0,
  },
  userInfoMeta: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    width: '100%',
  },
  userInfoMetaName: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.75)',
    width: '100%',
  },
  userInfoMetaEmail: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.75)',
    width: '100%',
  },
});

const bodyStyles = StyleSheet.create({
  bodyScrollWrapper: {
    flex: 1,
    flexShrink: 0,
    paddingLeft: 14,
    paddingRight: 14,
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  eventsTitle: {
    flex: 0,
    flexShrink: 0,
    marginTop: 22,
    marginBottom: 14,
    paddingHorizontal: 6,
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 18,
    color: '#6b91bd',
  },
});

const mapStateToProps = state => ({
  profile: state.rootReducer.auth.profile,
  eventsLive: state.rootReducer.home.eventsLive,
  isFetchingEventLive: state.rootReducer.home.isFetchingEventLive,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu,
      getHomeEventLive,
    },
    dispatch,
  );

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Dashboard);

export { Dashboard };
