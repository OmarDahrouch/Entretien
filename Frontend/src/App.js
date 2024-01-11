// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './Pages/StudentList';
import CreateStudent from './Pages/CreateStudent';
import EditStudent from './Pages/EditStudent';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <StudentList />
          </Route>
          <Route path="/create" exact>
            <CreateStudent />
          </Route>
          <Route path="/edit/:id" exact>
            <EditStudent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
