import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const flicker = keyframes`
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
`;

const C64Wrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #4040E0;  // C64 经典蓝色
  color: #A0A0FF;       // C64 浅蓝色文字
  font-family: "C64 Pro", monospace;
  padding: 40px;
  position: relative;
  border-radius: 0;
  box-shadow: 0 0 50px rgba(64, 64, 224, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(160, 160, 255, 0.1) 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 2px;
    pointer-events: none;
    opacity: 0.2;
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

const OutputLine = styled.div`
  line-height: 16px;
  min-height: 16px;
  white-space: pre;
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
  color: #A0A0FF;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  caret-color: transparent;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #A0A0FF;
  animation: ${flicker} 1s step-end infinite;
`;

export const C64Window: React.FC = () => {
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = [
      '**** COMMODORE 64 BASIC V2 ****',
      '64K RAM SYSTEM  38911 BASIC BYTES FREE',
      'READY.',
      ''
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setOutputLines(prev => [...prev, line]);
      }, index * 500);
    });
  }, []);

  const handleCommand = (command: string) => {
    const newLines = [...outputLines];
    newLines.push(command);

    switch (command.toUpperCase()) {
      case 'HELP':
        newLines.push(
          '',
          'AVAILABLE COMMANDS:',
          'HELP    - SHOW THIS HELP',
          'LIST    - LIST PROGRAM',
          'RUN     - RUN PROGRAM',
          'NEW     - CLEAR PROGRAM',
          'LOAD    - LOAD PROGRAM',
          'SAVE    - SAVE PROGRAM',
          'THEME   - CHANGE THEME',
          '',
          'READY.'
        );
        break;
      case 'LIST':
        newLines.push(
          '',
          '10 REM C64 UI GENERATOR',
          '20 PRINT CHR$(147)',
          '30 PRINT "C64 UI GENERATOR V1.0"',
          '40 PRINT',
          '50 PRINT "1. CREATE BUTTON"',
          '60 PRINT "2. CREATE TEXT"',
          '70 PRINT "3. EXIT"',
          '80 GET A$: IF A$="" THEN 80',
          '90 IF A$="3" THEN END',
          '100 GOTO 80',
          '',
          'READY.'
        );
        break;
      case 'THEME':
        newLines.push(
          '',
          'AVAILABLE THEMES:',
          '1. C64',
          '2. DOS',
          '3. WINDOWS 95',
          '4. MACINTOSH',
          '5. AMIGA',
          '6. ATARI ST',
          '',
          'TYPE "THEME X" TO SELECT',
          '',
          'READY.'
        );
        break;
      default:
        if (command.toUpperCase().startsWith('THEME ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['c64', 'dos', 'windows95', 'macintosh', 'amiga', 'atari'];
          const selectedTheme = themes[parseInt(themeNumber) - 1];
          
          if (selectedTheme) {
            newLines.push(
              '',
              `LOADING ${selectedTheme.toUpperCase()}...`,
              'PLEASE WAIT...'
            );
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('themeChange', { detail: selectedTheme }));
            }, 1500);
          } else {
            newLines.push('', '?SYNTAX ERROR', '', 'READY.');
          }
        } else if (command.trim() !== '') {
          newLines.push('', '?SYNTAX ERROR', '', 'READY.');
        } else {
          newLines.push('READY.');
        }
    }
    
    setOutputLines(newLines);
    setCurrentCommand('');
  };

  return (
    <C64Wrapper onClick={() => inputRef.current?.focus()}>
      <Screen>
        {outputLines.map((line, index) => (
          <OutputLine key={index}>{line}</OutputLine>
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
    </C64Wrapper>
  );
}; 