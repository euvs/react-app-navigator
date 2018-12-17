# @euvs/react-app-navigator

[![Greenkeeper badge](https://badges.greenkeeper.io/euvs/react-app-navigator.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/euvs/react-app-navigator.svg?branch=master)](https://travis-ci.org/euvs/react-app-navigator)

Set of utilities for easier navigation within react app. It is built on top of react-router 4.

## Install 

    yarn add @euvs/react-app-navigator

    npm i @euvs/react-app-navigator --save
    

## What is this?

Think of it as [react-router](https://reacttraining.com/react-router/) extended with [@reach/router](https://reach.tech/router)'s philosophy.


## How to use

Define your module

```js
import {ModuleRoot, ModuleRoute, ModuleSwitch} from '@euvs/react-app-navigator';

const List = () => ...
const Edit = () => ...
const View = () => ...

class MyModule extends React.Component {

    public render() {
        return (
            <ModuleRoot>
                <ModuleSwitch>
                    <ModuleRoute path={'/'} exact component={List}/>
                    <ModuleRoute path={`/:id/edit`} component={Edit}/>
                    <ModuleRoute path={`/:id`} component={View}/>
                </ModuleSwitch>
            </ModuleRoot>
        );
    }
}

```

Use it in your app as you would normally use it.

```js
const Home = () => ...
const Admin = () => ...// see below

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path="/users" component={MyModule}/>
                    <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
```

You can mount `MyModule` component on any route in your app. For example:


```js
const AdminHome = () => ....
const Admin = () => {
    return <div>
        <nav >
            <Link to={"/admin"}>Admin</Link>
            <Link to={"/admin/users"}>Users</Link>
        </nav>

        <Switch>
            <Route path="/admin" exact component={AdminHome}/>
            <Route path="/admin/users" component={MyModule}/>
        </Switch>
    </div>
};

```

... and all relative links will still work.


Please see example project - [example/react-app](examples/react-app)

## API documentation

Coming... 