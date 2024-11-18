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

const TRS80Wrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #000000;
  color: #33FF33;  // TRS-80 荧光绿
  font-family: "TRS-80", monospace;
  padding: 40px;
  position: relative;
  border-radius: 0;
  box-shadow: 0 0 50px rgba(51, 255, 51, 0.2);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(51, 255, 51, 0.1) 50%,
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

const OutputLine = styled.div`
  line-height: 16px;
  min-height: 16px;
  white-space: pre;
  text-shadow: 0 0 5px #33FF33;
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
  color: #33FF33;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  caret-color: transparent;
  text-shadow: 0 0 5px #33FF33;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 14px;
  background: #33FF33;
  animation: ${flicker} 1s step-end infinite;
  box-shadow: 0 0 5px #33FF33;
`;

export const TRS80Window: React.FC = () => {
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = [
      'TRS-80 MODEL III',
      'TRSDOS 1.3 - 05/01/82',
      'MEMORY SIZE? ',
      '48K',
      'DRIVE CONFIGURATION?',
      '2 DRIVES',
      '',
      'READY',
      '>'
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setOutputLines(prev => [...prev, line]);
      }, index * 500);
    });
  }, []);

  const handleCommand = (command: string) => {
    const newLines = [...outputLines];
    newLines.push(`>${command}`);

    switch (command.toUpperCase()) {
      case 'HELP':
        newLines.push(
          '',
          'AVAILABLE COMMANDS:',
          'HELP    - SHOW THIS HELP',
          'LIST    - LIST PROGRAM',
          'RUN     - RUN PROGRAM',
          'CLS     - CLEAR SCREEN',
          'THEME   - CHANGE THEME',
          '',
          'READY',
          '>'
        );
        break;
      case 'LIST':
        newLines.push(
          '',
          '10 REM TRS-80 UI GENERATOR',
          '20 CLS',
          '30 PRINT "TRS-80 UI GENERATOR"',
          '40 PRINT "VERSION 1.0"',
          '50 PRINT',
          '60 PRINT "1) CREATE BUTTON"',
          '70 PRINT "2) CREATE INPUT"',
          '80 PRINT "3) EXIT"',
          '90 INPUT A$',
          '100 IF A$="3" THEN END',
          '110 GOTO 90',
          '',
          'READY',
          '>'
        );
        break;
      case 'THEME':
        newLines.push(
          '',
          'AVAILABLE THEMES:',
          '1. TRS-80',
          '2. DOS',
          '3. WINDOWS 95',
          '4. MACINTOSH',
          '5. AMIGA',
          '6. ATARI ST',
          '',
          'TYPE "THEME X" TO SELECT',
          '',
          'READY',
          '>'
        );
        break;
      default:
        if (command.toUpperCase().startsWith('THEME ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['trs80', 'dos', 'windows95', 'macintosh', 'amiga', 'atari'];
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
            newLines.push('', '?SYNTAX ERROR', '', 'READY', '>');
          }
        } else if (command.trim() !== '') {
          newLines.push('', '?SYNTAX ERROR', '', 'READY', '>');
        } else {
          newLines.push('READY', '>');
        }
    }
    
    setOutputLines(newLines);
    setCurrentCommand('');
  };

  return (
    <TRS80Wrapper onClick={() => inputRef.current?.focus()}>
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
    </TRS80Wrapper>
  );
}; 