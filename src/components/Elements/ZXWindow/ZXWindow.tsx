import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const flicker = keyframes`
  0% { opacity: 0.98; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
`;

const tvTurnOn = keyframes`
  0% { transform: scaleY(0.0); filter: brightness(0); }
  50% { transform: scaleY(0.5); filter: brightness(0.5); }
  100% { transform: scaleY(1.0); filter: brightness(1); }
`;

const ZXWrapper = styled.div`
  width: 800px;
  height: 600px;
  background: #000000;
  color: #FFFFFF;
  font-family: "ZX Spectrum", monospace;
  padding: 16px;
  position: relative;
  overflow: hidden;
  animation: ${flicker} 0.1s infinite, ${tvTurnOn} 1s ease-out;
  border: 16px solid #333;
  border-radius: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(255, 255, 255, 0.1) 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 2px;
    pointer-events: none;
    opacity: 0.1;
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

const OutputLine = styled.div<{ $color?: string; $background?: string; $bright?: boolean }>`
  line-height: 16px;
  min-height: 16px;
  color: ${props => props.$color || '#FFFFFF'};
  background: ${props => props.$background || 'transparent'};
  white-space: pre;
  filter: brightness(${props => props.$bright ? 1.5 : 1});
`;

const InputLine = styled.div`
  display: flex;
  align-items: center;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 16px;
  background: #FFFFFF;
  animation: ${flicker} 0.5s step-end infinite;
  margin-left: 4px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 16px);
  caret-color: transparent;
`;

const colors = {
  black: '#000000',
  blue: '#0000FF',
  red: '#FF0000',
  magenta: '#FF00FF',
  green: '#00FF00',
  cyan: '#00FFFF',
  yellow: '#FFFF00',
  white: '#FFFFFF'
};

export const ZXWindow: React.FC = () => {
  const [lines, setLines] = useState<Array<{ text: string; color?: string; background?: string; bright?: boolean }>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bootSequence = [
      { text: '© 1982 Sinclair Research Ltd', color: colors.white },
      { text: '', color: colors.white },
      { text: 'ZX SPECTRUM 48K BASIC', color: colors.cyan, bright: true },
      { text: '', color: colors.white },
      { text: 'Memory: 48K', color: colors.yellow },
      { text: 'BASIC: 40K', color: colors.yellow },
      { text: '', color: colors.white },
      { text: 'Ready to load UI Generator', color: colors.green },
      { text: '', color: colors.white },
      { text: 'PROGRAM: UI-GEN', color: colors.magenta },
      { text: 'BYTES: 6912', color: colors.magenta },
      { text: '', color: colors.white },
      { text: '10 REM UI GENERATOR', color: colors.white },
      { text: '20 BORDER 0', color: colors.white },
      { text: '30 PAPER 0', color: colors.white },
      { text: '40 INK 7', color: colors.white },
      { text: '50 CLS', color: colors.white },
      { text: '60 PRINT "ZX UI GENERATOR"', color: colors.white },
      { text: '', color: colors.white },
      { text: 'Ready.', color: colors.cyan }
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (screenRef.current) {
          screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
      }, index * 200);
    });
  }, []);

  const handleCommand = (command: string) => {
    const newLines = [...lines];
    newLines.push({ text: command, color: colors.white });

    switch (command.toUpperCase()) {
      case 'HELP':
        newLines.push(
          { text: '', color: colors.white },
          { text: 'Available commands:', color: colors.cyan, bright: true },
          { text: 'HELP    - Show this help', color: colors.yellow },
          { text: 'LIST    - List program', color: colors.yellow },
          { text: 'RUN     - Run program', color: colors.yellow },
          { text: 'CLS     - Clear screen', color: colors.yellow },
          { text: 'THEME   - Change theme', color: colors.yellow },
          { text: '', color: colors.white },
          { text: 'Ready.', color: colors.cyan }
        );
        break;
      case 'CLS':
        setLines([{ text: 'Ready.', color: colors.cyan }]);
        setCurrentCommand('');
        return;
      case 'THEME':
        newLines.push(
          { text: '', color: colors.white },
          { text: 'Available themes:', color: colors.cyan, bright: true },
          { text: '1. ZX Spectrum', color: colors.yellow },
          { text: '2. DOS', color: colors.yellow },
          { text: '3. Windows 95', color: colors.yellow },
          { text: '4. Macintosh', color: colors.yellow },
          { text: '5. Amiga', color: colors.yellow },
          { text: '6. Atari ST', color: colors.yellow },
          { text: '', color: colors.white },
          { text: 'Type "THEME X" to select', color: colors.green },
          { text: '', color: colors.white },
          { text: 'Ready.', color: colors.cyan }
        );
        break;
      default:
        if (command.toUpperCase().startsWith('THEME ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['zxspectrum', 'dos', 'windows95', 'macintosh', 'amiga', 'atari'];
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
              { text: 'Syntax error', color: colors.red, bright: true },
              { text: '', color: colors.white },
              { text: 'Ready.', color: colors.cyan }
            );
          }
        } else if (command.trim() !== '') {
          newLines.push(
            { text: '', color: colors.white },
            { text: 'Syntax error', color: colors.red, bright: true },
            { text: '', color: colors.white },
            { text: 'Ready.', color: colors.cyan }
          );
        } else {
          newLines.push({ text: 'Ready.', color: colors.cyan });
        }
    }
    
    setLines(newLines);
    setCurrentCommand('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <ZXWrapper onClick={() => inputRef.current?.focus()}>
      <Screen ref={screenRef}>
        {lines.map((line, index) => (
          <OutputLine 
            key={index}
            $color={line.color}
            $background={line.background}
            $bright={line.bright}
          >
            {line.text}
          </OutputLine>
        ))}
        <InputLine>
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
        </InputLine>
      </Screen>
    </ZXWrapper>
  );
}; 