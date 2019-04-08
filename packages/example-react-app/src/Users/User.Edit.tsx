import * as React from 'react';

import { compose, withProps } from 'recompose';

import { withAppNavigator, IAppNavigatorProps, ModuleLink } from '@euvs/react-app-navigator';
import { getUserById } from './users';

interface IPageProps extends IAppNavigatorProps {
    user: any;
    id: string;
}

class EditView extends React.Component<IPageProps> {
    private onCancelNavigate = () => {
        this.props.AppNavigator.navigateToOrigin();
    };
    private onCancelReplace = () => {
        this.props.AppNavigator.replaceToOrigin();
    };

    public render() {
        const { user } = this.props;
        return (
            <div className={'segment'}>
                <h3>Edit User Page</h3>
                <hr />
                <p>Name: {user.name}</p>
                <button onClick={this.onCancelReplace}>Cancel (replace to origin)</button>
                <button onClick={this.onCancelNavigate}>Cancel (navigate to origin)</button>
            </div>
        );
    }
}

export default compose(
    withAppNavigator(),
    withProps((props: any) => ({
        id: String(props.match.params.id),
        user: getUserById(props.match.params.id),
    }))
)(EditView);
