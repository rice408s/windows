import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const flicker = keyframes`
  0% { opacity: 0.97; }
  50% { opacity: 1; }
  100% { opacity: 0.98; }
`;

const powerOn = keyframes`
  0% { transform: scale(0.1); opacity: 0; filter: brightness(0); }
  10% { transform: scale(1.1); opacity: 0.3; filter: brightness(0.3); }
  30% { transform: scale(1); opacity: 0.7; filter: brightness(0.7); }
  100% { transform: scale(1); opacity: 1; filter: brightness(1); }
`;

const crtScanline = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
`;

const MonitorFrame = styled.div`
  width: 800px;
  height: 600px;
  background: #444;
  border-radius: 0;
  padding: 40px;
  position: relative;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  
  background: linear-gradient(
    45deg,
    #3a3a3a 0%,
    #444444 50%,
    #3a3a3a 100%
  );

  &::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 10px;
    background: #333;
    box-shadow: 0 15px #333, 0 30px #333;
    border-radius: 0;
  }

  &::after {
    content: 'APPLE ][';
    position: absolute;
    bottom: 15px;
    right: 30px;
    color: #666;
    font-size: 14px;
    font-family: "Apple II", monospace;
  }
`;

const Apple2Wrapper = styled.div`
  background: #000000;
  color: #40ff40;
  font-family: "Apple II", "Perfect DOS VGA 437", monospace;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  animation: ${powerOn} 3s ease-out;
  box-shadow: 0 0 20px rgba(64, 255, 64, 0.3);
  border-radius: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      rgba(64, 255, 64, 0.1) 50%,
      rgba(0, 0, 0, 0.1) 50%
    );
    background-size: 100% 2px;
    pointer-events: none;
    opacity: 0.2;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(
        circle at 50% 50%,
        rgba(64, 255, 64, 0.1) 0%,
        rgba(0, 0, 0, 0.3) 100%
      ),
      linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 100%
      );
    pointer-events: none;
    border-radius: 0;
  }
`;

const Screen = styled.div`
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  position: relative;
  
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const OutputLine = styled.div<{ delay?: number }>`
  padding: 0;
  line-height: 16px;
  min-height: 16px;
  opacity: 0;
  animation: fadeIn 0.1s forwards;
  animation-delay: ${props => props.delay || 0}s;
  text-shadow: 0 0 5px #40ff40;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
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
  color: #40ff40;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  text-transform: uppercase;
  width: calc(100% - 16px);
  padding: 0;
  margin: 0;
  caret-color: transparent;
  text-shadow: 0 0 5px #40ff40;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 7px;
  height: 14px;
  background: #40ff40;
  animation: ${flicker} 1s step-end infinite;
  box-shadow: 0 0 5px #40ff40;
`;

interface Apple2WindowProps {
  children?: React.ReactNode;
}

export const Apple2Window: React.FC<Apple2WindowProps> = () => {
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const screenRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const bootSequence = [
      '',
      'APPLE II',
      'BASIC PROGRAMMING SYSTEM',
      'COPYRIGHT 1978 BY APPLE COMPUTER INC.',
      '',
      '*FP',  // 进入浮点BASIC
      '',
      '10 REM UI GENERATOR',
      '20 TEXT : HOME',
      '30 PRINT "APPLE ][ UI GENERATOR"',
      '40 PRINT : PRINT "VERSION 1.0"',
      '50 PRINT : PRINT "READY."',
      '',
      ']'
    ];

    bootSequence.forEach((line, index) => {
      setTimeout(() => {
        setOutputLines(prev => [...prev, line]);
        if (screenRef.current) {
          screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
      }, index * 800);
    });
  }, []);

  const handleCommand = (command: string) => {
    const newLines = [...outputLines];
    newLines.push(`]${command}`);

    switch (command.toUpperCase()) {
      case 'LIST':
        newLines.push(
          '',
          '10 REM UI GENERATOR',
          '20 TEXT : HOME',
          '30 VTAB 10: HTAB 15',
          '40 PRINT "APPLE ][ UI GENERATOR"',
          '50 VTAB 12: HTAB 10',
          '60 PRINT "CREATE BUTTON AT 100,100"',
          '70 VTAB 14: HTAB 10',
          '80 PRINT "CREATE TEXTBOX AT 100,150"',
          '90 GET A$: IF A$ = "Q" THEN END',
          '100 GOTO 90',
          '',
          ']'
        );
        break;
      case 'RUN':
        newLines.push(
          '',
          'APPLE ][ UI GENERATOR',
          '',
          'CREATE BUTTON AT 100,100',
          'CREATE TEXTBOX AT 100,150',
          '',
          'PRESS Q TO QUIT',
          '',
          ']'
        );
        break;
      case 'HOME':
        setOutputLines([']']);
        return;
      case 'CATALOG':
        newLines.push(
          '',
          ' DISK VOLUME 254',
          '',
          ' A 002 HELLO',
          ' B 004 UI.GENERATOR',
          ' T 002 README.TXT',
          ' B 002 BUTTON.SHAPE',
          ' B 002 TEXT.SHAPE',
          '',
          ']'
        );
        break;
      case 'HELP':
        newLines.push(
          '',
          'COMMANDS AVAILABLE:',
          '',
          'LIST   - LIST PROGRAM',
          'RUN    - RUN PROGRAM',
          'HOME   - CLEAR SCREEN',
          'NEW    - CLEAR PROGRAM',
          'LOAD   - LOAD PROGRAM',
          'SAVE   - SAVE PROGRAM',
          'THEME  - CHANGE THEME',
          '',
          ']'
        );
        break;
      case 'THEME':
        newLines.push(
          '',
          'AVAILABLE THEMES:',
          '',
          '1. APPLE ][',
          '2. DOS',
          '3. WINDOWS 95',
          '4. MACINTOSH',
          '5. AMIGA',
          '6. ATARI ST',
          '',
          'TYPE "THEME X" TO SELECT',
          '',
          ']'
        );
        break;
      default:
        if (command.toUpperCase().startsWith('THEME ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['apple2', 'dos', 'windows95', 'macintosh', 'amiga', 'atari'];
          const selectedTheme = themes[parseInt(themeNumber) - 1];
          
          if (selectedTheme) {
            newLines.push(
              '',
              `LOADING ${selectedTheme.toUpperCase()}...`,
              'PLEASE WAIT...',
              ''
            );
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('themeChange', { detail: selectedTheme }));
            }, 1500);
          } else {
            newLines.push('', '?SYNTAX ERROR', '', ']');
          }
        } else if (command.trim() !== '') {
          newLines.push('', '?SYNTAX ERROR', '', ']');
        } else {
          newLines.push(']');
        }
    }
    
    setOutputLines(newLines);
    setCurrentCommand('');
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  };

  const handleWrapperClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <MonitorFrame>
      <Apple2Wrapper onClick={handleWrapperClick}>
        <Screen ref={screenRef}>
          {outputLines.map((line, index) => (
            <OutputLine key={index} delay={index * 0.05}>
              {line}
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
              onBlur={() => {
                setTimeout(() => {
                  if (inputRef.current) {
                    inputRef.current.focus();
                  }
                }, 10);
              }}
              spellCheck="false"
              autoComplete="off"
            />
            <Cursor />
          </CommandLine>
        </Screen>
      </Apple2Wrapper>
    </MonitorFrame>
  );
}; 