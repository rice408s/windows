import React from 'react';
import styled from 'styled-components';
import { AtariBasic } from '../AtariBasic/AtariBasic';

const GEMWrapper = styled.div`
  width: 800px;
  height: 600px;
  background: white;
  position: relative;
  font-family: ${props => props.theme.fontFamily};
  border: 2px solid black;
  display: flex;
  flex-direction: column;
`;

const MenuBar = styled.div`
  height: 20px;
  background: white;
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
`;

const MenuItem = styled.div`
  padding: 0 16px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-right: 1px solid black;

  &:hover {
    background: black;
    color: white;
  }
`;

const Content = styled.div`
  flex: 1;
  background: white;
  position: relative;
`;

interface AtariWindowProps {
  onClose?: () => void;
}

export const AtariWindow: React.FC<AtariWindowProps> = ({ onClose }) => {
  return (
    <GEMWrapper>
      <MenuBar>
        <MenuItem>Desk</MenuItem>
        <MenuItem>File</MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Options</MenuItem>
        <MenuItem onClick={onClose}>Quit</MenuItem>
      </MenuBar>
      <Content>
        <AtariBasic />
      </Content>
    </GEMWrapper>
  );
}; 