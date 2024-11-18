import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
`;

const scanlines = keyframes`
  from { background-position: 0 0; }
  to { background-position: 0 -512px; }
`;

const DOSWrapper = styled.div`
  background: #000000;
  color: #FFFFFF;
  font-family: "Perfect DOS VGA 437", "Courier New", monospace;
  padding: 0;
  width: 720px;
  height: 400px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  white-space: pre-wrap;
  cursor: text;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      transparent 50%,
      rgba(0, 0, 0, 0.05) 50%
    );
    background-size: 100% 2px;
    animation: ${scanlines} 1s linear infinite;
    pointer-events: none;
    opacity: 0.1;
  }
`;

const Screen = styled.div`
  height: 100%;
  padding: 8px;
  overflow-y: auto;
  position: relative;
  
  /* 完全隐藏滚动条 */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  height: 16px;
  line-height: 16px;
  position: relative;
  white-space: pre;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: #FFFFFF;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: calc(100% - 12px);
  padding: 0;
  margin: 0;
  caret-color: transparent;
  height: 16px;
  line-height: 16px;
  position: relative;
  left: -2px;
`;

const Prompt = styled.span`
  color: #FFFFFF;
  display: inline-block;
  width: 12px;
`;

const Cursor = styled.span<{ $offset: number }>`
  display: inline-block;
  width: 8px;
  height: 2px;
  background: #FFFFFF;
  animation: ${blink} 1s step-end infinite;
  position: absolute;
  left: ${props => 12 + props.$offset * 8}px;
  bottom: 2px;
`;

const OutputLine = styled.div`
  line-height: 16px;
  min-height: 16px;
  white-space: pre;
`;

interface DOSWindowProps {
  children?: React.ReactNode;
}

export const DOSWindow: React.FC<DOSWindowProps> = () => {
  const [commandHistory, setCommandHistory] = useState<string[]>([
    'Microsoft(R) MS-DOS(R) Version 6.22',
    '(C)Copyright Microsoft Corp 1981-1994.',
    '',
    'C:\\>cd RETRO-UI',
    'C:\\RETRO-UI>'
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [cursorOffset, setCursorOffset] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 自动滚动到底部
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const handleCommand = async (command: string) => {
    const newHistory = [...commandHistory];
    newHistory.pop(); // 移除最后的提示符
    newHistory.push(`C:\\RETRO-UI>${command}`);

    // 模拟命令执行延迟
    const addOutputWithDelay = (lines: string[], baseDelay: number = 0) => {
      lines.forEach((line, index) => {
        setTimeout(() => {
          setCommandHistory(prev => [...prev, line]);
        }, baseDelay + index * 50);
      });
    };

    switch (command.toLowerCase()) {
      case 'help':
        addOutputWithDelay([
          'Available commands:',
          ' HELP    - Show this help',
          ' CLS     - Clear screen',
          ' DIR     - List files',
          ' THEME   - Change theme',
          ' VER     - Show version',
          ' EXIT    - Exit to Windows',
          '',
          'C:\\RETRO-UI>'
        ]);
        break;
      case 'cls':
        setCommandHistory(['C:\\RETRO-UI>']);
        break;
      case 'ver':
        addOutputWithDelay([
          'RetroUI Generator [Version 1.0]',
          '(C) 2024 RetroUI Corp. All rights reserved.',
          '',
          'C:\\RETRO-UI>'
        ]);
        break;
      case 'dir':
        addOutputWithDelay([
          ' Volume in drive C is RETRO-UI',
          ' Volume Serial Number is 1234-5678',
          '',
          ' Directory of C:\\RETRO-UI',
          '',
          'BUTTON   COM    1,024  03-14-24  12:00p',
          'INPUT    COM    2,048  03-14-24  12:00p',
          'THEME    EXE    4,096  03-14-24  12:00p',
          'README   TXT      256  03-14-24  12:00p',
          '',
          '     4 file(s)     7,424 bytes',
          '     0 dir(s)  512,000 bytes free',
          '',
          'C:\\RETRO-UI>'
        ]);
        break;
      case 'exit':
        addOutputWithDelay([
          'Exiting DOS...',
          'Please wait...'
        ]);
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('themeChange', { detail: 'windows95' }));
        }, 1500);
        break;
      case 'theme':
        addOutputWithDelay([
          'Available themes:',
          ' 1. DOS (current)',
          ' 2. Windows 95',
          ' 3. Macintosh',
          ' 4. Amiga',
          ' 5. Atari ST',
          ' 6. Apple II',
          '',
          'Use THEME <number> to change theme',
          'Example: THEME 2',
          '',
          'C:\\RETRO-UI>'
        ]);
        break;
      default:
        if (command.toLowerCase().startsWith('theme ')) {
          const themeNumber = command.split(' ')[1];
          const themes = ['dos', 'windows95', 'macintosh', 'amiga', 'atari', 'apple2'];
          const selectedTheme = themes[parseInt(themeNumber) - 1];
          
          if (selectedTheme) {
            addOutputWithDelay([
              `Switching to ${selectedTheme.toUpperCase()} theme...`,
              'Please wait...'
            ]);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('themeChange', { detail: selectedTheme }));
            }, 1500);
          } else {
            addOutputWithDelay([
              'Invalid theme number. Use THEME to see available themes.',
              '',
              'C:\\RETRO-UI>'
            ]);
          }
        } else if (command.trim() === '') {
          newHistory.push('C:\\RETRO-UI>');
          setCommandHistory(newHistory);
        } else {
          addOutputWithDelay([
            `Bad command or file name: ${command}`,
            '',
            'C:\\RETRO-UI>'
          ]);
        }
    }
    
    setCurrentCommand('');
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
    <DOSWrapper onClick={handleWrapperClick}>
      <Screen ref={wrapperRef}>
        {commandHistory.map((line, index) => (
          <OutputLine key={index}>
            {line}
          </OutputLine>
        ))}
        <CommandLine>
          <Prompt>&gt;</Prompt>
          <Input
            ref={inputRef}
            value={currentCommand}
            onChange={(e) => {
              setCurrentCommand(e.target.value);
              if (inputRef.current) {
                setCursorOffset(inputRef.current.selectionStart || 0);
              }
            }}
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
          <Cursor $offset={cursorOffset} />
        </CommandLine>
      </Screen>
    </DOSWrapper>
  );
}; 