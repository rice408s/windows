import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const phoneStartup = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
`;

const NokiaCase = styled.div`
  width: 280px;
  height: 480px;
  background: #32373a;
  border-radius: 0;
  padding: 16px 12px;
  position: relative;
  box-shadow: 
    -5px -5px 15px rgba(0,0,0,0.3) inset,
    5px 5px 15px rgba(255,255,255,0.1) inset;
`;

const Screen = styled.div`
  width: 100%;
  height: 180px;
  background: #000000;
  margin: 0 auto;
  border: 6px solid #222;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  animation: ${phoneStartup} 1s ease-out;
`;

const Display = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Content = styled.textarea`
  flex: 1;
  color: #84c5cc;
  font-family: "Nokia Cellphone FC", monospace;
  font-size: 16px;
  line-height: 1.2;
  padding: 8px;
  background: transparent;
  border: none;
  resize: none;
  outline: none;
  overflow: hidden;
  white-space: pre;
  width: 100%;

  &::selection {
    background: #84c5cc;
    color: #000000;
  }
`;

const MenuBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  background: #000000;
  border-top: 1px solid #84c5cc;
`;

const MenuButton = styled.div`
  color: #84c5cc;
  font-size: 12px;
  cursor: pointer;
`;

const NavKey = styled.div`
  width: 70px;
  height: 70px;
  background: #222;
  border-radius: 50%;
  margin: 16px auto;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: #444;
    border-radius: 50%;
  }

  &::after {
    content: '▲\\A◀ ▶\\A▼';
    white-space: pre;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #666;
    font-size: 10px;
    text-align: center;
  }
`;

const Keypad = styled.div`
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 8px;
`;

const Key = styled.div`
  height: 35px;
  background: #222;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Nokia Cellphone FC", monospace;
  font-size: 18px;
  box-shadow: 
    -2px -2px 5px rgba(0,0,0,0.3) inset,
    2px 2px 5px rgba(255,255,255,0.1) inset;
  cursor: pointer;
  user-select: none;

  &:active {
    transform: scale(0.95);
  }
`;

const KeyText = styled.div`
  font-size: 6px;
  color: #666;
  margin-top: 1px;
`;

export const NokiaWindow: React.FC = () => {
  const [text, setText] = useState('');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootSequence = [
      'RetroUI Generator v1.0'
    ].join('\n');

    setText(bootSequence);
    
    // 启动动画完成后允许编辑
    setTimeout(() => {
      setIsBooting(false);
    }, 2000);
  }, []);

  const handleExit = () => {
    window.dispatchEvent(new CustomEvent('themeChange', { detail: 'windows95' }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isBooting) {
      setText(e.target.value);
    }
  };

  return (
    <NokiaCase>
      <Screen>
        <Display>
          <Content 
            value={text}
            onChange={handleTextChange}
            readOnly={isBooting}
            spellCheck={false}
          />
          <MenuBar>
            <MenuButton>Menu</MenuButton>
            <MenuButton onClick={handleExit}>Exit</MenuButton>
          </MenuBar>
        </Display>
      </Screen>
      <NavKey />
      <Keypad>
        {[
          { key: '1', text: '' },
          { key: '2', text: 'ABC' },
          { key: '3', text: 'DEF' },
          { key: '4', text: 'GHI' },
          { key: '5', text: 'JKL' },
          { key: '6', text: 'MNO' },
          { key: '7', text: 'PQRS' },
          { key: '8', text: 'TUV' },
          { key: '9', text: 'WXYZ' },
          { key: '*', text: 'MODE' },
          { key: '0', text: 'SPACE' },
          { key: '#', text: 'SYM' }
        ].map(({ key, text }) => (
          <Key 
            key={key}
            onClick={() => {
              if (!isBooting) {
                setText(prev => prev + key);
              }
            }}
          >
            {key}
            <KeyText>{text}</KeyText>
          </Key>
        ))}
      </Keypad>
    </NokiaCase>
  );
}; 