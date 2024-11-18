import { BaseTheme, baseTheme } from './base';

export const atariTheme: BaseTheme = {
  ...baseTheme,
  name: 'atari',
  fontFamily: '"Atari ST", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#000000',   // Atari ST 黑色
    secondary: '#FFFFFF', // 白色
    background: '#FFFFFF',
    text: '#000000',     // 黑色文本
    border: '#000000'    // 黑色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '1px'
  }
}; 