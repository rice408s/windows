import React from 'react';
import styled from 'styled-components';
import { AmigaWorkbench } from '../AmigaWorkbench/AmigaWorkbench';

const WorkbenchWrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #0055aa;
  position: relative;
  font-family: ${props => props.theme.fontFamily};
  padding: 4px;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
`;

const TitleBar = styled.div`
  height: 20px;
  background-image: linear-gradient(
    45deg,
    #ff8a00 25%,
    #0055aa 25%,
    #0055aa 50%,
    #ff8a00 50%,
    #ff8a00 75%,
    #0055aa 75%
  );
  background-size: 8px 8px;
  color: #ffffff;
  font-weight: bold;
  display: flex;
  align-items: center;
  padding: 0 8px;
  justify-content: space-between;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
`;

const Content = styled.div`
  flex: 1;
  overflow: auto;

  /* Amiga 风格滚动条 */
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #aaaaaa;
  }

  &::-webkit-scrollbar-thumb {
    background: #888888;
    border: 1px solid #666666;
  }
`;

interface AmigaWindowProps {
  title: string;
  onClose?: () => void;
}

export const AmigaWindow: React.FC<AmigaWindowProps> = ({ title, onClose }) => {
  return (
    <WorkbenchWrapper>
      <TitleBar>
        <span>{title}</span>
        <span onClick={onClose} style={{ cursor: 'pointer' }}>×</span>
      </TitleBar>
      <Content>
        <AmigaWorkbench />
      </Content>
    </WorkbenchWrapper>
  );
}; 