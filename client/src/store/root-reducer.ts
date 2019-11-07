import { combineReducers } from 'redux';

import { accountReducer } from './Account/reducer';
import { settingsReducer } from './Settings/reducer';

export default combineReducers({
  account: accountReducer,
  settings: settingsReducer,
});
