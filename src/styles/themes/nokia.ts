import { BaseTheme, baseTheme } from './base';

export const nokiaTheme: BaseTheme = {
  ...baseTheme,
  name: 'nokia',
  fontFamily: '"Nokia Cellphone FC", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#84c5cc',    // Nokia LCD 蓝绿色
    secondary: '#32373a',  // 深灰色
    background: '#000000', // 黑色背景
    text: '#84c5cc',      // LCD 文本颜色
    border: '#222222'     // 深色边框
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '1px'
  }
}; 