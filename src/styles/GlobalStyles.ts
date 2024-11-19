import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  /* 基础字体 */
  @font-face {
    font-family: 'MS Sans Serif';
    src: url('/fonts/ms-sans-serif.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Perfect DOS VGA 437';
    src: url('/fonts/PerfectDOSVGA437.woff2') format('woff2');
    font-display: swap;
  }

  /* 复古计算机字体 */
  @font-face {
    font-family: 'C64 Pro';
    src: url('/fonts/C64_Pro.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'TRS-80';
    src: url('/fonts/TRS-80.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'BBC Micro';
    src: url('/fonts/BBCMicro.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'ZX Spectrum';
    src: url('/fonts/ZXSpectrum.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'MSX Screen';
    src: url('/fonts/MSXScreen.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Chicago';
    src: url('/fonts/ChicagoFLF.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Topaz';
    src: url('/fonts/TopazPlus.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Apple II';
    src: url('/fonts/PrintChar21.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Atari ST';
    src: url('/fonts/AtariST8x16SystemFont.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Press Start 2P';
    src: url('/fonts/PressStart2P.woff2') format('woff2');
    font-display: swap;
  }

  @font-face {
    font-family: 'Nokia Cellphone FC';
    src: url('/fonts/nokiafc22.woff2') format('woff2');
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: ${props => {
      switch(props.theme.name) {
        case 'dos':
          return '"Perfect DOS VGA 437", monospace';
        case 'windows95':
          return '"MS Sans Serif", sans-serif';
        case 'macintosh':
          return '"Chicago", monospace';
        case 'amiga':
          return '"Topaz", monospace';
        case 'atari':
          return '"Atari ST", monospace';
        case 'apple2':
          return '"Apple II", monospace';
        case 'zxspectrum':
          return '"ZX Spectrum", monospace';
        case 'msx':
          return '"MSX Screen", monospace';
        case 'c64':
          return '"C64 Pro", monospace';
        case 'trs80':
          return '"TRS-80", monospace';
        case 'bbcmicro':
          return '"BBC Micro", monospace';
        case 'gameboy':
          return '"Press Start 2P", monospace';
        case 'nokia':
          return '"Nokia Cellphone FC", monospace';
        default:
          return 'system-ui, sans-serif';
      }
    }};
    font-size: ${props => {
      switch(props.theme.name) {
        case 'dos':
          return '18px';
        case 'windows95':
          return '16px';
        case 'macintosh':
          return '16px';
        case 'amiga':
          return '16px';
        case 'atari':
          return '16px';
        case 'apple2':
          return '18px';
        case 'zxspectrum':
          return '18px';
        case 'msx':
          return '18px';
        case 'c64':
          return '18px';
        case 'trs80':
          return '18px';
        case 'bbcmicro':
          return '18px';
        case 'gameboy':
          return '14px';
        case 'nokia':
          return '18px';
        default:
          return '16px';
      }
    }};
    line-height: 1.5;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  body {
    background-color: ${props => {
      switch(props.theme.name) {
        case 'dos':
          return '#000000';
        case 'windows95':
          return '#008080';
        case 'macintosh':
          return '#666666';
        case 'amiga':
          return '#2266AA';
        case 'atari':
          return '#000088';
        case 'apple2':
          return '#000000';
        case 'zxspectrum':
          return '#000000';
        case 'msx':
          return '#000000';
        case 'c64':
          return '#4040E0';
        case 'trs80':
          return '#000000';
        case 'bbcmicro':
          return '#000000';
        case 'gameboy':
          return '#8bac0f';
        case 'nokia':
          return '#32373a';
        default:
          return '#008080';
      }
    }};
  }

  #root {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
  }
`; 