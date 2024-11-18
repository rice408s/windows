import { BaseTheme, baseTheme } from './base';

export const gameboyTheme: BaseTheme = {
  ...baseTheme,
  name: 'gameboy',
  fontFamily: '"Press Start 2P", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#8bac0f',     // Game Boy 特征绿色
    secondary: '#306230',   // 深绿色
    background: '#0f380f',  // 最深绿色背景
    text: '#8bac0f',       // 浅绿色文本
    border: '#306230'      // 中绿色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '2px'
  }
}; 