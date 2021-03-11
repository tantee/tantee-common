import Vue from 'vue'
import tanteePermission from 'tantee-common/lib/plugins/permission'
import tanteePrint from 'tantee-common/lib/plugins/print'
import installLocalComponent from 'tantee-common/lib/framework/localComponent'

Vue.use(tanteePermission)
Vue.use(tanteePrint)
installLocalComponent()