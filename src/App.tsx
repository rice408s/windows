import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { windows95Theme } from './styles/themes/windows95';
import { dosTheme } from './styles/themes/dos';
import { macintoshTheme } from './styles/themes/macintosh';
import { amigaTheme } from './styles/themes/amiga';
import { atariTheme } from './styles/themes/atari';
import { apple2Theme } from './styles/themes/apple2';
import { DOSWindow } from './components/Elements/DOSWindow/DOSWindow';
import { AmigaWindow } from './components/Elements/AmigaWindow/AmigaWindow';
import { AtariWindow } from './components/Elements/AtariWindow/AtariWindow';
import { Apple2Window } from './components/Elements/Apple2Window/Apple2Window';
import { GlobalStyles } from './styles/GlobalStyles';
import { MacWindow } from './components/Elements/MacWindow/MacWindow';
import { Win95Window } from './components/Elements/Win95Window/Win95Window';
import { MacSimpleText } from './components/Elements/MacSimpleText/MacSimpleText';
import { Win95Notepad } from './components/Elements/Win95Notepad/Win95Notepad';
import { zxSpectrumTheme } from './styles/themes/zxspectrum';
import { msxTheme } from './styles/themes/msx';
import { ZXWindow } from './components/Elements/ZXWindow/ZXWindow';
import { MSXWindow } from './components/Elements/MSXWindow/MSXWindow';
import { gameboyTheme } from './styles/themes/gameboy';
import { nokiaTheme } from './styles/themes/nokia';
import { GameBoyWindow } from './components/Elements/GameBoyWindow/GameBoyWindow';
import { NokiaWindow } from './components/Elements/NokiaWindow/NokiaWindow';
import { c64Theme } from './styles/themes/c64';
import { trs80Theme } from './styles/themes/trs80';
import { bbcMicroTheme } from './styles/themes/bbcmicro';
import { C64Window } from './components/Elements/C64Window/C64Window';
import { TRS80Window } from './components/Elements/TRS80Window/TRS80Window';
import { BBCMicroWindow } from './components/Elements/BBCMicroWindow/BBCMicroWindow';
import { captureScreenshot, downloadScreenshot } from './utils/screenshot';

const themes = {
  windows95: windows95Theme,
  dos: dosTheme,
  macintosh: macintoshTheme,
  amiga: amigaTheme,
  atari: atariTheme,
  apple2: apple2Theme,
  zxspectrum: zxSpectrumTheme,
  msx: msxTheme,
  gameboy: gameboyTheme,
  nokia: nokiaTheme,
  c64: c64Theme,
  trs80: trs80Theme,
  bbcmicro: bbcMicroTheme
};

const ThemeButton = styled.button<{ $active?: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background: ${props => props.$active ? '#000' : '#fff'};
  color: ${props => props.$active ? '#fff' : '#000'};
  border: 2px solid #000;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  z-index: 9999;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ThemeMenu = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background: white;
  border: 2px solid black;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 9999;
`;

const ThemeOption = styled.button<{ $selected?: boolean }>`
  padding: 8px 16px;
  background: ${props => props.$selected ? '#000' : '#fff'};
  color: ${props => props.$selected ? '#fff' : '#000'};
  border: 1px solid #000;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$selected ? '#333' : '#eee'};
  }
`;

const ScreenshotButton = styled.button`
  position: fixed;
  top: 20px;
  right: 140px;
  padding: 8px 16px;
  background: #fff;
  color: #000;
  border: 2px solid #000;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  z-index: 9999;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background: #000;
    color: #fff;
  }
`;

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>('windows95');
  const [isOpen, setIsOpen] = useState(true);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      setCurrentTheme(savedTheme as keyof typeof themes);
    }
  }, []);

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      const newTheme = event.detail as keyof typeof themes;
      if (themes[newTheme]) {
        setCurrentTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  const handleScreenshot = async () => {
    if (!windowRef.current) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${currentTheme}-${timestamp}.png`;

    const dataUrl = await captureScreenshot(windowRef.current);
    if (dataUrl) {
      downloadScreenshot(dataUrl, filename);
    }
  };

  if (!isOpen) {
    return null;
  }

  const themeNames = {
    windows95: 'Windows 95',
    dos: 'MS-DOS',
    macintosh: 'Macintosh',
    amiga: 'Amiga',
    atari: 'Atari ST',
    apple2: 'Apple II',
    zxspectrum: 'ZX Spectrum',
    msx: 'MSX',
    gameboy: 'Game Boy',
    nokia: 'Nokia 1100',
    c64: 'Commodore 64',
    trs80: 'TRS-80',
    bbcmicro: 'BBC Micro'
  };

  const renderWindow = () => {
    switch(currentTheme) {
      case 'dos':
        return <DOSWindow />;
      case 'apple2':
        return <Apple2Window />;
      case 'macintosh':
        return (
          <MacWindow onClose={() => setIsOpen(false)}>
            <MacSimpleText />
          </MacWindow>
        );
      case 'windows95':
        return (
          <Win95Window onClose={() => setIsOpen(false)}>
            <Win95Notepad />
          </Win95Window>
        );
      case 'amiga':
        return (
          <AmigaWindow 
            title="Workbench 2.0 - RetroUI" 
            onClose={() => setIsOpen(false)}
          />
        );
      case 'atari':
        return (
          <AtariWindow 
            onClose={() => setIsOpen(false)}
          />
        );
      case 'zxspectrum':
        return <ZXWindow />;
      case 'msx':
        return <MSXWindow />;
      case 'gameboy':
        return <GameBoyWindow />;
      case 'nokia':
        return <NokiaWindow />;
      case 'c64':
        return <C64Window />;
      case 'trs80':
        return <TRS80Window />;
      case 'bbcmicro':
        return <BBCMicroWindow />;
      default:
        return (
          <Win95Window onClose={() => setIsOpen(false)}>
            <Win95Notepad />
          </Win95Window>
        );
    }
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyles />
      <ScreenshotButton onClick={handleScreenshot}>
        📸 Screenshot
      </ScreenshotButton>
      <ThemeButton 
        onClick={() => setShowThemeMenu(!showThemeMenu)}
        $active={showThemeMenu}
      >
        {themeNames[currentTheme]} ▼
      </ThemeButton>
      {showThemeMenu && (
        <ThemeMenu>
          {Object.entries(themeNames).map(([key, name]) => (
            <ThemeOption
              key={key}
              $selected={currentTheme === key}
              onClick={() => {
                setCurrentTheme(key as keyof typeof themes);
                setShowThemeMenu(false);
              }}
            >
              {name}
            </ThemeOption>
          ))}
        </ThemeMenu>
      )}
      <div ref={windowRef} data-screenshot>
        {renderWindow()}
      </div>
    </ThemeProvider>
  );
};

export default App; 