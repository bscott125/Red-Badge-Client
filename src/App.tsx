import React from "react";
import "./App.css";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/sitebar/Navbar";
import Ticket from "./components/films/Ticket";
import Comments from "./components/films/Comments"

type AppState = {
  sessionToken: string | null;
  updateToken: string;
};

//check for the token using lifecycle method()
//function that sets the state of the token so it can be passed down
//clear token

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      sessionToken: "",
      updateToken: "",
    };
    //  this.updateToken = this.updateToken.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token"),
      });
    }
  }

  updateToken = (newToken: string, userId: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", userId);
    this.setState({
      sessionToken: newToken,
    });
  };

  clearUserLogin = () => {
    localStorage.clear();
    this.setState({
      sessionToken: "",
    });
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Navbar
            clearUserLogin={this.clearUserLogin}
            sessionToken={this.state.sessionToken}
          />
          <Switch>
            <Route exact path="/">
              <Registration updateToken={this.updateToken} />
              <br />
              <Login updateToken={this.updateToken} />
							{ this.state.sessionToken && this.state.sessionToken !== "" ?
								<Redirect to="/main" /> : null
								} 
            </Route>
            <Route exact path="/main">
              <Ticket /> 
							<Comments />
             </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
