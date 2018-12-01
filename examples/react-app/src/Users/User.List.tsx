import * as React from 'react';

import {compose, withProps} from 'recompose';
import {Link} from 'react-router-dom';

import {withAppNavigator, IAppNavigatorProps, ModuleLink} from '@euvs/react-app-navigator';
import {getUsers} from "./users";

interface IPageProps extends IAppNavigatorProps {
    users: any[];
}

class UserList extends React.Component<IPageProps> {

    private onView = (id: string) => {
        this.props.AppNavigator.navigate(`/${id}`, {relativeToModule: true});
    }

    public render() {
        const {users} = this.props;
        return (
            <div className={"segment"}>
                <h3>User List Page</h3>
                <hr/>
                <ul>
                    {users.map((user) => {
                        return <li key={user.id}>
                            <ModuleLink to={`/${user.id}`} style={{width:"100px", display:"inline-block"}}>{user.name}</ModuleLink>
                            {'   '}
                            <button onClick={() => {this.onView(user.id)}}>Details</button>
                        </li>;
                    })
                    }
                </ul>
            </div>
        );
    }
}

export default compose(
    withProps(() => ({
        users: getUsers()
    })),
    withAppNavigator(),
)(UserList);
