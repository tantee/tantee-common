#!/usr/bin/env node

var _ = require('lodash');

const fs = require('fs');
const path = require('path');
const os = require("os");

const vuedoc = require('@vuedoc/md')

const files = {};

const base = './src/lib-components'
const regularExpression = /v[A-Z]\w+\.(vue)$/

const outputFilename = './src/lib-components/index.js'

function readDirectory(directory) {
  fs.readdirSync(directory).forEach((file) => {
    const fullPath = path.resolve(directory, file);

    if (fs.statSync(fullPath).isDirectory()) {
      readDirectory(fullPath);
      return;
    }

    if (!regularExpression.test(fullPath)) return;

    files[fullPath] = true;
  });
}

readDirectory(path.resolve(__dirname, base));


fs.unlinkSync(outputFilename)
console.log('old index.js deleted');
fs.writeFileSync(outputFilename,'/* eslint-disable import/prefer-default-export */'+os.EOL)
console.log('initialize index.js');

Object.keys(files).forEach((fileName)=>{
  const componentName = _.upperFirst(
    _.camelCase(
      fileName.replace(/^\/(.+\/)*(.+)\.\w+$/, '$2')
    )
  )

  fs.appendFileSync(outputFilename,'export { default as '+componentName+' } from \''+fileName.replace(path.resolve(__dirname, base),'.')+'\';'+os.EOL)
  
  
  const options = {
    filenames: [fileName]
  }
  const docOutputFilename = fileName.replace(path.resolve(__dirname, base),'docs').replace('.vue','.md')
  vuedoc.md(options).then((document) => {
    if (fs.existsSync(docOutputFilename)) fs.unlinkSync(docOutputFilename)
    fs.mkdirSync(path.dirname(docOutputFilename),{recursive: true})
    fs.writeFileSync(docOutputFilename,document)
  }).catch((err) => {
    console.error(err)
  })
  console.log('add '+componentName);
})

console.log('finish generate components index.js')