import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux';

import { Navigation } from './src/Navigation';
import { StorageTesting } from './src/pages/StorageTesting';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
// export default StorageTesting;
