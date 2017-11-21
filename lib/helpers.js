const fs = require('fs');
const { promisify } = require('util');
const path = require('path')

const readfileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

// get folders
const isFolder = source => fs.lstatSync(source).isDirectory()
const getDirectories = (source) => {
  return fs.readdirSync(source)
  .filter((name)=>{
    return isFolder(path.join(source, name))
  })
}

/**
 * Hack Angular Components on source
 * @param {string} component path of component File to open. eg: `./staging/${inkbarC}/${inkbarC}.component.ts`
 * @param {string} place context to find, like: \[THIS_IS_MY_STYLE!\] .(Note that you should write regex-compatible queries.)
 * @param {string} content context to overwrite with.
 */
const compHack = async (component, place, content) => {
  let inText = await readfileAsync(component, 'utf8');
  let placeReg = new RegExp(place, "g");
  let outText = inText.replace(placeReg, content);
  // output
  await writeFileAsync(component, outText, 'utf8');
};

module.exports = {
  readfileAsync,
  getDirectories,
  compHack
};