import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {Alignment, Button, Classes, Navbar, NavbarDivider, NavbarGroup, NavbarHeading} from "@blueprintjs/core";
import {BrowserRouter, Route, Switch, Link} from "react-router-dom";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <header>
                    <Navbar>
                        <NavbarGroup align={Alignment.LEFT}>
                            <NavbarHeading>IntelliHealth</NavbarHeading>
                            <NavbarDivider/>
                            <Link to={'/'}>
                                <Button className={Classes.MINIMAL} icon="home" text="Home"/>
                            </Link>

                        </NavbarGroup>
                    </Navbar>
                </header>
                <Switch>
                    <Route path="/about">
                        <h1>About</h1>
                    </Route>
                    <Route path="/users">
                        <h1>Users</h1>
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
