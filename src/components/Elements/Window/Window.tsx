import React from 'react';
import styled from 'styled-components';
import { Button } from '../Button/Button';

const WindowWrapper = styled.div`
  background: ${props => props.theme.colors.background};
  border: ${props => props.theme.metrics.borderWidth} solid ${props => props.theme.colors.border};
  box-shadow: inset -1px -1px #0a0a0a,
              inset 1px 1px #ffffff,
              inset -2px -2px #808080,
              inset 2px 2px #dfdfdf;
  width: 800px;
  margin: 0 auto;
`;

const WindowHeader = styled.div`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.metrics.spacing.small};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WindowTitle = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-size: 14px;
`;

const WindowContent = styled.div`
  padding: ${props => props.theme.metrics.spacing.medium};
`;

const CloseButton = styled(Button)`
  padding: 2px 6px;
  min-width: 20px;
  height: 20px;
  line-height: 1;
`;

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Window: React.FC<WindowProps> = ({ title, children, onClose }) => {
  return (
    <WindowWrapper>
      <WindowHeader>
        <WindowTitle>{title}</WindowTitle>
        <CloseButton onClick={onClose}>×</CloseButton>
      </WindowHeader>
      <WindowContent>
        {children}
      </WindowContent>
    </WindowWrapper>
  );
}; 