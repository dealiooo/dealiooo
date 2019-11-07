import { Theme } from '../styles';

export * from './dealiooo-types';
export * from './html-event-types';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
