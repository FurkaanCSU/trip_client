import axios from 'axios';

export function isJsonResponseValid(object, schema) {//json validator
  let Ajv = require('ajv');
  let ajv = new Ajv({allErrors : true});
  let validate = ajv.compile(schema);
  return validate(object);
}

export function sendServerRequest(server, requestType) {
  const restfulAPI = `${server}/api/${requestType}`;
  return processGetRequest(restfulAPI);
}

async function processGetRequest(endpoint){
  try{
    const response = await axios.get(endpoint)
    return {
      statusCode: response.status,
      statusText: response.statusText,
      body: await response.data
    }
  }catch (error) {
    return { statusCode: 0, statusText: 'Client failure', body: null };
  }
}

export function sendServerPostRequest(server, requestType, request_body){
  const restfulAPI = `${server}/api/${requestType}`;
  return processPostRequest(restfulAPI, request_body);
}

async function processPostRequest(endpoint, request_body){
  try {
    const response = await axios.post(endpoint, request_body)
    return{
      statusCode: response.status,
      statusText: response.statusText,
      body: await response.data
    }
  }catch (error) {
    return{statusCode: 0, statusText: 'Client Failure', body: null}
  }
}



