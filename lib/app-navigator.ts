import {compose, withProps} from 'recompose';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import * as _ from 'lodash';

export interface IAppNavigateInputProps {
    pathname: string;
    setOrigin?: boolean;
    modal?: boolean;
    query?: any;
    state?: any;
}

export interface IAppNavigateReplaceInputProps {
    pathname: string;
    query?: any;
    state?: any;
}

export interface IAppNavigator {
    navigateToOrigin: () => void;
    navigate: (input: IAppNavigateInputProps) => void;
    replace: (input: IAppNavigateReplaceInputProps) => void;
}

export interface IAppNavigatorProps<Params extends { [K in keyof Params]?: string } = {}> extends RouteComponentProps<Params> {
    AppNavigator: IAppNavigator;
}

const createNavigator = (props) => {

    const navigate = ({ pathname, setOrigin = false, modal = false, query = {}, state = {} }: IAppNavigateInputProps) => {

        if (setOrigin) {
            state.returnTo = props.location.pathname;
        }
        if (modal) {
            state.modal = true;
        }

        props.history.push({
            pathname: pathname,
            query: query,
            state: state,
        });
    };

    return {
        AppNavigator: {
            navigateToOrigin: () => {
                const returnTo = _.get(props, 'location.state.returnTo', '/');
                props.history.push(returnTo);
            },
            navigateRelative: ({relativePath, setOrigin = false}) => {
                const query: any = {};
                if (setOrigin) {
                    query.returnTo = props.location.pathname;
                }
                props.history.push(
                    `${props.match.path}${relativePath}`, {
                        query: query,
                    },
                );
            },
            navigate: navigate,
        },
    };
};

export const withAppNavigator = () =>
    compose(
        withRouter,
        withProps(createNavigator),
    );
