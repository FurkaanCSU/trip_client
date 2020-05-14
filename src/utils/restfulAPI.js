
export function isJsonResponseValid(object, schema) {//json validator
  let Ajv = require('ajv');
  let ajv = new Ajv({allErrors : true});
  let validate = ajv.compile(schema);
  return validate(object);
}