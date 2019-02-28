import React, {Component} from 'react';
import {ITEMS} from "../shared/items";
import Catalog from "./CatalogComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Redirect, Route, Switch} from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import {COMMENTS} from "../shared/comments";
import {EMPLOYEES} from "../shared/employees";
import ItemDetail from "./ItemdetailComponent";
import About from "./AboutComponent";

import Users from "./UsersComponent";
import Repository from "./RepositoryComponent";

class Main extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            items: ITEMS,
            comments: COMMENTS,
            employees: EMPLOYEES
        };
        console.log("Main constructor es invocado");
    }

    render() {
        const ItemWithId = ({match}) => {
            return (
                <ItemDetail item={this.state.items.filter((item) => item.id === parseInt(match.params.itemId, 10))[0]}
                            comments={this.state.comments.filter((comment) => comment.itemId === parseInt(match.params.itemId, 10))}/>
            );
        };

        const RepositoryByUsername = ({match}) => {
            return (
                <Repository userName={match.params.username} />
            );
        };


        const HomePage = () => {
            return (
                <Home
                    item={this.state.items.filter(item => item.featured)[0]}
                    employee={this.state.employees.filter(employee => employee.featured)[0]}
                />
            );
        };

        console.log("Main render es invocado");
        return (
            <div>
                <Header/>
                <Switch>
                    <Route exact path='/users' component={() => <Users />}/>
                    <Route path='/repository/:username' component={RepositoryByUsername} />}/>
                    <Route path='/home' component={HomePage}/>
                    <Route path='/contactus' component={Contact}/>
                    <Route path='/aboutus' component={() => <About employees={this.state.employees}/>}/>
                    <Route exact path='/catalog' component={() => <Catalog items={this.state.items}/>}/>
                    <Route path='/catalog/:itemId' component={ItemWithId}/>
                    <Redirect to="/users"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;
