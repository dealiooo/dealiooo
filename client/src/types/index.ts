import { Theme } from '../styles';
import { RootAction } from '../store/types';

export * from './dealiooo';
export * from './helpers';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: RootAction;
  }
}
