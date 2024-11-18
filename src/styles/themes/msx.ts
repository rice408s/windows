import { BaseTheme, baseTheme } from './base';

export const msxTheme: BaseTheme = {
  ...baseTheme,
  name: 'msx',
  fontFamily: '"MSX Screen", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#21FF21',   // MSX 特征绿色
    secondary: '#000000', 
    background: '#000000',
    text: '#21FF21',      // 绿色文本
    border: '#21FF21'     // 绿色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '1px'
  }
}; 