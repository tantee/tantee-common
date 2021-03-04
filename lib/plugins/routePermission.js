import Vue from 'vue'

function Install (Vue, options) {

  if (!options.router) {
    throw new Error("You must supply a router instance in the options.");
  }
  const rp = new RouteProtect(opts.router);
  Vue.prototype.$user = rp;
  options.router.beforeEach((to, from, next) => rp.resolve(to, from, next));

  Vue.prototype[property].options = options || {}
}
