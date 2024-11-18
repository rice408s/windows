import React, { useState } from 'react';
import styled from 'styled-components';
import { Win95Notepad } from '../Win95Notepad/Win95Notepad';

const Win95Wrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #c0c0c0;
  position: relative;
  font-family: ${props => props.theme.fontFamily};
  display: flex;
  flex-direction: column;
  border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
`;

const Taskbar = styled.div`
  height: 28px;
  background: #c0c0c0;
  border-top: 2px solid #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 2px 4px;
`;

const StartButton = styled.button`
  height: 22px;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  font-family: inherit;
  font-size: 11px;
  cursor: pointer;

  &:active {
    border-color: #808080 #ffffff #ffffff #808080;
  }
`;

const Desktop = styled.div`
  flex: 1;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 64px);
  gap: 16px;
  align-content: start;
`;

const DesktopIcon = styled.div<{ $selected?: boolean }>`
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  padding: 4px;
  background: ${props => props.$selected ? '#000080' : 'transparent'};
  color: ${props => props.$selected ? '#ffffff' : '#000000'};

  &:hover {
    background: ${props => props.$selected ? '#000080' : '#000080'};
    color: #ffffff;
  }
`;

const IconImage = styled.div`
  width: 32px;
  height: 32px;
  background: #c0c0c0;
  border: 1px solid #808080;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const IconLabel = styled.div`
  font-size: 11px;
  text-align: center;
  word-break: break-word;
`;

const MainWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #c0c0c0;
  border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
`;

const WindowHeader = styled.div`
  height: 18px;
  background: #000080;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px;
  font-size: 11px;
`;

const WindowControls = styled.div`
  display: flex;
  gap: 2px;
`;

const WindowButton = styled.button`
  width: 16px;
  height: 14px;
  background: #c0c0c0;
  border: 1px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  font-size: 10px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:active {
    border-color: #808080 #ffffff #ffffff #808080;
  }
`;

const WindowContent = styled.div`
  flex: 1;
  overflow: auto;

  /* Windows 95 风格滚动条 */
  &::-webkit-scrollbar {
    width: 16px;
    height: 16px;
  }

  &::-webkit-scrollbar-track {
    background: #c0c0c0;
    border: 1px solid;
    border-color: #ffffff #808080 #808080 #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background: #c0c0c0;
    border: 1px solid;
    border-color: #ffffff #808080 #808080 #ffffff;
  }

  &::-webkit-scrollbar-button {
    background: #c0c0c0;
    border: 1px solid;
    border-color: #ffffff #808080 #808080 #ffffff;
    width: 16px;
    height: 16px;
  }
`;

interface Win95WindowProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export const Win95Window: React.FC<Win95WindowProps> = ({ onClose }) => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const icons = [
    { id: 'computer', name: '我的电脑', icon: '💻' },
    { id: 'documents', name: '我的文档', icon: '📁' },
    { id: 'notepad', name: '123.txt', icon: '📝' },
    { id: 'recycle', name: '回收站', icon: '🗑️' }
  ];

  return (
    <Win95Wrapper>
      <Desktop>
        {icons.map(icon => (
          <DesktopIcon
            key={icon.id}
            $selected={selectedIcon === icon.id}
            onClick={() => setSelectedIcon(icon.id)}
          >
            <IconImage>{icon.icon}</IconImage>
            <IconLabel>{icon.name}</IconLabel>
          </DesktopIcon>
        ))}
      </Desktop>
      <MainWindow>
        <WindowHeader>
          <span>记事本 - 123.txt</span>
          <WindowControls>
            <WindowButton>_</WindowButton>
            <WindowButton>□</WindowButton>
            <WindowButton onClick={onClose}>×</WindowButton>
          </WindowControls>
        </WindowHeader>
        <WindowContent>
          <Win95Notepad />
        </WindowContent>
      </MainWindow>
      <Taskbar>
        <StartButton>
          <span>🪟</span>
          <span>开始</span>
        </StartButton>
        <TaskbarItem>
          记事本 - 123.txt
        </TaskbarItem>
      </Taskbar>
    </Win95Wrapper>
  );
};

const TaskbarItem = styled.div`
  height: 22px;
  padding: 2px 8px;
  background: #c0c0c0;
  border: 2px solid;
  border-color: #808080 #ffffff #ffffff #808080;
  margin-left: 4px;
  font-size: 11px;
  display: flex;
  align-items: center;
  min-width: 150px;
`; 