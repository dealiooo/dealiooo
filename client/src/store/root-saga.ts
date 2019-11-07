import { all, fork } from 'redux-saga/effects';

import accountSaga from './Account/saga';

export default function* rootSaga() {
  yield all([fork(accountSaga)]);
}
