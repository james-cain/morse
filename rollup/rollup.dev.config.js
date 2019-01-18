import { resolve } from 'path';
import rollupResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
  input: resolve(__dirname, '../docs/index.js'),
  output: {
    file: resolve(__dirname, '../docs/app.js'),
    name: 'Morse',
    format: 'umd',
  },
  plugins: [
    rollupResolve(),
    commonjs(),
    postcss(),
    babel({
      exclude: 'node_modules/**',
    }),
    serve(resolve(__dirname, '../docs')),
    livereload(),
  ],
};
