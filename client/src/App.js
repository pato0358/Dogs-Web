import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DogCreate from './components/DogCreate'
import Home from './components/Home'
import Details from './components/Details';
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.app}>
  
    <BrowserRouter>
    <div>
      <Switch >
    <Route exact path= '/' component = {LandingPage}/>
    <Route exact path= '/dog' component = {DogCreate}/>
    <Route path= '/details/:id' component = {Details}/>
    <Route path= '/home' component = {Home}/>
      </Switch>
         </div>
    </BrowserRouter>
    </div>
  

  );
}

export default App;
