import { compose, withProps } from 'recompose';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as _ from 'lodash';
import { IWithModuleRootPathProps, withModuleRootPath } from './module-route';

export interface IAppNavigatorOptions {
    state?: any;
    relativeToModule?: boolean;
}

export interface IAppNavigatorReplaceOptions extends IAppNavigatorOptions {}

export interface IAppNavigatorNavigateOptions extends IAppNavigatorOptions {
    setOrigin?: boolean;
    modal?: boolean;
}

export const createNavigator = (props: IWithModuleRootPathProps & RouteComponentProps) => {
    const navigate = (pathname: string, options?: IAppNavigatorNavigateOptions) => {
        const { setOrigin = false, modal = false, state = {}, relativeToModule = true } = options || {};

        if (setOrigin) {
            state.returnTo = props.location.pathname;
        }

        if (modal) {
            state.modal = true;
        }

        if (relativeToModule && props.moduleRootPath) {
            pathname = `${props.moduleRootPath}${pathname}`;
        }

        props.history.push({
            pathname: pathname,
            state: state,
        });
    };

    const replace = (pathname: string, options?: IAppNavigatorReplaceOptions) => {
        const { state = {}, relativeToModule = true } = options || {};

        if (relativeToModule && props.moduleRootPath) {
            pathname = `${props.moduleRootPath}${pathname}`;
        }

        const replaceOptions = {
            state: state,
        };

        props.history.replace(pathname, replaceOptions);
    };

    const navigateToOrigin = () => {
        const returnTo = _.get(props, 'location.state.returnTo', '/');
        props.history.push(returnTo);
    };

    const replaceToOrigin = () => {
        const returnTo = _.get(props, 'location.state.returnTo', '/');
        props.history.replace(returnTo);
    };

    return {
        AppNavigator: {
            replace,
            navigate,
            replaceToOrigin,
            navigateToOrigin,
            moduleRootPath: props.moduleRootPath,
        },
    };
};

export interface IAppNavigatorProps<Params extends { [K in keyof Params]?: string } = {}>
    extends RouteComponentProps<Params>,
        ReturnType<typeof createNavigator> {}

export const withAppNavigator = () =>
    compose(
        withRouter,
        withModuleRootPath,
        withProps(createNavigator)
    );
