import { resolve } from 'path';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: resolve(__dirname, '../src/morse.js'),
  output: {
    file: resolve(__dirname, '../dist/morse-1.0.0.js'),
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
