import React, { useState } from 'react';
import styled from 'styled-components';

const NotepadWindow = styled.div`
  background: #c0c0c0;
  border: 2px solid;
  border-color: #ffffff #808080 #808080 #ffffff;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MenuBar = styled.div`
  height: 20px;
  display: flex;
  align-items: center;
  padding: 2px 0;
  border-bottom: 1px solid #808080;
`;

const MenuItem = styled.div`
  padding: 2px 8px;
  cursor: pointer;

  &:hover {
    background: #000080;
    color: white;
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  margin: 2px;
  padding: 4px;
  background: white;
  border: 1px solid #808080;
  border-color: #808080 #ffffff #ffffff #808080;
  font-family: 'Lucida Console', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  white-space: pre;
  overflow-wrap: normal;
  overflow-x: auto;
`;

const StatusBar = styled.div`
  height: 20px;
  border-top: 1px solid #808080;
  padding: 2px 8px;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

interface Win95NotepadProps {
  onClose?: () => void;
}

export const Win95Notepad: React.FC<Win95NotepadProps> = () => {
  const [text, setText] = useState(`' Visual Basic 风格的 UI 生成器代码示例
' 作者: RetroUI Generator
' 日期: ${new Date().toLocaleDateString()}

Option Explicit

' 窗体定义
Begin Form Form1
  Caption = "我的应用程序"
  Width = 4800
  Height = 3600
  
  ' 控件定义
  Begin CommandButton Button1
    Caption = "点击我"
    Left = 120
    Top = 120
    Width = 1215
    Height = 375
  End
  
  Begin TextBox Text1
    Text = "输入文本"
    Left = 120
    Top = 600
    Width = 2415
    Height = 285
  End
  
  Begin CheckBox Check1
    Caption = "选项1"
    Left = 120
    Top = 1080
    Width = 1215
    Height = 255
  End
End Form

' 事件处理
Sub Button1_Click()
  MsgBox "你点击了按钮！"
End Sub

Sub Form_Load()
  Text1.Text = "程序已启动"
End Sub

' 按F5运行程序
' 按Ctrl+S保存代码
' 按Alt+F4关闭窗口`);

  const [cursorPosition, setCursorPosition] = useState({ line: 1, col: 1 });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSelect = (e: React.MouseEvent<HTMLTextAreaElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const lines = target.value.substr(0, target.selectionStart).split('\n');
    setCursorPosition({
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    });
  };

  return (
    <NotepadWindow>
      <MenuBar>
        <MenuItem>文件(F)</MenuItem>
        <MenuItem>编辑(E)</MenuItem>
        <MenuItem>搜索(S)</MenuItem>
        <MenuItem>帮助(H)</MenuItem>
      </MenuBar>
      <TextArea 
        value={text}
        onChange={handleTextChange}
        onKeyUp={handleSelect}
        onClick={handleSelect}
        spellCheck={false}
      />
      <StatusBar>
        第 {cursorPosition.line} 行，第 {cursorPosition.col} 列
      </StatusBar>
    </NotepadWindow>
  );
}; 