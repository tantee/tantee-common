
// Import vue components
import * as components from '@/lib-components/index'
import AsyncComputed from 'vue-async-computed'
import tanteeDialog from 'tantee-common/lib/plugins/dialog'
import tanteeDatetime from 'tantee-common/lib/plugins/datetime'

// install function executed by Vue.use()
const install = function installTanteeCommon(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
  Vue.use(AsyncComputed)
  Vue.use(tanteeDialog)
  Vue.use(tanteeDatetime)
};

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from '@/lib-components/index';