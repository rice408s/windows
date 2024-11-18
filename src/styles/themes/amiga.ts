import { BaseTheme, baseTheme } from './base';

export const amigaTheme: BaseTheme = {
  ...baseTheme,
  name: 'amiga',
  fontFamily: '"Topaz", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#ff8a00',
    secondary: '#0055aa',
    background: '#aaaaaa',
    text: '#000000',
    border: '#000000'
  }
}; 