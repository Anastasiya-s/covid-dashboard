export const addSymbol = (keyCode, keyboard, textArea) => {
  const ta = textArea;
  const keyboardRow = keyboard.keyboardSet.filter((item) => Object.prototype.hasOwnProperty.call(item, `${keyCode}`));
  let symbol = keyboard.isCapsOn ? keyboardRow[0][keyCode].toUpperCase() || '' : keyboardRow[0][keyCode] || '';
  if (keyboard.isCapsOn && keyboard.isShiftPressed) symbol = symbol.toLowerCase();
  ta.value += symbol;
  ta.innerHTML = textArea.value;
};

export const removeSymbol = (textArea) => {
  const ta = textArea;

  ta.value = textArea.value.slice(0, -1);
  ta.innerHTML = textArea.value;
};

export const handleSpecialKeys = (keyCode, keyboard) => {
  const textArea = document.querySelector('.textarea');
  const buttonCaps = document.querySelector('.CapsLock');
  const buttonSound = document.querySelector('.Sound');
  const buttonLeft = document.querySelector('.ShiftLeft');
  const buttonRight = document.querySelector('.ShiftRight');
  const changeValue = (param) => !param;
  switch (keyCode) {
    case 'ChangeLang':
      keyboard.changeLanguage();
      break;
    case 'Sound':
      changeValue(keyboard.isSoundOn);
      // keyboard.isSoundOn = !keyboard.isSoundOn;
      buttonSound.src = keyboard.isSoundOn ? './assets/icons/sound.svg' : './assets/icons/mute.svg';
      break;
    case 'Space':
      textArea.value += ' ';
      textArea.innerHTML = textArea.value;
      break;
    case 'Enter':
      textArea.value += '\n';
      textArea.innerHTML = textArea.value;
      break;
    case 'AltRight':
    case 'AltLeft':
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      buttonLeft.classList.toggle('active');
      buttonRight.classList.toggle('active');
      changeValue(keyboard.isShiftPressed);

      // keyboard.isShiftPressed = !keyboard.isShiftPressed;
      keyboard.changeKeyboardLayout();
      break;
    case 'CapsLock':
      changeValue(keyboard.isCapsOn);

      // keyboard.isCapsOn = !keyboard.isCapsOn;
      buttonCaps.classList.toggle('active');
      break;
    case 'Backspace':
      removeSymbol(textArea);
      break;
    default:
      break;
  }
};

export const audio = new Audio();
