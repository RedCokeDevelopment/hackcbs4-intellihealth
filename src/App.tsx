import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";
import DrugSearch from "./page/DrugSearch";
import FoodSearch from "./page/FoodSearch";
import Drug from "./page/Drug";
import Food from "./page/Food";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <header className={'overflow-x-auto'}>
                    <Navbar>
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>IntelliHealth</NavbarHeading>
                            <NavbarDivider/>
                            <Link to={'/'}>
                                <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                            </Link>
                            <Link to={'/drug'}>
                                <Button className={Classes.MINIMAL} icon="git-repo" text="Drug Search"/>
                            </Link>
                            <Link to={'/food'}>
                                <Button className={Classes.MINIMAL} icon="info-sign" text="Food Nutrition Calculator"/>
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
                    <Route path="/food/:foodName" render={(props) => <Food {...props} />}/>
                    <Route exact path="/">
                        <div className={'container'}>
                            <h1>Home</h1>
                            <p>A webapp to raise awareness of drug abuse and to provide useful drug and food nutritional data to uses</p>
                            <p>Get started by clicking one of the links above.</p>
                        </div>
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
