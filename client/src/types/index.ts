import { Theme } from '../styles';

export * from './dealiooo';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
