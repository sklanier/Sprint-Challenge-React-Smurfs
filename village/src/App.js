import React, { Component } from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import Smurf from "./components/Smurf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err, "this error");
      });
  }

  addSmurf = (e, obj) => {
    e.preventDefault();
    axios
      .post("http://localhost:3333/smurfs", obj)
      .then(res => {
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteSmurf = id => {
    axios
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        console.log("success delete");
        this.setState({ smurfs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  updateSmurf = id => {
    axios
      .put(`http://localhost:3333/smurfs/${id}`, id)
        .then(res => {
          this.setState({smurfs: res.data})
        })
        .catch(err => console.log(err))
  }

  render() {
    return (
      <div className="App">
        <ul className="navbar">
          <li>
            <NavLink exact to="/" activeClassName="activeNavButton">
              Smurfs
            </NavLink>
          </li>
          <li>
            <NavLink to="/smurf-form" activeClassName="activeNavButton">
              Add a New Smurf
            </NavLink>
          </li>
        </ul>

        <Route
          path="/smurf-form"
          render={() => (
            <SmurfForm smurfs={this.state.smurfs} addSmurf={this.addSmurf} updateSmurf={this.updateSmurf} />
          )}
        />
        <Route
          path="/smurfs/:id"
          render={() => (
            <Smurf smurfs={this.state.smurfs}  updateSmurf={this.updateSmurf} />
          )} 
        />
        <Route
          exact
          path="/"
          render={() => (
          <Smurfs smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} />
          )}
        />
        </div>
     
    );
  }
}

export default App;