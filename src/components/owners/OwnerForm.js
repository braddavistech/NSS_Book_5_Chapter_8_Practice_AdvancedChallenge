import React, { Component } from "react";
// import APITools from "../../modules/APITools";
import { Redirect } from "react-router-dom";
import "./Owner.css";

class OwnerForm extends Component {
  // Set initial state
  state = {
    name: "",
    phone: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  /*  Local method for validation, creating animal object, and
    invoking the function reference passed from parent component
 */
  constructNewOwner = evt => {
    evt.preventDefault()
    if (this.state.owner === "") {
      window.alert("Please select a caretaker")
    } else {
      const owner = {
        name: this.state.ownerName,
        phone: this.state.phone,
        key: 1,
      }

      // Create the animal and redirect user to animal list
      this.props.addOwner(owner)
      // .then(data => this.props.stop())
      // this.props.stop
      // .then(() => this.returnToAnimals())
    }
  }

  render() {
    if (this.props.backToList) {
      return <Redirect to="/owners" />
    }
    return (
      <React.Fragment>
        <form className="ownerForm">
          <header>REGISTER NEW OWNER</header>
          <div className="form-group">
            <label htmlFor="ownerName">Owner Name</label>
            <input type="text" required={true}
              className="ownerFormInput"
              onChange={this.handleFieldChange}
              id="ownerName"
              placeholder="Enter Owner Name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" required={true}
              className="ownerFormInput"
              onChange={this.handleFieldChange}
              id="phone" placeholder="Enter Phone Number" />
          </div>
          <button type="submit" onClick={this.constructNewOwner} className="button">Submit</button>
        </form>
        <button type="back" onClick={this.props.stop} className="button">Back</button>
      </React.Fragment>
    )
  }
}

export default OwnerForm