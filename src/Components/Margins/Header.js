import React, {Component} from "react";
import {Container} from 'reactstrap';
import "./margins.css";
import HeaderLogo from '../../logo.svg';
import {CLIENT_NAME} from "../../Constants";

export default class Header extends Component{
    renderHeader(){
        return(
            <div className="full-width header">
                <div className="vertical-center">
                    <Container>
                        <div>
                            <a>
                                <img className="tco-logo" src={HeaderLogo} alt="Temporary Website Logo"/>
                            </a>
                            <a className="tco-text-upper">{CLIENT_NAME}</a>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div>
                {this.renderHeader()}
            </div>
        );
    }
}