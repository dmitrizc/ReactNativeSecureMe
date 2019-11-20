import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TouchableOpacity, StyleSheet } from 'react-native';
import SideMenu from 'react-native-side-menu';
import { SwitchActions, withNavigation } from 'react-navigation';

import { toggleMenu } from './redux/actions/app';
import { DrawerMenu } from './pages/DrawerMenu';

const _WithMenu = ({ navigation, children, isMenuOpen, toggleMenu, token }) => {
  useEffect(() => {
    if (!token) {
      navigation.dispatch(SwitchActions.jumpTo({ routeName: 'AuthLoading' }));
      toggleMenu(false);
    }
  }, [navigation, toggleMenu, token]);

  const menu = <DrawerMenu />;

  const handleOnChange = isMenuOpen => {
    toggleMenu(isMenuOpen);
  };

  return (
    <SideMenu menu={menu} isOpen={isMenuOpen} onChange={handleOnChange} openMenuOffset={280}>
      {isMenuOpen && <TouchableOpacity style={styles.contentWrapper} onPress={() => toggleMenu(false)} />}
      {children}
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
  },
});

const mapStateToProps = state => ({
  token: state.rootReducer.auth.token,
  isMenuOpen: state.rootReducer.app.isMenuOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleMenu }, dispatch);

const WithMenu = withNavigation(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(_WithMenu),
);

export { WithMenu };
