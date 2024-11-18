import React, { useState } from 'react';
import styled from 'styled-components';

const SimpleTextWindow = styled.div`
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
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    background: black;
    color: white;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  padding: 8px;
  font-family: Monaco, monospace;
  font-size: 12px;
  border: none;
  resize: none;
  outline: none;
  white-space: pre;
  line-height: 1.4;
  background: white;
  color: black;

  &::selection {
    background: black;
    color: white;
  }
`;

const StatusBar = styled.div`
  height: 20px;
  border-top: 1px solid black;
  padding: 2px 8px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface MacSimpleTextProps {
  onClose?: () => void;
}

export const MacSimpleText: React.FC<MacSimpleTextProps> = () => {
  const [text, setText] = useState(`{ Macintosh UI Generator }
{ Pascal-style code example }

program UIGenerator;

type
  TComponent = record
    Name: string;
    Left, Top: Integer;
    Width, Height: Integer;
  end;

var
  Form: array[1..10] of TComponent;
  ComponentCount: Integer;

procedure CreateButton(Name: string; X, Y: Integer);
begin
  Inc(ComponentCount);
  with Form[ComponentCount] do
  begin
    Name := Name;
    Left := X;
    Top := Y;
    Width := 80;
    Height := 24;
  end;
end;

procedure CreateTextField(Name: string; X, Y: Integer);
begin
  Inc(ComponentCount);
  with Form[ComponentCount] do
  begin
    Name := Name;
    Left := X;
    Top := Y;
    Width := 120;
    Height := 20;
  end;
end;

begin
  ComponentCount := 0;
  CreateButton('OKButton', 10, 10);
  CreateTextField('NameField', 10, 40);
end.

{ Press Command-R to Run }
{ Press Command-S to Save }`);

  const [selection, setSelection] = useState({ start: 0, end: 0 });

  const handleSelect = (e: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setSelection({
      start: target.selectionStart || 0,
      end: target.selectionEnd || 0
    });
  };

  return (
    <SimpleTextWindow>
      <MenuBar>
        <MenuItem>File</MenuItem>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Font</MenuItem>
        <MenuItem>Style</MenuItem>
      </MenuBar>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onSelect={handleSelect}
        onKeyUp={handleSelect}
        spellCheck={false}
      />
      <StatusBar>
        <span>Selection: {selection.start} to {selection.end}</span>
        <span>{text.split('\n').length} lines</span>
      </StatusBar>
    </SimpleTextWindow>
  );
}; 