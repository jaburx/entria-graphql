// @flow
import fs from 'fs-extra';
import path from 'path';
import { uppercaseFirstLetter } from '../src/ejsHelpers';

/**
 * Get the content of a file
 * @param path {string} The path of the file
 * @returns {string} The content of the file
 */
export const getFileContent = (pathname: string) => fs.readFileSync(pathname, 'utf8');

/**
 * Get a fixture path
 * @param name {string} Name of the file of the fixture
 * @returns {string} The path of the fixture
 */
export const getFixturePath = (name: string) => path.join(__dirname, `../fixtures/${name}.js`);

const FIXTURES_MODULES = [
  'adminUser',
  'comment',
  'post',
  'user',
];

const getModulePath = (module: string) => `src/modules/${module}`;
const getModelName = (name: string) => `${name}Model.js`;
const getTypeName = (name: string) => `${name}Type.js`;
const getLoaderName = (name: string) => `${name}Loader.js`;
const getConnectionName = (name: string) => `${name}Connection.js`;

const GENERATED_FILES = [
  getModelName,
  getTypeName,
  getLoaderName,
  getConnectionName,
];

export const copyFixturesToModules = (dir: string, moduleName?: string) => {
  FIXTURES_MODULES.forEach((module) => {
    const name = uppercaseFirstLetter(module);
    const modulePath = getModulePath(module);

    // Generate only Model, the other files will be generated by generators
    if (module === moduleName) {
      fs.copySync(
        getFixturePath(name),
        path.join(dir, modulePath, getModelName(name)),
      );
      return;
    }

    GENERATED_FILES.forEach((getFilename) => {
      fs.copySync(
        getFixturePath(name),
        path.join(dir, modulePath, getFilename(name)),
      );
    });
  });
};
