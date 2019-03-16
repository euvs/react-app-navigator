import * as React from 'react';
import { Route, MemoryRouter, Switch } from 'react-router-dom';

import { IAppNavigatorProps, withAppNavigator } from '../index';
import { waitForElement, fireEvent, cleanup, render } from 'react-testing-library';

const createNavBar = (action: 'navigate' | 'replace') =>
    withAppNavigator()((props: IAppNavigatorProps) => {
        const { AppNavigator } = props;
        return (
            <>
                <button onClick={() => AppNavigator[action]('/')}>Go root</button>
                <button onClick={() => AppNavigator[action]('/dashboard')}>Go dashboard</button>
                <button onClick={() => AppNavigator[action]('/user')}>Go users</button>
                <button onClick={() => AppNavigator[action]('/user/1')}>Go user1</button>
                <button onClick={() => AppNavigator[action]('/nonexist')}>Go 404</button>
            </>
        );
    });

const renderTestApp = (TestNavBar) => {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <nav>
                <TestNavBar />
            </nav>
            <main>
                <Switch>
                    <Route exact path="/" render={() => <div>Root page</div>} />
                    <Route path="/dashboard" render={() => <div>Dashboard page</div>} />
                    <Route path="/user" exact render={() => <div>Users page</div>} />
                    <Route path="/user/:id" render={({ match }) => <div>User {match.params.id}</div>} />
                    <Route path="*" render={() => <div>404</div>} />
                </Switch>
            </main>
        </MemoryRouter>
    );
};

const testSequence = [
    { buttonName: 'Go root', expectedPageText: 'Root page' }, //
    { buttonName: 'Go dashboard', expectedPageText: 'Dashboard page' },
    { buttonName: 'Go users', expectedPageText: 'Users page' },
    { buttonName: 'Go user1', expectedPageText: 'User 1' },
    { buttonName: 'Go 404', expectedPageText: '404' },
];

test('Test AppNavigator.navigate', async () => {
    const TestNavBar = createNavBar('navigate');
    const { debug, getByText } = renderTestApp(TestNavBar);

    await Promise.all(
        testSequence.map(async (seq) => {
            fireEvent.click(getByText(seq.buttonName));
            await waitForElement(() => getByText(seq.expectedPageText));
        })
    );
});

test('Test AppNavigator.replace', async () => {
    const TestNavBar = createNavBar('replace');
    const { debug, getByText } = renderTestApp(TestNavBar);

    await Promise.all(
        testSequence.map(async (seq) => {
            fireEvent.click(getByText(seq.buttonName));
            await waitForElement(() => getByText(seq.expectedPageText));
        })
    );
});

test('Test AppNavigator.navigate, origin=true', async () => {
    const TestNavBar = withAppNavigator()((props: IAppNavigatorProps) => {
        return (
            <nav>
                <button onClick={() => props.AppNavigator.navigate('/user')}>Go users</button>
                <button onClick={() => props.AppNavigator.navigate('/user/1', { setOrigin: true })}>Go user1</button>
            </nav>
        );
    });

    const UserPage = withAppNavigator()((props: IAppNavigatorProps<{ id: string }>) => {
        return (
            <div>
                <span>User={props.match.params.id}</span>
                <button onClick={() => props.AppNavigator.navigateToOrigin()}>Go to origin</button>
            </div>
        );
    });

    const TestApp = (
        <MemoryRouter initialEntries={['/user']}>
            <TestNavBar />
            <Switch>
                <Route path="/user" exact render={() => <div>Users page</div>} />
                <Route path="/user/:id" component={UserPage} />
            </Switch>
        </MemoryRouter>
    );

    const { getByText } = render(TestApp);
    // Initial page
    await waitForElement(() => getByText('Users page'));

    // Go to user 1 page
    fireEvent.click(getByText('Go user1'));
    await waitForElement(() => getByText('User=1'));

    // Go back to origin, aka users page aka initial page
    fireEvent.click(getByText('Go to origin'));
    await waitForElement(() => getByText('Users page'));
});
