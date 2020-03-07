import { all, fork } from 'redux-saga/effects';

import accountSaga from './Account/saga';

function* rootSaga() {
  yield all([fork(accountSaga)]);
}

export default rootSaga;
