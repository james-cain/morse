class Morse {
  constructor(option = {}) {
    this.options = Object.assign({
      el: 'body',
      code: '___',
      duration: 400,
      timeout: 2000,
      tapEvent: false,
      matching: () => {},
      matched: () => {},
      unmatched: () => {},
      onTimeout: () => {},
    }, option);

    this.el = document.querySelector(this.options.el);
    this.timer = null;

    this.tapStartEvent = this.options.tapEvent ? 'touchstart' : 'mousedown';
    this.tapEndEvent = this.options.tapEvent ? 'touchend' : 'mouseup';

    this.tapStart = 0;
    this.tapTime = 0;
    this.tapStartX = 0;
    this.tapStartY = 0;
    this.distanceX = 0;
    this.distanceY = 0;
    this.slideDistance = 0;

    this.morseCode = [];
    this.isTimeout = false;

    this._addListener();
  }

  _addListener() {
    this._registTapStartEvent = (e) => {
      this._registTapStartFunc(e);
    }
    this._registTapEndEvent = (e) => {
      this._registTapEndFunc(e);
    }
    this.el.addEventListener(this.tapStartEvent, this._registTapStartEvent);
    this.el.addEventListener(this.tapEndEvent, this._registTapEndEvent);
  }

  _startTimer() {
    this.timer = setTimeout(() => {
      this.isTimeout = true;
      this._reset();
      this.options.onTimeout();
    }, this.options.timeout);
  }

  _stopTimer() {
    clearTimeout(this.timer);
  }

  _matchCode(morseCode) {
    const code = this.options.code;
    const codeStr = morseCode.join('');
    if (codeStr === code) {
      this.options.matched();
      this._reset();
    } else if (codeStr.length === code.length && codeStr !== code) {
      this.options.unmatched();
      this._reset();
    }
  }

  _reset() {
    this.morseCode = [];
    this.isTimeout = false;
    this.tapStart = 0;
    this.tapTime = 0;
    this.tapStartX = 0;
    this.tapStartY = 0;
    this.distanceX = 0;
    this.distanceY = 0;
    this.slideDistance = 0;
  }

  _registTapStartFunc(e) {
    this._stopTimer();
    this.tapStart = new Date().getTime();
    this.tapStartX = e.x;
    this.tapStartY = e.y;
  }

  _registTapEndFunc(e) {
    this.tapTime = (new Date().getTime()) - this.tapStart;
    this.distanceX = e.x - this.tapStartX;
    this.distanceY = e.y - this.tapStartY;
    if (!this.isTimeout) {
      this._transformCode();
      this.options.matching(this.morseCode);
      this._matchCode(this.morseCode);
      this._startTimer();
    } else {
      this._reset();
    }
  }

  _transformCode() {
    const distanceXAbs = Math.abs(this.distanceX);
    const distanceYAbs = Math.abs(this.distanceY);
    if (distanceXAbs > 10 || distanceYAbs > 10) {
      if (distanceXAbs >= distanceYAbs) {
        this.distanceX > 0 ? this.morseCode.push('R') : this.morseCode.push('L');
      } else {
        this.distanceY > 0 ? this.morseCode.push('D') : this.morseCode.push('U');
      }
    } else {
      this.tapTime < this.options.duration ? this.morseCode.push('_') : this.morseCode.push('-');
    }
  }

  removeListener() {
    this.el.removeEventListener(this.tapStartEvent, this._registTapStartEvent);
    this.el.removeEventListener(this.tapEndEvent, this._registTapEndEvent);
  }
}

export default Morse;
