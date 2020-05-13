import React, {Component} from 'react';
import './App.css';
import {SERVER_CONFIG_REQUEST, HTTP_BAD_REQUEST} from "./Constants";
import {isJsonResponseValid} from "./utils/restfulAPI";
import {checkErrorResponse, createErrorBanner} from "./CheckErrorStatus";
import axios from 'axios';
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
        if(this.state.config === null){
            this.getConfig();
        }
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

    getConfig(){
        axios.get(SERVER_CONFIG_REQUEST).then(response => {
            this.processConfigResponse(response)
        }).catch((error)=>{
                this.processConfigResponse(error)
        });
    }

    processConfigResponse(configResponse){
        if(!isJsonResponseValid(configResponse.data, configSchema)) {
            this.processServerConfigError("INVALID_RESPONSE", HTTP_BAD_REQUEST, `Configuration response not valid`);
        }else if(!checkErrorResponse(configResponse)){
            this.setState({config: configResponse})
        } else{
            this.processServerConfigError(configResponse.statusText, configResponse.status, "Failed to Fetch from server")
        }
    }

    processServerConfigError(statusText, statusCode, message) {
        this.setState({config: null, errorMessage: createErrorBanner(statusText, statusCode, message)});
    }

}
