import React, {Component} from "react";
import DistanceForms from "./DistanceForms";
import {isJsonResponseValid, sendServerPostRequest} from "../../utils/restfulAPI";
import {distanceSchema} from "../../schemas/DistanceResponse";
import {HTTP_BAD_REQUEST, SERVER_REQUEST} from "../../Constants";
import {checkErrorResponse, createErrorBanner} from "../../CheckErrorStatus";

export default class Distance extends Component {
    constructor(props) {
        super(props);
        this.state={
            response: null,
            errorMessage: null
        }
        this.processDistanceResponse.bind(this)
    }

    render() {
        return (
            <div>
                <DistanceForms processDistanceResponse={(resp)=>this.processDistanceResponse(resp)}/>
                {this.renderResult()}
            </div>)
    }

    renderResult() {//uses Response from server
        if (this.state.response === null) {
            return null;
        }
        return (
            <div>
                <p>Distance Calculated: <b>{this.state.response.distance}</b>{this.resultUnit()}</p>
            </div>
        );
    }

    resultUnit(){
        if(this.state.response.earthRadius < 6371){return<b>miles</b>}
        else if(this.state.response.earthRadius > 6371){return <b>meters</b>}
        else {return <b>kms</b>}
    }

    processDistanceResponse(response){
        if(!isJsonResponseValid(response.body, distanceSchema)) {
            this.processServerConfigError("INVALID_RESPONSE", HTTP_BAD_REQUEST, `Configuration response not valid`);
        }else if(!checkErrorResponse(response.statusCode)){
            this.setState({response: response.body, errorMessage: null})
        } else{
            this.processServerConfigError(response.statusText, response.statusCode, response.message)
        }
    }

    processServerConfigError(statusText, statusCode, message) {
        this.setState({response: null, errorMessage: createErrorBanner(statusText, statusCode, message)});
    }

}