import { keyword2rgb, hex2rgb, hsl2rgb, rgb2hex, rgb2hsl, rgb2keyword } from './conversions';

const debounce = (fn, wait, ...args) => {
  let timeout;
  return function() {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
};

let ColorConvert = {
  render: async () => {
    return `
    <div>
      <h2>输入颜色:</h2>
      <label class="pure-radio">
        <input id="radio-name" type="radio" name="optionsRadios" value="name" checked>name
        <input id="radio-hex" type="radio" name="optionsRadios" value="hex">hex
        <input id="radio-rgb" type="radio" name="optionsRadios" value="rgb">rgb
        <input id="radio-hsl" type="radio" name="optionsRadios" value="hsl">hsl
      </label>
      <input id="color" type="text" value="0, 0, 0">
      <br>
      <div class="pure-g">
        <div class="pure-u-1-2">
          <div id="error"></div>
          <table class="pure-table">
            <tr>
              <td>name</td>
              <td id="name"></td>
            </tr>
            <tr>
              <td>rgb</td>
              <td id="rgb"></td>
            </tr>
            <tr>
              <td>hex</td>
              <td id="hex"></td>
            </tr>
            <tr>
              <td>hsl</td>
              <td id="hsl"></td>
            </tr>
          </table>
        </div>
        <div class="pure-u-1-2">
          <div id="result"></div>
        </div>
      </div>
    </div>
    `;
  },

  renderAfter: async () => {
    document.querySelector('#color').addEventListener(
      'input',
      debounce(function(e) {
        const radioOption = document.querySelector('input[name=optionsRadios]:checked').value;
        const val = this.value;
        const nameDom = document.querySelector('#name');
        const rgbDom = document.querySelector('#rgb');
        const hexDom = document.querySelector('#hex');
        const hslDom = document.querySelector('#hsl');
        const resultDom = document.querySelector('#result');
        switch (radioOption) {
          case 'name':
            nameDom.textContent = val;
            rgbDom.textContent = keyword2rgb(val);
            hexDom.textContent = rgb2hex(rgbDom.textContent.split(','));
            hslDom.textContent = rgb2hsl(rgbDom.textContent.split(','));
            resultDom.setAttribute('style', `background:rgb(${rgbDom.textContent});height:100%`);
            break;
          case 'hex':
            hexDom.value = val;
            rgbDom.value = hex2rgb(val);
            nameDom.value = rgb2keyword(rgbDom.textContent);
            hslDom.value = rgb2hsl(rgbDom.textContent);
            break;
          case 'rgb':
            rgbDom.value = val;
            nameDom.value = rgb2keyword(val);
            hexDom.value = rgb2hex(val);
            hslDom.value = rgb2hsl(val);
            break;
          case 'hsl':
            hslDom.value = val;
            rgbDom.value = hsl2rgb(val);
            nameDom.value = rgb2keyword(rgbDom.textContent);
            hexDom.value = rgb2hex(rgbDom.textContent);
            break;
        }
      }, 1000)
    );
    document.querySelector('#color').addEventListener('change', e => {});
    document.querySelector('#color').addEventListener('keydown', e => {});
  }
};

export default ColorConvert;
