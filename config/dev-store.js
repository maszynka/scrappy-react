// Rollup plugins.
import common from './dev-common'

const store = {
  input: 'src/store/index.js',
  output: {
    name: 'Store',
    file: 'build/store.js',
    format: 'iife'
  }
}

export default Object.assign({}, store, common)
