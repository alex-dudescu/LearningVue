/**
 * Utility script to create a component.
 * Call model createComponent componentName path
 * If no path is specified component is created in current direcotry
 *
 * Component structure:
 *
 *  ComponentName.vue
 *  ComponentName
 *      ComponentName.html
 *      ComponentName.js
 *      ComponentName.scss
 */

var fs = require("fs");
var defaultDir = process.env['INIT_CWD'];

createComponent(process.argv);

function createComponent(argv) {
  // Check if path is specified
  if (argv.length === 3) {

    // Create in defautl folder
    var componentName = argv[2];
    
    createFolder(componentName, defaultDir);
    createFile(componentName + ".vue", defaultDir, getVueTemplate(componentName));
    
    createFile(componentName + ".html", `${defaultDir}/${componentName}`, '');
    createFile(componentName + ".scss", `${defaultDir}/${componentName}`, '');
    createFile(componentName + ".js",   `${defaultDir}/${componentName}`, getJsTemplate(componentName));

  } else if (argv.length === 4) {
    // Create in specified folder
  } else {
    printErrorMessage("Invalid number of arguments!");
  }
}

function createFolder(folderName, path) {
  if (!fs.existsSync(`${path}/${folderName}`)) {
    fs.mkdirSync(`${path}/${folderName}`);
  }
}

function createFile(fileName, path, template) {
  if (!fs.existsSync(`${path}/${fileName}`)) {
    
    const fileDescriptor = fs.openSync(`${path}/${fileName}`, "w");
    const buffer = new Buffer(template);

    fs.writeSync(fileDescriptor, buffer, 0, buffer.length, null, err => {
    //   console.log(err);
    });
    fs.closeSync(fileDescriptor);
  } else {
    printErrorMessage("Component already exists");
  }
}

function printErrorMessage(message) {
  console.log(`ERR: ${message}`);
}

function getVueTemplate(componentName) {
  return `<template src="./${componentName}/${componentName}.html"></template>
<style lang="scss" scoped src="./${componentName}/${componentName}.scss"></style>
<script src="./${componentName}/${componentName}.js"></script>`;
}

function getJsTemplate(componentName) {
    return `export default {\n\tname: '${componentName}'\n}`
}
