import {Route, Switch, withRouter} from 'react-router';
import * as React from 'react';
import {Link, LinkProps, NavLink} from "react-router-dom";

const ModuleRouteContext = React.createContext('/');

export const ModuleRoot = withRouter(({children, match}) => {
    return <ModuleRouteContext.Provider value={match.path}>
        {children}
    </ModuleRouteContext.Provider>;
});

export interface IWithModuleRootPathProps {
    moduleRootPath: string
}

export const withModuleRootPath = (C) => (props) => {
    return <ModuleRouteContext.Consumer>{
        (value) => {
            return <C moduleRootPath={value} {...props}/>;
        }
    }</ModuleRouteContext.Consumer>;
};

export const ModuleSwitch: React.FC = ({children}) => {
    return <ModuleRouteContext.Consumer>{
        (value) => {
            // invariant(value, "You should not use <ModuleSwitch> outside a <ModuleRootRoute>");
            const remappedChildren = React.Children.map<any>(children, (child) => {
                if (!React.isValidElement(child)) {
                    return child;
                }
                if (!child.props) {
                    return child;
                }

                const childProps: any = child.props;
                const path = childProps.path || '';
                const newPath = `${value}${path}`;
                return React.cloneElement<any>(child, {...child.props, path: newPath});
            });
            return <Switch>
                {remappedChildren}
            </Switch>;
        }
    }</ModuleRouteContext.Consumer>;
};

export const ModuleLink: React.FC<LinkProps> = (props) => {
    return <ModuleRouteContext.Consumer>{
        (value) => {
            const newTo = `${value}${props.to}`;
            return <Link {...props} to={newTo}/>;
        }
    }
    </ModuleRouteContext.Consumer>
};

export const ModuleNavLink: React.FC<LinkProps> = (props) => {
    return <ModuleRouteContext.Consumer>{
        (value) => {
            const newTo = `${value}${props.to}`;
            return <NavLink {...props} to={newTo}/>;
        }
    }
    </ModuleRouteContext.Consumer>
};


export const ModuleRoute = Route;