class Router {
  constructor() {
    if (!!Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
    this.routes = {};
    this._bindPopState();
    return this;
  }

  init(path) {
    history.replaceState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  route(path, callback) {
    this.routes[path] = callback || function() {
    };
  }

  go(path) {
    history.pushState({ path: path }, null, path);
    this.routes[path] && this.routes[path]();
  }

  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}

export default Router;
