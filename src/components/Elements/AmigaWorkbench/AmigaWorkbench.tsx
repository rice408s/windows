import React, { useState } from 'react';
import styled from 'styled-components';

const WorkbenchContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #aaaaaa;
`;

const TopBar = styled.div`
  height: 24px;
  background: #0055aa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 16px;
`;

const TopBarButton = styled.button`
  height: 18px;
  padding: 0 8px;
  background: #aaaaaa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  color: black;
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;

  &:active {
    border-color: #000000 #ffffff #ffffff #000000;
  }
`;

const WorkArea = styled.div`
  flex: 1;
  display: flex;
  gap: 4px;
  padding: 4px;
  background: #0055aa;
`;

const IconDrawer = styled.div`
  width: 120px;
  background: #aaaaaa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const IconBox = styled.div<{ $selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px;
  cursor: pointer;
  background: ${props => props.$selected ? '#0055aa' : 'transparent'};
  color: ${props => props.$selected ? '#ffffff' : '#000000'};

  &:hover {
    background: #0055aa;
    color: #ffffff;
  }
`;

const IconImage = styled.div`
  width: 40px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const IconLabel = styled.div`
  font-size: 12px;
  text-align: center;
  word-break: break-word;
`;

const Editor = styled.div`
  flex: 1;
  background: #aaaaaa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  display: flex;
  flex-direction: column;
`;

const EditorToolbar = styled.div`
  height: 24px;
  background: #aaaaaa;
  border-bottom: 2px solid;
  border-color: #000000 #ffffff #ffffff #000000;
  display: flex;
  align-items: center;
  padding: 0 4px;
  gap: 4px;
`;

const ToolButton = styled.button`
  width: 20px;
  height: 20px;
  background: #aaaaaa;
  border: 2px solid;
  border-color: #ffffff #000000 #000000 #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;

  &:active {
    border-color: #000000 #ffffff #ffffff #000000;
  }
`;

const EditorContent = styled.textarea`
  flex: 1;
  padding: 8px;
  background: #ffffff;
  border: 2px solid;
  border-color: #000000 #ffffff #ffffff #000000;
  margin: 4px;
  font-family: 'Topaz', monospace;
  font-size: 12px;
  resize: none;
  outline: none;
  white-space: pre;
  color: black;
`;

const StatusBar = styled.div`
  height: 20px;
  background: #aaaaaa;
  border-top: 2px solid;
  border-color: #000000 #ffffff #ffffff #000000;
  padding: 0 8px;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const AmigaWorkbench: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [code, setCode] = useState(`; Amiga Assembly UI Generator
; Example code:

        SECTION "Code",CODE

Start:  move.l  #Window,a0     ; Window definition
        move.l  #Screen,a1     ; Screen definition
        moveq   #-1,d0         ; Wait forever
        jsr     OpenWindow     ; Open the window

        move.l  #Button,a0     ; Button definition
        move.l  #10,d0         ; X position
        move.l  #10,d1         ; Y position
        jsr     CreateButton   ; Create button

        move.l  #Text,a0       ; Text definition
        move.l  #10,d0         ; X position
        move.l  #40,d1         ; Y position
        jsr     CreateText     ; Create text

        rts                    ; Return

Window: dc.b    "My Window",0
Screen: dc.b    "Workbench",0
Button: dc.b    "Click Me",0
Text:   dc.b    "Hello Amiga!",0

; Press Amiga+E to compile
; Press Amiga+X to run`);

  const icons = [
    { id: 'shell', name: 'Shell', icon: '>' },
    { id: 'editor', name: 'Editor', icon: 'E' },
    { id: 'compiler', name: 'Compiler', icon: 'C' },
    { id: 'debug', name: 'Debug', icon: 'D' }
  ];

  return (
    <WorkbenchContainer>
      <TopBar>
        <TopBarButton>Workbench</TopBarButton>
        <TopBarButton>Window</TopBarButton>
        <TopBarButton>Tools</TopBarButton>
      </TopBar>
      <WorkArea>
        <IconDrawer>
          {icons.map(icon => (
            <IconBox
              key={icon.id}
              $selected={selectedIcon === icon.id}
              onClick={() => setSelectedIcon(icon.id)}
            >
              <IconImage>{icon.icon}</IconImage>
              <IconLabel>{icon.name}</IconLabel>
            </IconBox>
          ))}
        </IconDrawer>
        <Editor>
          <EditorToolbar>
            <ToolButton title="New">N</ToolButton>
            <ToolButton title="Open">O</ToolButton>
            <ToolButton title="Save">S</ToolButton>
            <ToolButton title="Compile">C</ToolButton>
            <ToolButton title="Run">R</ToolButton>
          </EditorToolbar>
          <EditorContent
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <StatusBar>
            Line: 1 Col: 1
          </StatusBar>
        </Editor>
      </WorkArea>
    </WorkbenchContainer>
  );
}; 