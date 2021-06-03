import { Switch, Route } from 'react-router-dom'

import './App.css';
import HomePage from './pages/homepage/homepage.component';

const HatsPage = () => (
  <div>
    <h1>HATS PAGE</h1>
  </div>
);


const JacketsPage = () => (
  <div>
    <h1>Jackets PAGE</h1>
  </div>
);

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/home/' component={HomePage} />
        <Route path='/home/shop/hats' component={HatsPage} />
        <Route path='/shop/jackets' component={JacketsPage} />
      </Switch>
    </div>
  );
}

export default App;
