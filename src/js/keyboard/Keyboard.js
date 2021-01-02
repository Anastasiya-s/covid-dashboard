import {
  rusKeyboard,
  engKeyboard,
  rusKeyboardShiftOn,
  engKeyboardShiftOn,
} from './keyboardSets';

export default class Keyboard {
  constructor() {
    this.isOpen = false;
    this.lang = 'ru';
    this.isCapsOn = false;
    this.isShiftPressed = false;
    // this.isCtrlPressed = false;
    this.isSoundOn = false;
    this.keyboardSet = rusKeyboard;
  }

  renderKeyboard() {
    const keyboardContainer = document.querySelector('.keyboard-container');
    return this.keyboardSet.map((row) => {
      const el = document.createElement('div');
      Object.entries(row).forEach((cell) => {
        let elem;
        if (cell[0] === 'Sound') {
          elem = document.createElement('img');
          elem.src = this.isSoundOn ? './assets/icons/sound.svg' : './assets/icons/mute.svg';
          elem.alt = 'Sound';
          elem.dataset.keyCode = 'Sound';
          elem.classList.add('cell');
          elem.classList.add('Sound');
          el.append(elem);
        } else {
          elem = document.createElement('span');
          elem.insertAdjacentHTML('afterbegin', cell[1]);
          [elem.dataset.keyCode] = cell;
          if (cell[0] === 'CapsLock' && this.isCapsOn) elem.classList.add('active');
          if (cell[0] === 'ShiftLeft' && this.isShiftPressed) elem.classList.add('active');
          if (cell[0] === 'ShiftRight' && this.isShiftPressed) elem.classList.add('active');
          elem.classList.add('cell');
          elem.classList.add(cell[0]);
          el.append(elem);
        }
        return elem;
      });
      el.classList.add('row');
      return keyboardContainer.append(el);
    });
  }

  setLang() {
    const lang = localStorage.getItem('lang');
    if (!lang) {
      localStorage.setItem('lang', 'ru');
      this.keyboardSet = rusKeyboard;
    }
    if (lang === 'ru') {
      this.keyboardSet = rusKeyboard;
    }
    if (lang === 'eng') {
      this.keyboardSet = engKeyboard;
    }
    this.lang = lang;
    return this.keyboardSet;
  }

  setSound() {
    const sound = localStorage.getItem('sound');
    if (!sound) {
      localStorage.setItem('sound', 'off');
      this.isSoundOn = false;
    }
    if (sound === 'ru') {
      localStorage.setItem('sound', 'off');
      this.isSoundOn = false;
    }
    if (sound === 'eng') {
      localStorage.setItem('sound', 'on');
      this.isSoundOn = true;
    }
  }

  changeLanguage() {
    const keyboardContainer = document.querySelector('.keyboard-container');
    if (this.lang === 'ru') {
      this.lang = 'eng';
      localStorage.setItem('lang', 'eng');
      this.keyboardSet = engKeyboard;
    } else if (this.lang === 'eng') {
      this.lang = 'ru';
      localStorage.setItem('lang', 'ru');
      this.keyboardSet = rusKeyboard;
    }
    while (keyboardContainer.hasChildNodes()) {
      keyboardContainer.removeChild(keyboardContainer.lastChild);
    }
    this.renderKeyboard(this.keyboardSet);
  }

  changeKeyboardLayout() {
    const keyboardContainer = document.querySelector('.keyboard-container');
    if (this.isShiftPressed) {
      this.keyboardSet = this.lang === 'ru' ? rusKeyboardShiftOn : engKeyboardShiftOn;
    } else {
      this.keyboardSet = this.lang === 'ru' ? rusKeyboard : engKeyboard;
    }
    while (keyboardContainer.hasChildNodes()) {
      keyboardContainer.removeChild(keyboardContainer.lastChild);
    }
    this.renderKeyboard(this.keyboardSet);
  }

  init() {
    this.isOpen = true;
    this.setLang();
    this.setSound();
    this.renderKeyboard(this.keyboardSet);
  }
}
