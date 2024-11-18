import { BaseTheme, baseTheme } from './base';

export const apple2Theme: BaseTheme = {
  ...baseTheme,
  name: 'apple2',
  fontFamily: '"Apple II", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#40ff40',
    secondary: '#000000',
    background: '#000000',
    text: '#40ff40',
    border: '#40ff40'
  }
}; 