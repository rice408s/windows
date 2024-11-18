import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const scanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const flicker = keyframes`
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
`;

const BBCWrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #000000;
  color: #FFFF00;  // BBC Micro 黄色
  font-family: "BBC Micro", monospace;
  padding: 40px;
  position: relative;
  border-radius: 0;
  box-shadow: 0 0 50px rgba(255, 255, 0, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(255, 255, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 2px;
    pointer-events: none;
    opacity: 0.15;
    animation: ${scanline} 10s linear infinite;
  }
`;

const Screen = styled.div`
  height: 100%;
  padding: 16px;
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
  text-shadow: 0 0 5px ${props => props.$color || '#FFFF00'};
  color: ${props => props.$color || '#FFFF00'};
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
  color: #FFFF00;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  caret-color: transparent;
  text-shadow: 0 0 5px #FFFF00;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #FFFF00;
  animation: ${flicker} 1s step-end infinite;
  box-shadow: 0 0 5px #FFFF00;
`;

const colors = {
  yellow: '#FFFF00',
  blue: '#0000FF',
  red: '#FF0000',
  white: '#FFFFFF',
  cyan: '#00FFFF'
};

export const BBCMicroWindow: React.FC = () => {
  const [outputLines, setOutputLines] = useState<Array<{ text: string; color?: string }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = [
      { text: 'BBC Computer 32K', color: colors.white },
      { text: 'Acorn DFS', color: colors.yellow },
      { text: '', color: colors.white },
      { text: 'BASIC', color: colors.yellow },
      { text: '>', color: colors.white }
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setOutputLines(prev => [...prev, line]);
      }, index * 500);
    });
  }, []);

  const handleCommand = (command: string) => {
    const newLines = [...outputLines, { text: `>${command}`, color: colors.white }];

    switch (command.toUpperCase()) {
      case 'HELP':
        newLines.push(
          { text: '', color: colors.white },
          { text: 'Available commands:', color: colors.cyan },
          { text: 'HELP    - Show this help', color: colors.yellow },
          { text: 'LIST    - List program', color: colors.yellow },
          { text: 'RUN     - Run program', color: colors.yellow },
          { text: 'CLS     - Clear screen', color: colors.yellow },
          { text: 'THEME   - Change theme', color: colors.yellow },
          { text: '', color: colors.white },
          { text: '>', color: colors.white }
        );
        break;
      case 'LIST':
        newLines.push(
          { text: '', color: colors.white },
          { text: '10 REM BBC MICRO UI GENERATOR', color: colors.yellow },
          { text: '20 MODE 7', color: colors.yellow },
          { text: '30 PRINT "BBC MICRO UI GENERATOR"', color: colors.yellow },
          { text: '40 PRINT "VERSION 1.0"', color: colors.yellow },
          { text: '50 PRINT', color: colors.yellow },
          { text: '60 PRINT "1) CREATE BUTTON"', color: colors.yellow },
          { text: '70 PRINT "2) CREATE INPUT"', color: colors.yellow },
          { text: '80 PRINT "3) EXIT"', color: colors.yellow },
          { text: '90 INPUT A$', color: colors.yellow },
          { text: '100 IF A$="3" THEN END', color: colors.yellow },
          { text: '110 GOTO 90', color: colors.yellow },
          { text: '', color: colors.white },
          { text: '>', color: colors.white }
        );
        break;
      case 'THEME':
        newLines.push(
          { text: '', color: colors.white },
          { text: 'Available themes:', color: colors.cyan },
          { text: '1. BBC Micro', color: colors.yellow },
          { text: '2. DOS', color: colors.yellow },
          { text: '3. Windows 95', color: colors.yellow },
          { text: '4. Macintosh', color: colors.yellow },
          { text: '5. Amiga', color: colors.yellow },
          { text: '6. Atari ST', color: colors.yellow },
          { text: '', color: colors.white },
          { text: 'Type "THEME X" to select', color: colors.cyan },
          { text: '', color: colors.white },
          { text: '>', color: colors.white }
        );
        break;
      default:
        if (command.toUpperCase().startsWith('THEME ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['bbcmicro', 'dos', 'windows95', 'macintosh', 'amiga', 'atari'];
          const selectedTheme = themes[parseInt(themeNumber) - 1];
          
          if (selectedTheme) {
            newLines.push(
              { text: '', color: colors.white },
              { text: `Loading ${selectedTheme.toUpperCase()}...`, color: colors.cyan },
              { text: 'Please wait...', color: colors.yellow }
            );
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('themeChange', { detail: selectedTheme }));
            }, 1500);
          } else {
            newLines.push(
              { text: '', color: colors.white },
              { text: 'Bad command or filename', color: colors.red },
              { text: '', color: colors.white },
              { text: '>', color: colors.white }
            );
          }
        } else if (command.trim() !== '') {
          newLines.push(
            { text: '', color: colors.white },
            { text: 'Bad command or filename', color: colors.red },
            { text: '', color: colors.white },
            { text: '>', color: colors.white }
          );
        } else {
          newLines.push({ text: '>', color: colors.white });
        }
    }
    
    setOutputLines(newLines);
    setCurrentCommand('');
  };

  return (
    <BBCWrapper onClick={() => inputRef.current?.focus()}>
      <Screen>
        {outputLines.map((line, index) => (
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
    </BBCWrapper>
  );
}; 