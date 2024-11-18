import { BaseTheme, baseTheme } from './base';

export const zxSpectrumTheme: BaseTheme = {
  ...baseTheme,
  name: 'zxspectrum',
  fontFamily: '"ZX Spectrum", monospace',
  colors: {
    ...baseTheme.colors,
    primary: '#FFFFFF',
    secondary: '#0000FF',
    background: '#000000',
    text: '#FFFFFF',
    border: '#FFFFFF'
  },
  metrics: {
    ...baseTheme.metrics,
    borderWidth: '2px'
  }
}; 