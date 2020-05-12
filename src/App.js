import React, {Component} from 'react';
import './App.css';
import {SERVER_CONFIG_REQUEST} from "./Constants";
import axios from 'axios';
import Header from "./Components/Margins/Header";
import Footer from "./Components/Margins/Footer";

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            config : null
        }
    }

    getConfig(){
        //initally CORS violation--> fix is in server//Can create a REST class with all http reqs
        //this should also validate response, hence changin the name to "processGetResponse"
        axios.get(SERVER_CONFIG_REQUEST).then(response => {
            console.log(response.data);
            this.setState({config: response});
        });
    }


    render() {
        if(this.state.config === null){
            this.getConfig();
        }
        return (//NEED TO PUT EVERYTHING IN PAGE CONTAINER, THEN EVERYTHING BUT FOOTER IN CONTENT-WRAP FOR FOOTER TO STAY DOWN
            <div className="page-container">
                <div className="content-wrap">
                    <Header/>
                </div>
                <Footer config = {this.state.config}/>
            </div>
        );
    }
}
