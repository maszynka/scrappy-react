// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import multiEntry from 'rollup-plugin-multi-entry'

console.log(process.env.NODE_ENV)

const common = {
  plugins: [
    multiEntry(),
    resolve({
      extensions: [ '.mjs', '.js', '.jsx', '.json' ],
      browser: true,
      main: true
    }),
    babel({
      babelrc: true
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/create-react-class/**',
        'node_modules/fbjs/**',
        'node_modules/object-assign/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/prop-types/**'
      ]
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
  ],
  sourcemap: true
}

const app = {
  input: 'src/index.js',
  output: {
    name: 'App',
    file: 'build/' + process.env.NAME + '.js',
    format: 'iife'
  }
}

const background = {
  input: 'src/background.js',
  output: {
    name: 'Background',
    file: 'build/background.js',
    format: 'iife'
  }
}

export default [
  Object.assign({}, app, common),
  Object.assign({}, background, common)
]
