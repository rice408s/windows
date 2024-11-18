export interface BaseTheme {
  name: string;
  fontFamily: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    border: string;
  };
  metrics: {
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    borderWidth: string;
  };
}

export const baseTheme: BaseTheme = {
  name: 'base',
  fontFamily: 'system-ui, sans-serif',
  colors: {
    primary: '#000000',
    secondary: '#808080',
    background: '#ffffff',
    text: '#000000',
    border: '#000000'
  },
  metrics: {
    spacing: {
      small: '4px',
      medium: '8px',
      large: '16px'
    },
    borderWidth: '1px'
  }
}; 