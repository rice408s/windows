import { BaseTheme, baseTheme } from './base';

export const macintoshTheme: BaseTheme = {
  ...baseTheme,
  name: 'macintosh',
  fontFamily: '"Chicago", "Monaco", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#000000',   // 经典 Mac 黑色
    secondary: '#E8E8E8', // 浅灰色
    background: '#FFFFFF',
    text: '#000000',     // 黑色文本
    border: '#000000'    // 黑色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '1px'
  }
}; 