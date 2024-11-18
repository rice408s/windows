import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bootSound = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

const GameBoyCase = styled.div`
  width: 400px;
  height: 600px;
  background: #c0c0c0;
  border-radius: 0;
  padding: 40px 20px;
  position: relative;
  box-shadow: 
    -5px -5px 10px rgba(0,0,0,0.2) inset,
    5px 5px 10px rgba(255,255,255,0.2) inset;

  &::before {
    content: 'GAME BOY';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Press Start 2P", monospace;
    font-size: 16px;
    color: #666;
    letter-spacing: 2px;
  }

  &::after {
    content: 'Nintendo®';
    position: absolute;
    top: 35px;
    left: 50%;
    transform: translateX(-50%);
    font-family: "Press Start 2P", monospace;
    font-size: 8px;
    color: #888;
  }
`;

const Screen = styled.div`
  width: 320px;
  height: 288px;
  background: #8bac0f;
  margin: 0 auto;
  border-radius: 0;
  border: 20px solid #444;
  position: relative;
  overflow: hidden;

  &::before {
    content: 'POWER';
    position: absolute;
    top: -18px;
    left: 8px;
    font-size: 8px;
    color: #666;
  }

  &::after {
    content: '●';
    position: absolute;
    top: -15px;
    left: 40px;
    color: #f00;
    font-size: 8px;
    animation: ${bootSound} 1s infinite;
  }
`;

const Display = styled.div`
  padding: 8px;
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #0f380f;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: url("data:image/svg+xml,%3Csvg width='4' height='4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h2v2H0zM2 2h2v2H2z' fill='%230f380f' fill-opacity='0.1'/%3E%3C/svg%3E");
`;

const TextArea = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: #0f380f;
  font-family: "Press Start 2P", monospace;
  font-size: 12px;
  line-height: 1.5;
  resize: none;
  outline: none;
  padding: 0;
  margin-bottom: 8px;

  &::selection {
    background: #306230;
    color: #8bac0f;
  }
`;

const MenuBar = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  border-top: 2px solid #0f380f;
  padding-top: 4px;
  background: #9bbc0f;
`;

const MenuButton = styled.div`
  font-size: 10px;
  cursor: pointer;
  color: #0f380f;
  padding: 2px 4px;
  background: #8bac0f;
  border: 1px solid #0f380f;

  &:active {
    background: #306230;
    color: #8bac0f;
  }
`;

const Controls = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  position: relative;

  &::before {
    content: 'SELECT';
    position: absolute;
    bottom: -35px;
    left: 35%;
    font-family: "Press Start 2P", monospace;
    font-size: 8px;
    color: #666;
    transform: rotate(-25deg);
  }

  &::after {
    content: 'START';
    position: absolute;
    bottom: -35px;
    left: 55%;
    font-family: "Press Start 2P", monospace;
    font-size: 8px;
    color: #666;
    transform: rotate(-25deg);
  }
`;

const DPad = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  margin-left: 20px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: #444;
    clip-path: polygon(33% 0%, 66% 0%, 66% 33%, 100% 33%, 100% 66%, 66% 66%, 66% 100%, 33% 100%, 33% 66%, 0% 66%, 0% 33%, 33% 33%);
  }

  &::after {
    content: '✛';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #222;
    font-size: 24px;
  }
`;

const ABButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-right: 20px;
  transform: rotate(-25deg);
  position: relative;

  &::before {
    content: 'B';
    position: absolute;
    top: -15px;
    left: 15px;
    font-family: "Press Start 2P", monospace;
    font-size: 8px;
    color: #666;
  }

  &::after {
    content: 'A';
    position: absolute;
    top: -15px;
    right: 15px;
    font-family: "Press Start 2P", monospace;
    font-size: 8px;
    color: #666;
  }
`;

const Button = styled.div`
  width: 40px;
  height: 40px;
  background: #a00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #800;
  font-family: "Press Start 2P", monospace;
  font-size: 16px;
  box-shadow: 
    -2px -2px 5px rgba(0,0,0,0.3) inset,
    2px 2px 5px rgba(255,255,255,0.1) inset;

  &:active {
    transform: scale(0.95);
    box-shadow: 
      2px 2px 5px rgba(0,0,0,0.3) inset,
      -2px -2px 5px rgba(255,255,255,0.1) inset;
  }
`;

const StartSelect = styled.div`
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
`;

const SmallButton = styled.div`
  width: 40px;
  height: 12px;
  background: #444;
  border-radius: 6px;
  transform: rotate(-25deg);
  cursor: pointer;

  &:active {
    background: #333;
  }
`;

export const GameBoyWindow: React.FC = () => {
  const [text, setText] = useState('');
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    const bootSequence = 'Nintendo\nGAMEBOY\n\nRetroUI v1.0';

    setText(bootSequence);
    
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
    <GameBoyCase>
      <Screen>
        <Display>
          <TextArea 
            value={text}
            onChange={handleTextChange}
            readOnly={isBooting}
            spellCheck={false}
          />
          <MenuBar>
            <MenuButton>A:SEL</MenuButton>
            <MenuButton onClick={handleExit}>B:EXIT</MenuButton>
          </MenuBar>
        </Display>
      </Screen>
      <Controls>
        <DPad />
        <ABButtons>
          <Button>B</Button>
          <Button>A</Button>
        </ABButtons>
      </Controls>
      <StartSelect>
        <SmallButton />
        <SmallButton />
      </StartSelect>
    </GameBoyCase>
  );
}; 