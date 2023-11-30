import React from 'react';
import HomePage1 from './Homepage/HomePage1';
import Header from './Component/Header';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Help from './Homepage/Help';
import Contact from './Homepage/Contact';
import Carts from './Homepage/Carts';
//import Payment from './Homepage/Payment';
//import Account from './Homepage/Account';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='Home'>
          <Switch>
            <Route exact path="/">
              <HomePage1 />
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            {/*<Route exact path="/account">
              <Account />
            </Route>*/}
            <Route exact path="/carts">
              <Carts />
            </Route>
            {/*<Route exact path="/payment">
              <Payment />
            </Route>*/}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
