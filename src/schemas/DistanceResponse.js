export const distanceSchema = {
    "title": "distance",
    "description": "distance request/response",
    "type": "object",
    "properties": {
        "requestVersion": {
            "description":"the TIP protocol version",
            "type":"integer",
            "minimum": 1
        },
        "requestType": {
            "description":"the TIP object type should be distance",
            "type":"string",
            "pattern":"^distance$"
        },
        "place1":{
            "description":"an object with the attributes to describe a place",
            "type": "object",
            "properties": {
                "latitude":{"type":"string",
                    "pattern":"^[-+]?\\d+\\.?\\d*$"},
                "longitude":{"type":"string",
                    "pattern":"^[-+]?\\d+\\.?\\d*$"}
            },
            "required":["latitude","longitude"],
            "additionalProperties":true
        },
        "place2":{
            "description":"an object with the attributes to describe a place",
            "type": "object",
            "properties": {
                "latitude":{"type":"string",
                    "pattern":"^[-+]?\\d+\\.?\\d*$"},
                "longitude":{"type":"string",
                    "pattern":"^[-+]?\\d+\\.?\\d*$"}
            },
            "required":["latitude","longitude"],
            "additionalProperties":true
        },
        "earthRadius":{
            "description":"the radius of the earth in some unit of measure",
            "type":"number",
            "minimum":0
        },
        "distance":{
            "description":"the great circle distance between the origin and destination using the radius measure",
            "type":"integer",
            "minimum":0
        }
    },
    "required":["requestVersion","requestType","place1","place2","earthRadius","distance"],
    "additionalProperties": false
}