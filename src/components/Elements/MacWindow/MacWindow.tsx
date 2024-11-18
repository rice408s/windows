import React, { useState } from 'react';
import styled from 'styled-components';
import { MacUIGenerator } from '../MacUIGenerator/MacUIGenerator';
import { MacSimpleText } from '../MacSimpleText/MacSimpleText';

const MacWrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #E8E8E8;
  position: relative;
  font-family: ${props => props.theme.fontFamily};
  display: flex;
  flex-direction: column;
`;

const MenuBar = styled.div`
  height: 20px;
  background: white;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 16px;
`;

const AppleMenu = styled.div`
  width: 16px;
  height: 16px;
  background: black;
  mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.182 4.654c-.273-.047-2.395-.064-3.182.064-.064-2.395.064-3.182.064-3.182s1.273.064 3.118-.064c0 0-.064 2.395 0 3.182z'/%3E%3Cpath d='M7.818 1.536C6.545 1.6 4.545 3.6 4.545 6.182c0 2.582 2.273 4.582 3.273 4.582 1 0 3.273-2 3.273-4.582 0-2.582-2-4.582-3.273-4.646z'/%3E%3C/svg%3E") no-repeat center;
  cursor: pointer;
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 0 8px;
  &:hover {
    background: black;
    color: white;
  }
`;

const Desktop = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 20px;
`;

const Sidebar = styled.div`
  width: 200px;
  background: white;
  border: 1px solid black;
  border-radius: 8px 8px 0 0;
`;

const MainWindow = styled.div`
  flex: 1;
  background: white;
  border: 1px solid black;
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
`;

const WindowTitle = styled.div`
  height: 20px;
  background: linear-gradient(90deg, black 50%, white 50%);
  background-size: 2px 2px;
  border-radius: 8px 8px 0 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: white;
  font-weight: bold;
  justify-content: space-between;
`;

const CloseBox = styled.div`
  width: 12px;
  height: 12px;
  border: 1px solid black;
  background: white;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  line-height: 1;
  color: black;
`;

const WindowContent = styled.div`
  flex: 1;
  overflow: auto;

  /* Classic Mac OS 风格滚动条 */
  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  &::-webkit-scrollbar-track {
    background: white;
    border: 1px solid black;
  }

  &::-webkit-scrollbar-thumb {
    background: white;
    border: 1px solid black;
  }

  &::-webkit-scrollbar-button {
    background: white;
    border: 1px solid black;
    width: 16px;
    height: 16px;
  }
`;

const IconView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 16px;
  padding: 16px;
`;

const Icon = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px;
  background: ${props => props.$selected ? '#000000' : 'transparent'};
  color: ${props => props.$selected ? '#ffffff' : '#000000'};
  border-radius: 4px;

  &:hover {
    background: ${props => props.$selected ? '#000000' : '#e0e0e0'};
  }
`;

const IconImage = styled.div`
  width: 32px;
  height: 32px;
  border: 1px solid currentColor;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconLabel = styled.div`
  font-size: 12px;
  text-align: center;
  word-break: break-word;
`;

interface MacWindowProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const MacWindow: React.FC<MacWindowProps> = ({ onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const icons = [
    { id: 'system', name: 'System Folder' },
    { id: 'themes', name: 'Themes' },
    { id: 'simpletext', name: 'SimpleText' },
    { id: 'trash', name: 'Trash' }
  ];

  return (
    <MacWrapper>
      <MenuBar>
        <AppleMenu />
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>View</MenuItem>
        <MenuItem>Special</MenuItem>
      </MenuBar>
      <Desktop>
        <Sidebar>
          <IconView>
            {icons.map(icon => (
              <Icon 
                key={icon.id}
                $selected={selectedIcon === icon.id}
                onClick={() => setSelectedIcon(icon.id)}
              >
                <IconImage>{icon.id[0].toUpperCase()}</IconImage>
                <IconLabel>{icon.name}</IconLabel>
              </Icon>
            ))}
          </IconView>
        </Sidebar>
        <MainWindow>
          <WindowTitle>
            <CloseBox onClick={onClose}>×</CloseBox>
            <span>UI Generator.txt</span>
            <div style={{ width: 12 }} />
          </WindowTitle>
          <WindowContent>
            <MacSimpleText />
          </WindowContent>
        </MainWindow>
      </Desktop>
    </MacWrapper>
  );
}; 