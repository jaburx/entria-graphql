/* @flow */
import spawn from 'cross-spawn-promise';

function parseOptions(opts) {
  const availableOptions = ['add', 'edit', 'list', 'view', 'form'];

  // Check if any commands was provided
  const anyCommandsProvided = Object.keys(opts).some(option =>
    availableOptions.indexOf(option) !== -1,
  );

  let options = opts;

  // If not, use the default options
  if (!anyCommandsProvided) {
    options = {
      add: true,
      edit: true,
      list: true,
      view: true,
      form: true,
      ...options,
    };
  }

  const {
    add,
    edit,
    list,
    view,
    form,
    schema,
  } = options;

  return {
    add: add || false,
    edit: edit || false,
    list: list || false,
    view: view || false,
    form: form || false,
    schema: schema || false,
  };
}

const generate = (name, options) => {
  // Parse all arguments
  const parsedOptions = parseOptions(options);
  // Get only the chose arguments
  const chosenOptions = Object.keys(parsedOptions).filter(opt => !!parsedOptions[opt]);

  // Check if schema argument has been passed
  const schemaIndex = chosenOptions.indexOf('schema');
  chosenOptions.forEach(async (option) => {
    const payload = [`@entria/graphql:${option}`, name];

    // If argument schema exists
    if (schemaIndex !== -1) {
      // Remove the next running option because the schema must be used along with this command
      chosenOptions.splice(schemaIndex, 1);

      // Push schema to the arguments to send to yeoman
      payload.push(parsedOptions.schema);
    }

    await spawn('yo', payload, {
      shell: true,
      stdio: 'inherit',
    });
  });
}

export default generate;
