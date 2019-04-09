import React, { Component } from "react";

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      height: ""
    };
  }
  

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  add = (e, obj) => {
    e.preventDefault();
    this.props.addSmurf(e, obj)
    this.setState({name: '', age: '', height: ''})
  }

  render() {
    return (
      <div className="SmurfFormStyles">
        <form updateSmurf={this.props.updateSmurf}
          onSubmit={e =>
            this.add(e, {
              name: this.state.name,
              age: this.state.age,
              height: this.state.height
            }) 
          }
        ><br></br>
          <div className="container">
            <input
              onChange={this.handleInputChange}
              placeholder="who's da new smurf?"
              required
              value={this.state.name}
              name="name"
            />
          </div>
          <br></br>
          <div className="container">
            <input
              onChange={this.handleInputChange}
              type="text"
              placeholder="how old is dis smurf?"
              required
              value={this.state.age}
              name="age"
            />
          </div>
          <br></br>
          <div className="container">
            <input
              onChange={this.handleInputChange}
              placeholder="how tall is dis smurf?"
              type="text"
              required
              value={this.state.height}
              name="height"
            />
          </div>
          <br></br>
          <div className="button"><input type="submit" value="Add to the village" /></div>
        </form>
      </div>
    );
  }
}

export default SmurfForm;