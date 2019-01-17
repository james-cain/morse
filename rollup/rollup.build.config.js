import { resolve } from 'path';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: resolve(__dirname, '../src/morse.js'),
  output: {
    file: resolve(__dirname, '../dist/index.js'),
    name: 'Morse',
    format: 'umd',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
};
