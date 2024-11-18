import { BaseTheme, baseTheme } from './base';

export const dosTheme: BaseTheme = {
  ...baseTheme,
  name: 'dos',
  fontFamily: '"Perfect DOS VGA 437", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#FFFFFF',   // DOS 白色
    secondary: '#000000', // 黑色
    background: '#000000',
    text: '#FFFFFF',     // 白色文本
    border: '#FFFFFF'    // 白色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '1px'
  }
}; 