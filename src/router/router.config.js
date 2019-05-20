import Routers from './index';
import ColorConverter from '../pages/color-convert/color-converter';

window.Router = new Routers();
Router.init(location.pathname);
const createFragment = (htmlStr) => {
  const frag = document.createDocumentFragment();
  const temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
};

const main = document.querySelector('main.main');
const wrap = htmlStr => {
  return main.appendChild(createFragment(htmlStr));
};
// HTML
// CSS
// Router.route('/', async () => (await ColorConverter.render(), await ColorConverter.rendefAfter()));
Router.route('/color-converter', async () => {
  wrap(await ColorConverter.render());
  await ColorConverter.renderAfter();
});
// JAVASCRIPT
// IMAGES
