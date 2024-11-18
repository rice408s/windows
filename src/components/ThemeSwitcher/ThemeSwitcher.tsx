import React from 'react';
import styled from 'styled-components';
import { Button } from '../Elements/Button/Button';

const ThemeContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${props => props.theme.metrics.spacing.medium};
  margin-bottom: ${props => props.theme.metrics.spacing.large};
`;

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme }) => {
  return (
    <ThemeContainer>
      <Button 
        $variant={currentTheme === 'windows95' ? 'primary' : 'secondary'}
        onClick={() => onThemeChange('windows95')}
      >
        Windows 95
      </Button>
      <Button 
        $variant={currentTheme === 'dos' ? 'primary' : 'secondary'}
        onClick={() => onThemeChange('dos')}
      >
        DOS
      </Button>
      <Button 
        $variant={currentTheme === 'macintosh' ? 'primary' : 'secondary'}
        onClick={() => onThemeChange('macintosh')}
      >
        Macintosh
      </Button>
      <Button 
        $variant={currentTheme === 'amiga' ? 'primary' : 'secondary'}
        onClick={() => onThemeChange('amiga')}
      >
        Amiga
      </Button>
      <Button 
        $variant={currentTheme === 'atari' ? 'primary' : 'secondary'}
        onClick={() => onThemeChange('atari')}
      >
        Atari ST
      </Button>
      <Button 
        $variant={currentTheme === 'apple2' ? 'primary' : 'secondary'}
        onClick={() => onThemeChange('apple2')}
      >
        Apple II
      </Button>
    </ThemeContainer>
  );
}; 