import React, {Component} from 'react';
import {Route, Switch} from "react-router";

import {Link} from "react-router-dom";
import UserRouter from "./Users/UserRouter";

const Nav = () => {
    return <nav className={"nav"}>
        <Link to={"/"}>Home</Link>
        <Link to={"/admin"}>Admin</Link>
        <Link to={"/users"}>Users</Link>
    </nav>
};

const NotFound = () => <div>"Not Found :("</div>

const Home = () => {
    return <div className={"segment"}>
        Home page
    </div>
};

const Admin = () => {
    return <div>
        <nav className={"nav-secondary"}>
            <Link to={"/admin"}>Admin</Link>
            <Link to={"/admin/users"}>Users</Link>
        </nav>

        <Switch>
            <Route path="/admin" exact render={()=><div className={"segment"}>Admin home</div>}/>
            <Route path="/admin/users" component={UserRouter}/>
        </Switch>
    </div>
};


class App extends Component {
    render() {
        return (
            <div className="app">
                <Nav/>
                <main>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/users" component={UserRouter}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
