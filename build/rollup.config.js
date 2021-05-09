// rollup.config.js
import fs from 'fs';
import path from 'path';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import vuetify from 'rollup-plugin-vuetify';
import minimist from 'minimist';

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
  input: 'src/entry.js',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`,
          },
          {
            find: '#',
            replacement: `${path.resolve(projectRoot, 'lib')}`,
          }
        ],
        customResolver: resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        }),
      }),
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production')
    },
    replaceLocalImport: {
      'import api from \'tantee-common/lib/api\'' : 'import api from \'#/api\'',
      'import apiCRUD from \'tantee-common/mixins/apiCRUD\'' : 'import apiCRUD from \'#/mixins/apiCRUD\'',
      'import apiModel from \'tantee-common/mixins/apiModel\'' : 'import apiModel from \'#/mixins/apiModel\'',
      'import apiItem from \'tantee-common/mixins/apiItem\'' : 'import apiItem from \'#/mixins/apiItem\'',
      'import subForm from \'tantee-common/mixins/subForm\'' : 'import apiItem from \'#/mixins/subForm\'',
      delimiters: ['', '']
    },
    vue: {
      css: true,
      template: {
        isProduction: true,
      },
    },
    postVue: [
      vuetify(),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  'vuetify/lib',
  'vue-cropperjs',
  'vue-codemirror',
  'ttl-localstorage',
  'axios',
  'lodash',
  'moment',
  'qs',
  'vuex',
  'papaparse',
  'fuse.js',
  'file-saver',
  'cropperjs/dist/cropper.css',
  'exif-rotate-js/lib',
  'signature_pad',
  'vue-async-computed',
  'vue-disable-autocomplete',
  '@zxing/library',
  /codemirror.*/,
  '@/store',
  /@\/modules\/.*/,
  'tantee-common/lib/plugins/dialog'
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    input: 'src/entry.esm.js',
    external,
    output: {
      file: 'dist/tantee-common.esm.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      replace(baseConfig.plugins.replaceLocalImport),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: esbrowserslist,
            },
          ],
        ],
      }),
      commonjs(),
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/tantee-common.ssr.js',
      format: 'cjs',
      name: 'TanteeCommon',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      replace(baseConfig.plugins.replaceLocalImport),
      ...baseConfig.plugins.preVue,
      vue({
        ...baseConfig.plugins.vue,
        template: {
          ...baseConfig.plugins.vue.template,
          optimizeSSR: true,
        },
      }),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      commonjs(),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/tantee-common.min.js',
      format: 'iife',
      name: 'TanteeCommon',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      replace(baseConfig.plugins.replaceLocalImport),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      commonjs(),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
