import {compose, withProps} from 'recompose';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import * as _ from 'lodash';
import {IWithModuleRootPathProps, withModuleRootPath} from "./module-route";

export interface IAppNavigatorOptions {
    state?: any;
    relativeToModule?: boolean;
}

export interface IAppNavigatorReplaceOptions extends IAppNavigatorOptions {
}

export interface IAppNavigatorNavigateOptions extends IAppNavigatorOptions {
    setOrigin?: boolean;
    modal?: boolean;
}

export interface IAppNavigator {
    navigate: (pathname: string, options?: IAppNavigatorNavigateOptions) => void;
    navigateToOrigin: () => void;
    replace: (pathname: string, options?: IAppNavigatorReplaceOptions) => void;
    replaceToOrigin: () => void;
    moduleRootPath: string;
}

export interface IAppNavigatorProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    AppNavigator: IAppNavigator;
}

const createNavigator = (props: IWithModuleRootPathProps & RouteComponentProps) => {

    const navigate = (pathname: string, options?: IAppNavigatorNavigateOptions) => {

        const {setOrigin = false, modal = false, state = {}, relativeToModule = false} = options || {};

        if (setOrigin) {
            state.returnTo = props.location.pathname;
        }

        if (modal) {
            state.modal = true;
        }

        if (relativeToModule) {
            pathname = `${props.moduleRootPath}${pathname}`;
        }

        props.history.push({
            pathname: pathname,
            state: state,
        });
    };

    const replace = (pathname: string, options?: IAppNavigatorReplaceOptions) => {
        const {state = {}, relativeToModule = false} = options || {};

        if (relativeToModule) {
            pathname = `${props.moduleRootPath}${pathname}`;
        }
        const replaceOptions = {
            pathname: pathname,
            state: state,
        };
        props.history.replace(pathname, replaceOptions)
    };

    const navigateToOrigin = () => {
        const returnTo = _.get(props, 'location.state.returnTo', '/');
        navigate(returnTo);
    };

    const replaceToOrigin = () => {
        const returnTo = _.get(props, 'location.state.returnTo', '/');
        replace(returnTo);
    };

    const createAppNavigator = (): IAppNavigator => ({
        replace,
        navigate,
        replaceToOrigin,
        navigateToOrigin,
        moduleRootPath: props.moduleRootPath,
    });

    return {
        AppNavigator: createAppNavigator()
    };
};

export const withAppNavigator = () =>
    compose(
        withRouter,
        withModuleRootPath,
        withProps(createNavigator),
    );
