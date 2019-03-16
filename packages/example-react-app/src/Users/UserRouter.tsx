import * as React from 'react';

import List from './User.List';
import View from './User.View';
import Edit from './User.Edit';
import {ModuleRoot, ModuleRoute, ModuleSwitch} from '@euvs/react-app-navigator';


export default class extends React.Component<any> {

    public render() {
        return (
            <ModuleRoot>
                <div className={"segment"} style={{backgroundColor: "#fcf5eb"}}>
                    <h2>User Module</h2>
                    <ModuleSwitch>
                        <ModuleRoute path={'/'} exact component={List}/>
                        <ModuleRoute path={`/:id/edit`} component={Edit}/>
                        <ModuleRoute path={`/:id`} component={View}/>
                    </ModuleSwitch>
                </div>
            </ModuleRoot>
        );
    }
}
