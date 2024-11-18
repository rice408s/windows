import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const MSXWrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #000000;
  color: #21FF21;
  font-family: "MSX Screen", monospace;
  padding: 16px;
  position: relative;
  overflow: hidden;
  border: 16px solid #444;
  border-radius: 0;
  box-shadow: 0 0 50px rgba(33, 255, 33, 0.15);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      transparent 0%,
      rgba(33, 255, 33, 0.2) 50%,
      transparent 100%
    );
    animation: ${scanline} 10s linear infinite;
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 100%
    );
    pointer-events: none;
  }
`;

const Screen = styled.div`
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  position: relative;
  
  /* 隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OutputLine = styled.div<{ $color?: string }>`
  line-height: 16px;
  min-height: 16px;
  white-space: pre;
  text-shadow: 0 0 5px #21FF21;
  color: ${props => props.$color || '#21FF21'};
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  line-height: 16px;
  position: relative;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #21FF21;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  caret-color: transparent;
  text-shadow: 0 0 5px #21FF21;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #21FF21;
  animation: ${scanline} 1s step-end infinite;
  box-shadow: 0 0 5px #21FF21;
`;

const colors = {
  white: '#FFFFFF',
  green: '#21FF21',
  red: '#FF5555',
  yellow: '#FFFF55',
  blue: '#5555FF',
  magenta: '#FF55FF',
  cyan: '#55FFFF'
};

export const MSXWindow: React.FC = () => {
  const [lines, setLines] = useState<Array<{ text: string; color?: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = [
      { text: 'MSX BASIC version 2.0', color: colors.green },
      { text: 'Copyright 1983 by Microsoft', color: colors.cyan },
      { text: '42378 Bytes free', color: colors.yellow },
      { text: '' },
      { text: 'Screen 0', color: colors.white },
      { text: 'Width 40', color: colors.white },
      { text: 'Color 15,0,0', color: colors.white },
      { text: 'Cls', color: colors.white },
      { text: '' },
      { text: '10 REM MSX UI GENERATOR', color: colors.green },
      { text: '20 SCREEN 2', color: colors.green },
      { text: '30 COLOR 15,1,1', color: colors.green },
      { text: '40 LINE (0,0)-(255,191),15,B', color: colors.green },
      { text: '50 PRESET (10,10)', color: colors.green },
      { text: '60 PRINT #1,"MSX UI GENERATOR"', color: colors.green },
      { text: '70 PRESET (10,30)', color: colors.green },
      { text: '80 PRINT #1,"Version 1.0"', color: colors.green },
      { text: '' },
      { text: 'Ok', color: colors.cyan }
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, index * 200);
    });
  }, []);

  const handleCommand = (command: string) => {
    const newLines = [...lines, { text: `>${command}`, color: colors.white }];

    switch (command.toUpperCase()) {
      case 'HELP':
        newLines.push(
          { text: '' },
          { text: 'Available commands:', color: colors.cyan },
          { text: 'HELP    - Show this help', color: colors.yellow },
          { text: 'LIST    - List program', color: colors.yellow },
          { text: 'RUN     - Run program', color: colors.yellow },
          { text: 'CLS     - Clear screen', color: colors.yellow },
          { text: 'THEME   - Change theme', color: colors.yellow },
          { text: '' },
          { text: 'Ok', color: colors.cyan }
        );
        break;
      case 'LIST':
        newLines.push(
          { text: '' },
          { text: '10 REM MSX UI GENERATOR', color: colors.green },
          { text: '20 SCREEN 2', color: colors.green },
          { text: '30 COLOR 15,1,1', color: colors.green },
          { text: '40 LINE (0,0)-(255,191),15,B', color: colors.green },
          { text: '50 PRESET (10,10)', color: colors.green },
          { text: '60 PRINT #1,"MSX UI GENERATOR"', color: colors.green },
          { text: '70 PRESET (10,30)', color: colors.green },
          { text: '80 PRINT #1,"Version 1.0"', color: colors.green },
          { text: '' },
          { text: 'Ok', color: colors.cyan }
        );
        break;
      case 'CLS':
        setLines([{ text: 'Ok', color: colors.cyan }]);
        setCurrentCommand('');
        return;
      case 'RUN':
        newLines.push(
          { text: '' },
          { text: 'MSX UI GENERATOR', color: colors.white },
          { text: 'Version 1.0', color: colors.white },
          { text: '' },
          { text: 'Press ESC to exit', color: colors.yellow },
          { text: '' },
          { text: 'Ok', color: colors.cyan }
        );
        break;
      case 'THEME':
        newLines.push(
          { text: '' },
          { text: 'Available themes:', color: colors.cyan },
          { text: '1. MSX', color: colors.yellow },
          { text: '2. DOS', color: colors.yellow },
          { text: '3. Windows 95', color: colors.yellow },
          { text: '4. Macintosh', color: colors.yellow },
          { text: '5. Amiga', color: colors.yellow },
          { text: '6. Atari ST', color: colors.yellow },
          { text: '' },
          { text: 'Type "THEME <number>" to select', color: colors.green },
          { text: '' },
          { text: 'Ok', color: colors.cyan }
        );
        break;
      default:
        if (command.toUpperCase().startsWith('THEME ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['msx', 'dos', 'windows95', 'macintosh', 'amiga', 'atari'];
          const selectedTheme = themes[parseInt(themeNumber) - 1];
          
          if (selectedTheme) {
            newLines.push(
              { text: '' },
              { text: `Loading ${selectedTheme.toUpperCase()}...`, color: colors.cyan },
              { text: 'Please wait...', color: colors.yellow }
            );
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('themeChange', { detail: selectedTheme }));
            }, 1500);
          } else {
            newLines.push(
              { text: '' },
              { text: 'Syntax error', color: colors.red },
              { text: '' },
              { text: 'Ok', color: colors.cyan }
            );
          }
        } else if (command.trim() !== '') {
          newLines.push(
            { text: '' },
            { text: 'Syntax error', color: colors.red },
            { text: '' },
            { text: 'Ok', color: colors.cyan }
          );
        } else {
          newLines.push({ text: 'Ok', color: colors.cyan });
        }
    }
    
    setLines(newLines);
    setCurrentCommand('');
  };

  return (
    <MSXWrapper onClick={() => inputRef.current?.focus()}>
      <Screen>
        {lines.map((line, index) => (
          <OutputLine key={index} $color={line.color}>
            {line.text}
          </OutputLine>
        ))}
        <CommandLine>
          <Input
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(currentCommand);
              }
            }}
            spellCheck={false}
            autoComplete="off"
          />
          <Cursor />
        </CommandLine>
      </Screen>
    </MSXWrapper>
  );
};