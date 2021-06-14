
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (

    <Router>
      <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
      </div>
    </Router>

  );
}

function Home(){
  return(<div> this is home page</div>)
}
function About(){
  return(<div> this is about page</div>)
}

function Contact(){
  return(<div>this is contact page</div>)
}

export default App;
