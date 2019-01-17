import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/bootstrap-v4.css';
import Morse from '../src/morse';

const short = document.querySelector('.code-short-tap');
const long = document.querySelector('.code-long-tap');
const up = document.querySelector('.code-up');
const down = document.querySelector('.code-down');
const left = document.querySelector('.code-left');
const right = document.querySelector('.code-right');

function isPC() {
  const ua = navigator.userAgent;
  const agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let i = 0, len = agents.length; i < len; i++) {
    if (ua.indexOf(agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

function operateMatch(codeArr, elemArr) {
  const morseCode = ['_', '-', 'U', 'D', 'L', 'R'];
  morseCode.forEach((code, index) => {
    if (code === codeArr[index]) {

    }
  })
}

const morse = new Morse({
  el: '.code',
  code: '_-UDLR',
  tapEvent: !isPC(),
  timeout: 3000,
  matching(arr) {
    console.log(arr);
    operateMatch(arr, [short, long, up, down, left, right]);
  },
  matched() {
    console.log('Matched...');
    new Noty({
      text: 'Your input code is right!',
      theme: 'bootstrap-v4',
      timeout: 1000,
    }).show();
  },
  unmatched() {
    console.log('Unmatched...');
    new Noty({
      text: 'Your input code is wrong!',
      theme: 'bootstrap-v4',
      timeout: 1000,
    }).show();
  },
});

window.morse = morse;
