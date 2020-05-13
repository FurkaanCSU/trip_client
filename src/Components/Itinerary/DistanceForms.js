import React, {Component} from "react";
import {Button, Col, Container, Form, FormGroup, Input, Label, Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import {PROTOCOL_VERSION} from "../../Constants";

export default class DistanceForms extends Component{
    constructor(props) {
        super(props);
        this.state = {
            place1_lat : "",
            place1_lon : "",
            place2_lat : "",
            place2_lon : "",
            earthRadius : ""
        }
    }

    render() {
        return(
            <div>
                {this.renderForms()}
            </div>
        );
    }

    createRequest(){
        let requestBody = {
            "requestType" : "distance",
            "requestVersion" : PROTOCOL_VERSION,
            "place1" : {
                "latitude": this.state.place1_lat,
                "longitude": this.state.place1_lon
            },
            "place2" : {
                "latitude": this.state.place2_lat,
                "longitude": this.state.place2_lon
            },
            "earthRadius" : parseFloat(this.state.earthRadius)
        }
        return requestBody
    }

    submitHandler = (e) =>{
        e.preventDefault()
        this.props.setRequest(this.createRequest())
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name] : e.target.value})
    }

    handleClick(unit){
        if(unit === 0){
            this.setState({earthRadius : 6371000.0})
        }else if(unit === 1){
            this.setState({earthRadius : 6371.0})
        }else {
            this.setState({earthRadius: 3958.8})
        }
    }

    renderForms(){
        const toggle = () => {
            this.setState({dropDownOpen : !this.state.dropDownOpen})
        }
        const {place1_lat, place1_lon, place2_lat, place2_lon, earthRadius} = this.state;
        return(
            <Form onSubmit={this.submitHandler}>
                <p>Error Checking not performed to Save time <br/>Make sure Lats are between -90 and 90
                    <br/>And Lons are between -180 and 180</p>
                <Container form>
                    <Row className="centerForm">
                        <Label for="place1">Place 1</Label>
                        <FormGroup>
                            <Col>
                                <Input type="text"
                                       name="place1_lat"
                                       placeholder="Lat"
                                       value={place1_lat}
                                       onChange={this.changeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col>
                                <Input type="text"
                                       name="place1_lon"
                                       placeholder="Lon"
                                       value={place1_lon}
                                       onChange={this.changeHandler}/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row className="centerForm">
                        <Label for="place2">Place 2</Label>
                        <FormGroup>
                            <Col>
                                <Input type="text"
                                       name="place2_lat"
                                       placeholder="Lat"
                                       value={place2_lat}
                                       onChange={this.changeHandler}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col>
                                <Input type="text"
                                       name="place2_lon"
                                       placeholder="Lon"
                                       value={place2_lon}
                                       onChange={this.changeHandler}/>
                            </Col>
                        </FormGroup>
                    </Row>

                    <ButtonDropdown isOpen={this.state.dropDownOpen} toggle={toggle}>
                        <DropdownToggle caret>Distance Units</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={()=>this.handleClick(0)} toggle={false}>Meters</DropdownItem>
                        <DropdownItem onClick={()=>this.handleClick(1)} toggle={false}>KM</DropdownItem>
                        <DropdownItem onClick={()=>this.handleClick(2)} toggle={false}>Miles</DropdownItem>
                    </DropdownMenu>
                    </ButtonDropdown>
                    {this.renderFormButton()}
                </Container>
            </Form>
        )
    }

    renderFormButton(){
        if(this.state.place1_lat === "" ||
            this.state.place1_lon === "" ||
            this.state.place2_lat === "" ||
            this.state.place2_lon === "" ||
            this.state.earthRadius === ""
        ){
           return (<Button disabled>Submit Request</Button>)
        }else{
            return (<Button type="submit">Submit Request</Button>)
        }
    }
}