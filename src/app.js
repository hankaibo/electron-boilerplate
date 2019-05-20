import Routers from './router';
import './router/router.config.js';
import './style/normalize.css';
import './style/main.css';
import './style/pure.css';

// Small helpers you might want to keep
import './helpers/context_menu.js';
import './helpers/external_links.js';

window.Router = new Routers();
const nav = document.querySelector('nav.navigation');

nav.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    Router.go(e.target.getAttribute('href'));
  }
});
