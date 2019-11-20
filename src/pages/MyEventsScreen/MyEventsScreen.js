import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, TouchableOpacity, Text, View, ImageBackground, StyleSheet } from 'react-native';
import { get as getDeep } from 'getobject';

import { toggleMenu } from '../../redux/actions/app';
import { getEventsComingUp, getEventsPast } from '../../redux/actions/events';

import { WithMenu } from '../../WithMenu';
import { HEADER_TYPE, PageHeader } from '../../components/PageHeader';
import { PageFooter } from '../../components/PageFooter';
import { EventItem } from './EventItem';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { getTimeRange, getStartDate, getDateRange, checkIfTodayInRange } from '../../utils/eventTimeUtils';
import { makeURL } from '../../utils/makeUrl';

import imgPageTopBg from '../../../assets/images/PageTopBg.png';

const TABS = {
  COMING_UP: 'COMING UP',
  PAST_EVENTS: 'PAST EVENTS',
};

const _MyEventsScreen = ({
  navigation,
  toggleMenu,
  eventsPast,
  isFetchingEventsPast,
  eventsComingUp,
  isFetchingEventsComingUp,
  getEventsPast,
  getEventsComingUp,
}) => {
  const [didFocusSubscription, setDidFocusSubscription] = useState(null);
  const [currentTab, setCurrentTab] = useState(TABS.COMING_UP);

  useEffect(() => {
    getEventsComingUp();
    getEventsPast();

    const id = navigation.addListener('willFocus', payload => {
      if (getDeep(payload, 'state.routeName') === 'MyEventsScreen') {
        console.log('Did focus', 'MyEventsScreen');
        getEventsComingUp();
        getEventsPast();
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

  return (
    <WithMenu>
      {(isFetchingEventsComingUp || isFetchingEventsPast) && <LoadingIndicator />}
      <View style={styles.wrapper}>
        <SafeAreaView style={styles.safeContentWrapper}>
          <ImageBackground style={styles.headerWrapper} source={imgPageTopBg} imageStyle={styles.headerWrapperBg}>
            <PageHeader type={HEADER_TYPE.MAIN} title="My Events" onPressMenu={handleOpenMenu} />
          </ImageBackground>

          <View style={styles.tabsWrapper}>
            {Object.keys(TABS).map(TAB => (
              <TouchableOpacity
                key={TAB}
                style={[styles.tabItem, TABS[TAB] === currentTab ? styles.tabItemActive : null]}
                onPress={() => setCurrentTab(TABS[TAB])}
              >
                <Text style={styles.tabItemTitle}>{TABS[TAB]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView style={styles.bodyScrollWrapper} contentContainerStyle={styles.bodyScrollWrapperContent}>
            {currentTab === TABS.COMING_UP && (
              <Fragment>
                {!!eventsComingUp.length && eventsComingUp.map(event => {
                  const address1 = getDeep(event, 'venue.address1') || '';
                  const address2 = getDeep(event, 'venue.address2') || '';
                  const address = `${address1} ${address2}`;
                  const startTime = getDeep(event, 'start_datetime') || null;
                  const endTime = getDeep(event, 'end_datetime') || null;

                  return (
                    <EventItem
                      key={event.id || Math.random()}
                      image={makeURL(getDeep(event, 'logo'))}
                      title={event.name || ''}
                      address={address}
                      status={(event.enable && checkIfTodayInRange(startTime, endTime)) ? 'LIVE' : 'COMING UP'}
                      date={getDateRange(startTime, endTime)}
                      time={getTimeRange(startTime, endTime)}
                      onPress={() => handleGotoDetails(event.id)}
                    />
                  );
                })}
              </Fragment>
            )}
            {currentTab === TABS.PAST_EVENTS && (
              <Fragment>
                {!!eventsPast.length && eventsPast.map(event => {
                  const address1 = getDeep(event, 'venue.address1') || '';
                  const address2 = getDeep(event, 'venue.address2') || '';
                  const address = `${address1} ${address2}`;

                  return (
                    <EventItem
                      key={event.id || Math.random()}
                      image={makeURL(getDeep(event, 'logo'))}
                      title={event.name || ''}
                      address={address}
                      status="PAST"
                      date={getStartDate(getDeep(event, 'start_datetime'))}
                      time={getTimeRange(getDeep(event, 'start_datetime'), getDeep(event, 'end_datetime'))}
                      onPress={() => handleGotoDetails(event.id)}
                    />
                  );
                })}
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
    backgroundColor: '#f7f7f7',
  },
  safeContentWrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  headerWrapper: {
    flex: 0,
    width: '100%',
    height: 56,
  },
  headerWrapperBg: {
    resizeMode: 'cover',
  },
  tabsWrapper: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(153, 157, 163, 0.4)',
    width: '100%',
    height: 52,
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
    height: 50,
  },
  tabItemActive: {
    borderBottomColor: '#ff5386',
  },
  tabItemTitle: {
    fontFamily: 'SourceSansPro SemiBold',
    fontSize: 15,
    color: '#6b91bd',
  },
  bodyScrollWrapper: {
    flex: 1,
    flexShrink: 0,
    paddingLeft: 18,
    paddingRight: 18,
    width: '100%',
    height: '100%',
    backgroundColor: '#f7f7f7',
  },
  bodyScrollWrapperContent: {
    paddingTop: 10,
  },
});

const mapStateToProps = state => ({
  eventsPast: state.rootReducer.events.eventsPast,
  isFetchingEventsPast: state.rootReducer.events.isFetchingEventsPast,
  eventsComingUp: state.rootReducer.events.eventsComingUp,
  isFetchingEventsComingUp: state.rootReducer.events.isFetchingEventsComingUp,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      toggleMenu,
      getEventsPast,
      getEventsComingUp,
    },
    dispatch,
  );

const MyEventsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_MyEventsScreen);

export { MyEventsScreen };
