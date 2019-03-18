// Rollup plugins.
import common from './dev-common'

const background = {
  input: 'src/background.js',
  output: {
    name: 'Background',
    file: 'build/background.js',
    format: 'iife'
  }
}

export default Object.assign({}, common, background)
