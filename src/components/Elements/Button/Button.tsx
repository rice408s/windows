import styled from 'styled-components';
import { BaseTheme } from 'styles/themes/base';

interface ButtonProps {
  theme: BaseTheme;
  $variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  background-color: ${props => props.$variant === 'primary' ? props.theme.colors.primary : props.theme.colors.secondary};
  border: ${props => props.theme.metrics.borderWidth} solid ${props => props.theme.colors.border};
  color: ${props => props.$variant === 'primary' ? '#ffffff' : props.theme.colors.text};
  padding: ${props => props.theme.metrics.spacing.medium};
  font-family: ${props => props.theme.fontFamily};
  cursor: pointer;
  outline: none;
  
  &:active {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }
  
  // Windows 95风格的凸起边框效果
  box-shadow: inset -1px -1px #0a0a0a,
              inset 1px 1px #ffffff,
              inset -2px -2px #808080,
              inset 2px 2px #dfdfdf;
`; 