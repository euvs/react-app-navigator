import {compose, withProps} from 'recompose';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import * as _ from 'lodash';
import {IWithModuleRootPathProps, withModuleRootPath} from "./module-route";

export interface IAppNavigateInputProps {
    pathname: string;
    setOrigin?: boolean;
    modal?: boolean;
    state?: any;
    relativeToModule?: boolean;
}

export interface IAppNavigateReplaceInputProps {
    pathname: string;
    state?: any;
}

export interface IAppNavigator {
    navigate: (input: IAppNavigateInputProps) => void;
    navigateToOrigin: () => void;
    replace: (input: IAppNavigateReplaceInputProps) => void;
    replaceToOrigin: () => void;
    moduleRootPath: string;
}

export interface IAppNavigatorProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    AppNavigator: IAppNavigator;
}

const createNavigator = (props: IWithModuleRootPathProps & RouteComponentProps) => {

    console.log(props);

    const navigate = ({pathname, setOrigin = false, modal = false, state = {}, relativeToModule = false}: IAppNavigateInputProps) => {

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

    const replace = (input: IAppNavigateReplaceInputProps) => {
        props.history.replace(input)
    };

    const navigateToOrigin = () => {
        const returnTo = _.get(props, 'location.state.returnTo', '/');
        props.history.push(returnTo);
    };

    const replaceToOrigin = () => {
        const returnTo = _.get(props, 'location.state.returnTo', '/');
        props.history.replace(returnTo);
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
