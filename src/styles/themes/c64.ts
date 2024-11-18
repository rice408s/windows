import { BaseTheme, baseTheme } from './base';

export const c64Theme: BaseTheme = {
  ...baseTheme,
  name: 'c64',
  fontFamily: '"C64 Pro", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#4040E0',    // C64 标志性蓝色
    secondary: '#A0A0FF',  // C64 浅蓝色
    background: '#4040E0', // 蓝色背景
    text: '#A0A0FF',      // 浅蓝色文本
    border: '#A0A0FF'     // 浅蓝色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '2px'
  }
}; 