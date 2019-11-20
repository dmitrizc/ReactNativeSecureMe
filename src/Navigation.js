import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import SideMenu from 'react-native-side-menu';

import { SplashScreen } from './pages/SplashScreen/SplashScreen';
import { LoginScreen } from './pages/LoginScreen/LoginScreen';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { MyEventsScreen } from './pages/MyEventsScreen/MyEventsScreen';
import { EventDetails } from './pages/EventDetailsScreen/EventDetailsScreen';
import { ProfileScreen } from './pages/ProfileScreen/ProfileScreen';
import { ProfilePasswordScreen } from './pages/ProfileScreen/ProfilePasswordScreen';
import { StorageTesting } from './pages/StorageTesting';
import { DrawerMenu } from './pages/DrawerMenu';

const AuthStack = createStackNavigator(
  {
    LoginScreen: LoginScreen,
    StorageTesting: StorageTesting,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  },
);

const AppStack = createStackNavigator(
  {
    Dashboard: Dashboard,
    DrawerMenu: DrawerMenu,
    MyEventsScreen: MyEventsScreen,
    EventDetails: EventDetails,
    ProfileScreen: ProfileScreen,
    ProfilePasswordScreen: ProfilePasswordScreen,
    StorageTesting: StorageTesting,
  },
  {
    initialRouteName: 'Dashboard',
    headerMode: 'none',
  },
);

const Navigation = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SplashScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

const _NavigationWithMenu = ({ isMenuOpen, token }) => {
  const menu = <DrawerMenu />;

  return (
    <SideMenu menu={menu} isOpen={!!token && isMenuOpen} disableGestures={!token}>
      <Navigation />
    </SideMenu>
  );
};

const mapStateToProps = state => ({
  token: state.rootReducer.auth.token,
  isMenuOpen: state.rootReducer.app.isMenuOpen,
});

const NavigationWithMenu = connect(mapStateToProps)(_NavigationWithMenu);

export { NavigationWithMenu, Navigation };
