import * as accountActions from './Account/actions';
import * as settingsAction from './Settings/actions';

const rootAction = {
  account: accountActions,
  settings: settingsAction,
};

export default rootAction;
