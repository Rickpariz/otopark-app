import React from 'react';
import { createBrowserHistory } from 'history';
import TemplateAdmin from './components/dashboards/TemplateAdmin';
import { Router, Route } from 'react-router-dom';

const history = createBrowserHistory();

function App() {
    return (
        <Router history={history}>
            <Route path="/admin/dashboard" component={TemplateAdmin} />
        </Router>
    );
}

export default App;
