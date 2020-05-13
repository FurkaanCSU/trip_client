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
                    {this.makeNavItem('1', "Distance")}
                    {this.makeNavItem('2', "Log")}
                    {this.makeNavItem('3', "Account Details")}
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">{<Distance />}</TabPane>
                    <TabPane tabId="2">{}</TabPane>
                    <TabPane tabId="3">{}</TabPane>
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