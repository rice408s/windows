import React, { useState } from 'react';
import styled from 'styled-components';

const BasicEditor = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
`;

const MenuBar = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;
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

const EditorArea = styled.div`
  flex: 1;
  display: flex;
`;

const LineNumbers = styled.div`
  width: 50px;
  background: #e0e0e0;
  border-right: 1px solid black;
  padding: 4px;
  font-family: monospace;
  font-size: 12px;
  text-align: right;
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 4px;
  border: none;
  resize: none;
  outline: none;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre;
  overflow-x: auto;
`;

const StatusBar = styled.div`
  height: 20px;
  border-top: 1px solid black;
  padding: 2px 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const AtariBasic: React.FC = () => {
  const [code, setCode] = useState(`REM GFA BASIC UI Generator
REM Example code:

PROCEDURE create_window
  OPENW 1,100,50,400,300,"UI Generator"
  PRINT AT(10,20);"Hello from GFA BASIC!"
RETURN

PROCEDURE create_button(x%,y%,text$)
  DEFTEXT 1,0,0,13
  BUTTON 1,x%,y%,80,25,text$
RETURN

PROCEDURE create_input(x%,y%,text$)
  DEFTEXT 1,0,0,13
  PRINT AT(x%,y%);text$
  EDIT 1,x%+10,y%+20,120,16,""
RETURN

REM Main program
CLS
create_window
create_button(10,50,"Click Me")
create_input(10,100,"Enter text:")

REM Press F9 to run
REM Press F10 to compile
REM Press Alt+X to exit`);

  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    const lines = e.target.value.split('\n');
    const lineNumbers = Array.from({ length: lines.length }, (_, i) => i + 1);
    setLineNumbers(lineNumbers);
  };

  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);

  const handleSelect = (e: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const lines = target.value.substr(0, target.selectionStart).split('\n');
    setCursorPos({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  return (
    <BasicEditor>
      <MenuBar>
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Run</MenuItem>
        <MenuItem>Debug</MenuItem>
        <MenuItem>Help</MenuItem>
      </MenuBar>
      <EditorArea>
        <LineNumbers>
          {lineNumbers.map(num => (
            <div key={num}>{num}</div>
          ))}
        </LineNumbers>
        <TextArea
          value={code}
          onChange={handleTextChange}
          onKeyUp={handleSelect}
          onClick={handleSelect}
          spellCheck={false}
        />
      </EditorArea>
      <StatusBar>
        <span>Line: {cursorPos.line} Col: {cursorPos.col}</span>
        <span>GFA BASIC 3.0</span>
      </StatusBar>
    </BasicEditor>
  );
}; 