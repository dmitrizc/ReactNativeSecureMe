import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { get as getDeep } from 'getobject';
import _find from 'lodash/find';

import { toggleMenu } from '../../redux/actions/app';
import { getEventDetails, getEventSchedules } from '../../redux/actions/events';
import { makeURL } from '../../utils/makeUrl';
import { getTimeRange, getSrtDate, getDateRange } from '../../utils/eventTimeUtils';

import { WithMenu } from '../../WithMenu';
import { PageHeader, HEADER_TYPE } from '../../components/PageHeader';
import { PageFooter } from '../../components/PageFooter';
import { UserAvatar } from '../../components/UserAvatar';
import { EventScheduleItem } from '../../components/EventScheduleItem';
import { VenueItem } from '../../components/VenueItem';
import { LoadingIndicator } from '../../components/LoadingIndicator';

import imgPageTopBg from '../../../assets/images/PageTopBg.png';
import imgChevron from '../../../assets/images/Events/Chevron.png';

const TABS = {
  MY_SCHEDULES: 'MY SCHEDULE',
  ALL_SCHEDULES: 'FULL SCHEDULE',
};

const _EventCreation = ({
  navigation,
  toggleMenu,
  eventDetails,
  isFetchingEventDetails,
  getEventDetails,
  eventSchedules,
  isFetchingEventSchedules,
  getEventSchedules,
}) => {
  const [didFocusSubscription, setDidFocusSubscription] = useState(null);
  const [currentTab, setCurrentTab] = useState(TABS.MY_SCHEDULES);

  useEffect(() => {
    const eventid = navigation.getParam('eventid', 'NoId');
    if (eventid === 'NoId') {
      navigation.goBack();
      return;
    }

    getEventDetails(eventid);
    getEventSchedules(eventid);

    const id = navigation.addListener('willFocus', payload => {
      console.log(payload);
      if (getDeep(payload, 'state.routeName') === 'EventDetails') {
        console.log('Did focus', 'EventDetails');
        getEventDetails(eventid);
        getEventSchedules(eventid);
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

  const handlePressLink = uri => {
    Linking.openURL(uri);
  };

  const eventName = getDeep(eventDetails, 'event.name') || '';
  const avatarUrl = makeURL(getDeep(eventDetails, 'event.logo'));
  const eventAddress1 = getDeep(eventDetails, 'event.venue.address1') || '';
  const eventAddress2 = getDeep(eventDetails, 'event.venue.address2') || '';
  const eventAddress = `${eventAddress1} ${eventAddress2}`;
  const eventDescription = getDeep(eventDetails, 'event.description') || '';
  const startTime = getDeep(eventDetails, 'event.start_datetime');
  const endTime = getDeep(eventDetails, 'event.end_datetime');

  let myEventSchedules = getDeep(eventDetails, 'schedule') || [];
  if (!Array.isArray(myEventSchedules)) {
    myEventSchedules = [];
  }

  let eventVenues = getDeep(eventDetails, 'venueinfo') || [];
  if (!Array.isArray(eventVenues)) {
    eventVenues = [];
  }

  const eventVenueTitle = getDeep(eventDetails, 'event.venue.name') || '';
  const eventVenueAddress1 = getDeep(eventDetails, 'event.venue.address1') || '';
  const eventVenueAddress2 = getDeep(eventDetails, 'event.venue.address2') || '';
  const eventVenueAddress = `${eventVenueAddress1} ${eventVenueAddress2}`;
  const eventVenueCategory = getDeep(eventDetails, 'event.venue.category.name') || '';
  const eventVenuePhone = getDeep(eventDetails, 'event.venue.phone') || '';

  const eventVenueLinks = [];
  // const eventVenueInfos = getDeep(eventDetails, 'venueinfo.0.info.plans');
  const eventVenueInfos = getDeep(eventDetails, 'venueinfo') || null;
  if (eventVenueInfos && eventVenueInfos.length) {
    for (const eventVenueInfo of eventVenueInfos) {
      const eventVenueInfoLink = makeURL(getDeep(eventVenueInfo, 'info.plans') || '');
      const eventVenueInfoName =
        getDeep(eventVenueInfo, 'info.venue_info_type.name') ||
        getDeep(eventVenueInfo, 'infotype') ||
        getDeep(eventVenueInfo, 'info.info') ||
        'Information Link';

      eventVenueLinks.push(
        <TouchableOpacity style={bodyStyles.linkItem} onPress={() => handlePressLink(eventVenueInfoLink.uri)}>
          <Text style={bodyStyles.linkItemText}>{eventVenueInfoName}</Text>
          <Image style={bodyStyles.linkItemChevron} source={imgChevron} />
        </TouchableOpacity>,
      );
    }
  }

  return (
    <WithMenu>
      {(isFetchingEventDetails || isFetchingEventSchedules) && <LoadingIndicator />}
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ImageBackground style={styles.headerWrapper} source={imgPageTopBg} imageStyle={styles.headerWrapperBg}>
            <PageHeader type={HEADER_TYPE.MAIN} title="My Events" onPressMenu={handleOpenMenu} />
            <View style={styles.eventInfo}>
              <UserAvatar style={styles.eventInfoAvatar} size="small" source={avatarUrl} />
              <View style={styles.eventInfoMeta}>
                <Text style={styles.eventInfoMetaTitle} rowsCount={2}>{eventName}</Text>
                <Text style={styles.eventInfoMetaAddress} rowsCount={2}>{eventAddress}</Text>
                <Text style={styles.eventInfoMetaDetails} rowsCount={2}>{eventDescription}</Text>
              </View>
            </View>
            <View style={styles.eventTimeRow}>
              <Text style={styles.eventDate}>{getDateRange(startTime, endTime)}</Text>
              <Text style={styles.eventDate}>{getTimeRange(startTime, endTime)}</Text>
            </View>
          </ImageBackground>

          <ScrollView style={bodyStyles.bodyScrollWrapper}>
            <Text style={bodyStyles.eventsTitle}>Event Schedule</Text>
            <View style={bodyStyles.tabsWrapper}>
              {Object.keys(TABS).map(TAB => (
                <TouchableOpacity
                  key={TAB}
                  style={[bodyStyles.tabItem, TABS[TAB] === currentTab ? bodyStyles.tabItemActive : null]}
                  onPress={() => setCurrentTab(TABS[TAB])}
                >
                  <Text style={bodyStyles.tabItemTitle}>{TABS[TAB]}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {currentTab === TABS.ALL_SCHEDULES && (
              <Fragment>
                {eventSchedules.map(eventSchedule => {
                  const startTime = getDeep(eventSchedule, 'start_datetime') || null;
                  const endTime = getDeep(eventSchedule, 'end_datetime') || null;

                  const isSubscribed = myEventSchedules && _find(myEventSchedules, { id: eventSchedule.id });

                  return (
                    <EventScheduleItem
                      isSubscribed={!!isSubscribed}
                      key={eventSchedule.id || Math.random()}
                      title={eventSchedule.name || ''}
                      isActive={eventSchedule.enabled || false}
                      address={eventAddress}
                      date={getDateRange(startTime, endTime)}
                      time={getTimeRange(startTime, endTime)}
                    />
                  );
                })}
              </Fragment>
            )}

            {currentTab === TABS.MY_SCHEDULES && (
              <Fragment>
                {myEventSchedules.map(eventSchedule => {
                  const startTime = getDeep(eventSchedule, 'start_datetime') || null;
                  const endTime = getDeep(eventSchedule, 'end_datetime') || null;

                  return (
                    <EventScheduleItem
                      key={eventSchedule.id || Math.random()}
                      title={eventSchedule.name || ''}
                      isActive={eventSchedule.enabled || false}
                      address={eventAddress}
                      date={getDateRange(startTime, endTime)}
                      time={getTimeRange(startTime, endTime)}
                    />
                  );
                })}
              </Fragment>
            )}

            <Text style={bodyStyles.eventsTitle}>Venue</Text>
            <VenueItem
              title={eventVenueTitle}
              address={eventVenueAddress}
              category={eventVenueCategory}
              phone={eventVenuePhone}
            />

            <Text style={bodyStyles.linksTitle}>Important Links</Text>
            {!isFetchingEventDetails && (
              <Fragment>
                {eventVenueLinks}
              </Fragment>
            )}
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
    minHeight: 180,
  },
  headerWrapperBg: {
    resizeMode: 'cover',
  },
  eventInfo: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 16,
    paddingLeft: 27,
    paddingRight: 17,
    width: '100%',
  },
  eventInfoAvatar: {
    marginRight: 5,
    flex: 0,
  },
  eventInfoMeta: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    marginTop: 3,
  },
  eventInfoMetaTitle: {
    marginBottom: 4,
    borderBottomColor: 'rgba(255, 255, 255, 0.68)',
    borderBottomWidth: 0.3,
    paddingHorizontal: 6,
    paddingBottom: 5,
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  eventInfoMetaAddress: {
    marginBottom: 8,
    paddingHorizontal: 6,
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  eventInfoMetaDetails: {
    marginBottom: 10,
    paddingHorizontal: 6,
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
  },
  eventTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingHorizontal: 25,
  },
  eventDate: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.75)',
  },
});

const bodyStyles = StyleSheet.create({
  bodyScrollWrapper: {
    flex: 1,
    flexShrink: 0,
    paddingLeft: 18,
    paddingRight: 18,
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  eventsTitle: {
    flex: 0,
    flexShrink: 0,
    marginTop: 20,
    marginBottom: 18,
    paddingHorizontal: 8,
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 18,
    color: '#6b91bd',
  },
  linksTitle: {
    flex: 0,
    flexShrink: 0,
    marginTop: 27,
    borderBottomColor: 'rgba(94, 94, 94, 0.68)',
    borderBottomWidth: 0.3,
    paddingHorizontal: 8,
    paddingBottom: 13,
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 12,
    color: '#989c9f',
  },
  linkItem: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(94, 94, 94, 0.68)',
    borderBottomWidth: 0.3,
    paddingHorizontal: 8,
    width: '100%',
    height: 51,
  },
  linkItemText: {
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: '#6b91bd',
  },
  linkItemChevron: {
    marginRight: 15,
    width: 6,
    height: 12,
  },
  linkItemNoInfo: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: 'SourceSansPro Regular',
    fontSize: 11,
    color: '#989c9f',
    textAlign: 'center',
  },
  tabsWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(153, 157, 163, 0.4)',
    width: '100%',
    height: 42,
    backgroundColor: '#f7f7f7',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingTop: 6,
    paddingHorizontal: 0,
    borderBottomWidth: 4,
    borderBottomColor: 'transparent',
    height: 40,
  },
  tabItemActive: {
    borderBottomColor: '#ff5386',
  },
  tabItemTitle: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 13,
    color: '#6b91bd',
  },
});

const mapStateToProps = state => ({
  eventDetails: state.rootReducer.events.eventDetails,
  isFetchingEventDetails: state.rootReducer.events.isFetchingEventDetails,
  eventSchedules: state.rootReducer.events.eventSchedules,
  isFetchingEventSchedules: state.rootReducer.events.isFetchingEventSchedules,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu,
      getEventDetails,
      getEventSchedules,
    },
    dispatch,
  );

const EventDetails = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_EventCreation);

export { EventDetails };
