import * as React from 'react';

import {compose, withProps} from 'recompose';

import {withAppNavigator, IAppNavigatorProps, ModuleLink} from '@euvs/react-app-navigator';
import {getUserById} from "./users";
import {Link} from "react-router-dom";

interface IPageProps extends IAppNavigatorProps {
    user: any;
    id: string;
}

class UserView extends React.Component<IPageProps> {


    private goToRoot = () => {
        this.props.AppNavigator.navigate('/', {relativeToModule: true});
    };

    private goToAppRoot = () => {
        this.props.AppNavigator.navigate('/', {relativeToModule: false});
    };

    private onEdit = () => {
        this.props.AppNavigator.navigate(`/${this.props.id}/edit`, {relativeToModule: true, setOrigin: true});
    };

    public render() {
        const {user} = this.props;
        return (
            <div>
                <div className={"segment"}>
                    <h3>User View Page</h3>
                    <hr/>
                    <p>Name: {user.name}</p>
                    <button onClick={this.onEdit}>Edit User</button>
                </div>

                <div className={"segment"}>
                    <button onClick={this.goToRoot}>Go to module root</button>
                    <button onClick={this.goToAppRoot}>Go to app root</button>
                    <ModuleLink to={'/'}>Link to module root</ModuleLink>
                    <Link to={'/'}>Link to app root</Link><br/>
                </div>

            </div>
        );
    }
}

export default compose(
    withAppNavigator(),
    withProps((props: any) => ({
        id: String(props.match.params.id),
        user: getUserById(props.match.params.id)
    })),
)(UserView);
