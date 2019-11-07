import { StateType, ActionType } from 'typesafe-actions';

import rootReducer from './root-reducer';
import rootAction from './root-action';

export interface AsyncState<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}

export type RootState = StateType<typeof rootReducer>;

export type RootAction = ActionType<typeof rootAction>;
