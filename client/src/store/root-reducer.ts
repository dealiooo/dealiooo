import { combineReducers } from 'redux';

import { accountReducer } from './Account/reducer';
import { settingsReducer } from './Settings/reducer';

const rootReducer = combineReducers({
  account: accountReducer,
  settings: settingsReducer,
});

export default rootReducer;
