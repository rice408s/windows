import { BaseTheme, baseTheme } from './base';

export const bbcMicroTheme: BaseTheme = {
  ...baseTheme,
  name: 'bbcmicro',
  fontFamily: '"BBC Micro", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#FFFF00',    // BBC Micro 黄色
    secondary: '#0000FF',  // 蓝色
    background: '#000000', // 黑色背景
    text: '#FFFF00',      // 黄色文本
    border: '#FFFF00'     // 黄色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '2px'
  }
}; 