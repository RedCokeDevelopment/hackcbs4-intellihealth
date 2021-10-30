import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import DrugSearch from "./page/DrugSearch";
import FoodSearch from "./page/FoodSearch";
import Drug from "./page/Drug";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <header className={'overflow-x-auto'}>
                    <Navbar>
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>IntelliHealth (medi.study)</NavbarHeading>
                            <NavbarDivider/>
                            <Link to={'/'}>
                                <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                            </Link>
                            <Link to={'/drug'}>
                                <Button className={Classes.MINIMAL} icon="git-repo" text="Drug Search"/>
                            </Link>
                            <Link to={'/food'}>
                                <Button className={Classes.MINIMAL} icon="info-sign" text="Food Nutrition Search"/>
                            </Link>
                        </NavbarGroup>
                    </Navbar>
                </header>
                <Switch>
                    <Route exact path="/drug">
                        <DrugSearch/>
                    </Route>
                    <Route path="/drug/:drugName" render={(props) => <Drug {...props} />} />
                    <Route exact path="/food">
                        <FoodSearch/>
                    </Route>
                    <Route path="/food/:foodName">
                        <FoodSearch/>
                    </Route>
                    <Route exact path="/">
                        <h1>Home</h1>
                    </Route>
                    <Route path="*">
                        <h1>Page Not Found</h1>
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );



}

export default App
