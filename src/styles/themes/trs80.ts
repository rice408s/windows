import { BaseTheme, baseTheme } from './base';

export const trs80Theme: BaseTheme = {
  ...baseTheme,
  name: 'trs80',
  fontFamily: '"TRS-80", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#33FF33',    // TRS-80 荧光绿
    secondary: '#004400',  // 深绿色
    background: '#000000', // 黑色背景
    text: '#33FF33',      // 荧光绿文本
    border: '#33FF33'     // 荧光绿边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '1px'
  }
}; 