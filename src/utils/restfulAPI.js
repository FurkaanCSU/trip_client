

//not returning what i need it to return
//write this function again and make sure to return false if anything in schema is missing
//current server requestType is commented out for validator testing...FIX THIS BUG-URGENT
export function isJsonResponseValid(object, schema) {//json validator
  let Ajv = require('ajv');
  let ajv = new Ajv({allErrors : true});
  let validate = ajv.compile(schema);
  let res = validate(object);
  console.log("Schema Valid: " + res)
  return res;
}
