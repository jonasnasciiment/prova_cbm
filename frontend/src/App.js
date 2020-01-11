import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons';
import Index from "./Components";
import Edit from "./Components/edit";
import View from "./Components/view";
import Delete from "./Components/delete";
library.add(fab, faCheckSquare, faCoffee);


function App() {
    return (
        <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Index}  />
              <Route path="/view" component={View}  />
              <Route path="/edit/:id" component={Edit}  />
              <Route path="/delete" component={Delete}  />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
