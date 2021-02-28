import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default function installLocalComponent(folder='./components') {
  const requireComponent = require.context(
    // Look for files in the current directory
    folder,
    // Do not look in subdirectories
    true,
    // Only include "_base-" prefixed .vue files
    /v[A-Z]\w+\.(vue)$/
  )
  requireComponent.keys().forEach(fileName => {
    // Get component config
    const componentConfig = requireComponent(fileName)
    // Get PascalCase name of component
    const componentName = upperFirst(

      camelCase(
        // Strip the leading `./` and extension from the filename
        fileName.replace(/^\.\/(.+\/)*(.+)\.\w+$/, '$2')
      )
    )
    // Register component globally
    Vue.component(componentName,componentConfig.default || componentConfig)
  })
}