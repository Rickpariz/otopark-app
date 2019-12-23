import React from 'react';
import { createBrowserHistory } from 'history';
import TemplateAdmin from './components/dashboards/TemplateAdmin';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import LoginParking from './components/LoginParking';
import TemplateUsers from './components/dashboards/TemplateUsers';
import Guaranty from './components/guaranty/Guaranty';

const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path='/' render={() => {
                    return (<Redirect to='/login' />)
                }} />

                <Route exact path="/login" component={Login} />
                <Route exact path="/login/estacionamentos" component={LoginParking} />
                <Route path="/admin/dashboard" component={TemplateAdmin} />
                <Route path="/dashboard" component={TemplateUsers} />
                <Route path="/comprovantedigital/:parkingId" component={Guaranty} />
            </Switch>
        </Router>
    );
}

export default App;
