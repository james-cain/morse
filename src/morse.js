class Morse {
  constructor(option = {}) {
    this.options = Object.assign({
      el: 'body',
      code: '___', // include -_UPLR
      duration: 500,
      distance: 100,
      timeout: 2000,
      tapEvent: false,
      matching: () => {},
      matched: () => {},
      unmatched: () => {},
      onTimeout: () => {},
    }, option);

    this.el = document.querySelector(this.el);
    this.timer = null;

    this.tapStartEvent = this.options.tapEvent ? 'touchstart' : 'mousedown';
    this.tapEndEvent = this.options.tapEvent ? 'touchend' : 'mounseup';

    this.tapStart = 0;
    this.tapTime = 0;
    this.tapStartX = 0;
    this.tapStartY = 0;
    this.tapEndX = 0;
    this.tapEndY = 0;

    this.morseCode = [];
    this.isTimeout = false;

    this._addListener();
  }

  _addListener() {
    this.el.addEventListener(this.tapStartEvent, this._registTapStartEvent);
    this.el.addEventListener(this.tapEndEvent, this._registTapEndEvent);
  }

  _registTapStartEvent(e) {
    console.log('start:');
    console.log(e);
    this._stopTimer();
    this.tapStart = new Date().getTime();
  }

  _registTapEndEvent(e) {
    console.log('end:');
    console.log(e);
    this.tapTime = new Date().getTime() - this.tapStart;
    if (!this.isTimeout) {
      // simple mode: judge longTap and shortTap
      this.tapTime < this.options.duration ? this.morseCode.push('_') : this.morseCode.push('-');
      this.options.matching(this.morseCode);
      this._matchCode(this.morseCode);
      this._startTimer();
    } else {
      this._reset();
    }
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
    } else {
      this.options.unmatched();
    }
    this._reset();
  }

  _reset() {
    this.morseCode = [];
    this.isTimeout = false;
    this.tapStart = 0;
    this.tapTime = 0;
    this.tapStartX = 0;
    this.tapStartY = 0;
    this.tapEndX = 0;
    this.tapEndY = 0;
  }

  removeListener() {
    this.el.removeEventListener(this.tapStartEvent, this._registTapStartEvent);
    this.el.removeEventListener(this.tapEndEvent, this._registTapEndEvent);
  }
}

export default Morse;
