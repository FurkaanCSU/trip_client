import React, {Component} from 'react';
import './App.css';
import {SERVER_REQUEST, HTTP_BAD_REQUEST} from "./Constants";
import {isJsonResponseValid, sendServerRequest} from "./utils/restfulAPI";
import {checkErrorResponse, createErrorBanner} from "./CheckErrorStatus";
import {configSchema} from "./schemas/ConfigResponse";
import Header from "./Components/Margins/Header";
import Footer from "./Components/Margins/Footer";
import Itinerary from "./Components/Itinerary/Itinerary";

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            config : null,
            errorMessage : null
        }
        sendServerRequest(SERVER_REQUEST, "config").then(config =>{
            this.processConfigResponse(config);
        })
    }

    render() {
        return (//NEED TO PUT EVERYTHING IN PAGE CONTAINER, THEN EVERYTHING BUT FOOTER IN CONTENT-WRAP FOR FOOTER TO STAY DOWN
            <div className="page-container">
                <div className="content-wrap">
                    <Header/>
                    {this.state.errorMessage}
                    <div className="App"><Itinerary /></div>
                </div>
                <Footer config = {this.state.config}/>
            </div>
        );
    }

    processConfigResponse(configResponse){
        if(!isJsonResponseValid(configResponse.body, configSchema)) {
            this.processServerConfigError("INVALID_RESPONSE", HTTP_BAD_REQUEST, `Configuration response not valid`);
        }else if(!checkErrorResponse(configResponse.statusCode)){
            this.setState({config: configResponse.body, errorMessage: null})
        } else{
            this.processServerConfigError(configResponse.statusText, configResponse.statusCode, configResponse.message)
        }
    }

    processServerConfigError(statusText, statusCode, message) {
        this.setState({config: null, errorMessage: createErrorBanner(statusText, statusCode, message)});
    }

}