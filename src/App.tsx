import React from 'react';
import styles from './App.module.css';
import { HomePage, Register, SignIn, DetailPage } from './pages';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/signin' component={SignIn} />
          <Route path='/detail/:touristRouteId' component={DetailPage} />
          <Route path='/' exact component={HomePage} />
          <Route render={() => <h1>404 not found</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
