import Generator from 'yeoman-generator';
import pluralize from 'pluralize';
import {
  getRelativeConfigDir,
} from '../utils';
import { getConfigDir } from '../config';
import { camelCaseText, uppercaseFirstLetter } from '../ejsHelpers';

class ViewGenerator extends Generator {
  constructor(args, options) {
    super(args, options);

    this.argument('name', {
      type: String,
      required: true,
    });

    // TODO read schema.json

    this.destinationDir = getConfigDir('view');
  }

  _getConfigDirectories() {
    return getRelativeConfigDir('loader', ['model', 'connection']);
  }

  generateList() {
    // const schema = this.options.model ?
    //   getMongooseModelSchema(this.options.model, true)
    //   : null;

    const name = uppercaseFirstLetter(this.options.name);

    const templatePath = this.templatePath('View.js.template');

    // const templatePath = schema ?
    //   this.templatePath('LoaderWithSchema.js.template')
    //   : this.templatePath('Loader.js.template');
    //
    // const directories = this._getConfigDirectories();

    const pluralName = pluralize(this.options.name);

    const destinationPath = this.destinationPath(`${this.destinationDir}/${name}View.js`);
    const templateVars = {
      name,
      rawName: this.options.name,
      camelCaseName: camelCaseText(name),
      pluralName,
      pluralCamelCaseName: camelCaseText(pluralName),
    };

    this.fs.copyTpl(templatePath, destinationPath, templateVars);
  }

  end() {
    this.log('🔥 View created!');
  }
}

module.exports = ViewGenerator;
