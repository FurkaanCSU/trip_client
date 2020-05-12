import React, {Component} from "react";
import {Nav, Navbar, NavLink, NavItem, TabContent, TabPane} from 'reactstrap';
import Distance from "./Distance";
import "../Margins/margins.css"
export default class Itinerary extends Component{
    constructor(props) {
        super(props);
        this.state = {
            activeTab : '1'
        }
    }
    render() {
        return (
            <div>
                <Nav tabs className="centerElement">
                    {this.makeNavItem('1', "Trip")}
                    {this.makeNavItem('2', "Distance")}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">{}</TabPane>
                    <TabPane tabId="2">{<Distance />}</TabPane>
                </TabContent>
            </div>
        );
    }

    makeNavItem(tabNum, name){
        return(
            <NavItem>
                <NavLink className={this.state.activeTab === tabNum ? 'active': ''}
                         onClick={() => {this.setState({activeTab : tabNum})}}
                >{name}</NavLink>
            </NavItem>
        );
    }
}