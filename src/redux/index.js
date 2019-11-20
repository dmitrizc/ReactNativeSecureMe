import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(combineReducers({ rootReducer }), applyMiddleware(reduxThunk));

export default store;
