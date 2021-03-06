export const configSchema = {
    "title": "config",
    "description": "config response",
    "type": "object",
    "properties": {
        "requestVersion": {
            "description":"the TIP protocol version",
            "type":"integer",
            "minimum": 1
        },
        "requestType": {
            "description":"the TIP object type should be config",
            "type":"string",
            "pattern":"^config$"
        },
        "serverName": {
            "description":"identify the server instance",
            "type":"string",
            "minLength":3
        },
        "supportedRequests": {
            "description": "a list of supported request types",
            "type": "array",
            "items": {
                "type": "string",
                "enum": ["config","distance","trip"]
            }
        }
    },
    "required":["requestVersion","requestType","serverName","supportedRequests"],
    "additionalProperties": false
}