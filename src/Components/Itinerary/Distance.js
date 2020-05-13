import React, {Component} from "react";
import DistanceForms from "./DistanceForms";
import axios from 'axios';
import {HTTP_BAD_REQUEST, SERVER_DISTANCE_REQUEST} from "../../Constants";
import {isJsonResponseValid} from "../../utils/restfulAPI";
import {checkErrorResponse} from "../../CheckErrorStatus";
import {distanceSchema} from "../../schemas/DistanceResponse";

export default class Distance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            request: null,
            response: null
        }
    }

    setRequest(obj) {
        this.setState({request: obj})
    }


    renderResult() {//uses Response from server
        if (this.state.response === null) {
            return null;
        }
        return (
            <div>
                <p>Distance Calculated: <b>{this.state.response.distance}</b></p>
            </div>
        );
    }

    render() {
        if (this.state.request !== null) {
            this.sendRequest();
            this.setState({request: null})
        }
        return (
            <div>
                <DistanceForms
                    setRequest={(obj) => this.setRequest(obj)}
                />
                {this.renderResult()}
            </div>)
    }

    sendRequest() {
        axios.post(SERVER_DISTANCE_REQUEST, this.state.request).then(
            (response) => {
                this.processDistanceResponse(response);
            }
        ).catch(
            (error) => {
                this.processDistanceResponse(error)
            }
        )
    }

    processDistanceResponse(response){
        if(!isJsonResponseValid(response.data, distanceSchema)) {
            this.processServerConfigError("INVALID_RESPONSE", HTTP_BAD_REQUEST, `Configuration response not valid`);
        }else if(!checkErrorResponse(response)){
            this.setState({response: response.data})
        } else{
            this.processServerConfigError(response.statusText, response.status, "Failed to Fetch from server")
        }
    }
}