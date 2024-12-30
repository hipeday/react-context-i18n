import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts', // 入口文件
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs', // CommonJS 格式
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm', // ES Module 格式
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'], // 外部依赖，不打包到库中
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
};