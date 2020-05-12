import React, {Component} from "react";
import {Form, FormGroup, Row, Col, Input, Button} from 'reactstrap';

/*
WANT A FORM WITH THREE FIELDS, (LAT/LONG), (LAN/LONG), (EARTHRADIUS)
    --> FORM ON_SUBMIT: SENDS A POST REQUEST USING AXIOS

 */

export default class Distance extends Component{
    constructor(props) {
        super(props);
        this.state = {
            place1: "",
            place2: "",
            earthRadius: null,
            distance : null
        }
    }

    render() {
        return(
            <div>
            {this.renderForms()}
            </div>)
    }

    submitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }

    renderForms(){
        const {place1, place2, earthRadius} = this.state;
        return(
            <Form className="centerForm" onSubmit={this.submitHandler}>
                <Row form>
                    <Col md={3}>
                        <FormGroup>
                            <Input type="text"
                                   name="place1"
                                   placeholder="Lon/Lat"
                                   value={place1}
                                    onChange={this.changeHandler}/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Input type="text"
                                   name="place2"
                                   placeholder="Lon/Lat"
                                   value={place2}
                                   onChange={this.changeHandler}/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Input type="text"
                                   name="earthRadius"
                                   placeholder="Earth Radius"
                                   value={earthRadius}
                                   onChange={this.changeHandler}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <Button type="submit">
                            {/*DO ON SUBMIT AND SEND POST REQUEST*/}
                            Find Distance
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}