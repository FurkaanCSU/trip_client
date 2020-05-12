import React, {Component} from "react";
import {Container, Modal, ModalBody, ModalHeader, Row, Col, Spinner} from 'reactstrap';
import "./margins.css"
export default class Footer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            modalOpen : false
        }
    }

    renderModalBody(){
        if(this.props.config == null){
            return(
                <div className="centered">
                    <Spinner color="primary"/>
                </div>
            );
        }else{
            return (
                <Container>
                    <Row>
                        <Col>
                            ServerName
                        </Col>
                        <Col>{this.props.config.data.serverName}</Col>
                    </Row>
                    <Row>
                        <Col>RequestType</Col>
                        <Col>{this.props.config.data.requestType}</Col>
                    </Row>
                    <Row>
                        <Col>RequestVersion</Col>
                        <Col>{this.props.config.data.requestVersion}</Col>
                    </Row>
                    <Row>
                        <Col>SupportedRequests</Col>
                        <Col>{this.props.config.data.supportedRequests}</Col>
                    </Row>
                </Container>
            );
        }
    }

    renderModal(){
        return(
            <Modal isOpen={this.state.modalOpen} >
                 <ModalHeader toggle={() => this.setState({modalOpen : !this.state.modalOpen})}>Config</ModalHeader>
                 <ModalBody>
                    {this.renderModalBody()}
                 </ModalBody>
            </Modal>);
    }

    renderFooter() {
        return(
            <footer className= "footer">
                <div className="vertical-center tco-text">
                    <Container>
                        <div className="centered">
                            <p className="tco-text" onClick={() => this.setState({modalOpen: !this.state.modalOpen})}>
                                <b>Config</b>
                            </p>
                            <p className="tco-text">Copyright 2020 Anwar Technologies Limited. All rights reserved.</p>
                        </div>
                    </Container>
                </div>
            </footer>
        );
    }
    render(){
        return(
            <div>
                <div className="main-footer">
                    {this.renderFooter()}
                </div>
                {this.renderModal()}
            </div>
        );
    }
}