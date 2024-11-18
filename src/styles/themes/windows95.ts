import { BaseTheme, baseTheme } from './base';

export const windows95Theme: BaseTheme = {
  ...baseTheme,
  name: 'windows95',
  fontFamily: '"MS Sans Serif", "Segoe UI", sans-serif',
  colors: {
    ...baseTheme.colors,
    primary: '#000080',
    secondary: '#c0c0c0',
    background: '#c0c0c0',
    text: '#000000',
    border: '#808080'
  }
}; 