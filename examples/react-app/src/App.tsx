import React, {Component} from 'react';
import {Route, Switch} from "react-router";

import {NavLink} from "react-router-dom";
import UserRouter from "./Users/UserRouter";
import {ModuleNavLink, ModuleRoot, ModuleRoute, ModuleSwitch} from '@euvs/react-app-navigator';


const TopNav = () => {
    return <nav className={"nav"}>
        <NavLink to={"/"} exact>Home</NavLink>
        <NavLink to={"/admin"}>Admin</NavLink>
        <NavLink to={"/admin-as-module"}>Admin As Module</NavLink>
        <NavLink to={"/users"}>Users</NavLink>
    </nav>
};

const NotFound = () => <div>"Not Found :("</div>
const Home = () => <div className={"segment"}>App Home</div>;
const AdminHome = () => <div className={"segment"}>Admin home</div>;

// react-router style where paths are absolute
const Admin = (props) => {
    return <div>
        <nav className={"nav-secondary"}>
            <NavLink to={`${props.match.path}/`} exact>Admin</NavLink>
            <NavLink to={`${props.match.path}/users`}>Users</NavLink>
        </nav>

        <Switch>
            <Route path={`${props.match.path}/`} exact component={AdminHome}/>
            <Route path={`${props.match.path}/users`} component={UserRouter}/>
        </Switch>
    </div>
};

// module style where path as relative to module root
const AdminAsModule = () => {
    return <ModuleRoot>
        <nav className={"nav-secondary"}>
            <ModuleNavLink to={"/"} exact>Admin</ModuleNavLink>
            <ModuleNavLink to={"/users"}>Users</ModuleNavLink>
        </nav>

        <ModuleSwitch>
            <ModuleRoute path="/" exact component={AdminHome}/>
            <ModuleRoute path="/users" component={UserRouter}/>
        </ModuleSwitch>
    </ModuleRoot>
};


class App extends Component {
    render() {
        return (
            <div className="app">
                <TopNav/>
                <main>
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/admin" component={Admin}/>
                        <Route path="/admin-as-module" component={AdminAsModule}/>
                        <Route path="/users" component={UserRouter}/>
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
