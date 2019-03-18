// Rollup plugins.
import common from './dev-common'

const app = {
  input: 'src/index.js',
  output: {
    name: 'App',
    file: 'build/app.js',
    format: 'iife'
  }
}

export default Object.assign({}, app, common)
