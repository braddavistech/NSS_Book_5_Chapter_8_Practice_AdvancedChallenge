import React, { Component } from "react";
// import APITools from "../../modules/APITools";
import { Redirect } from "react-router-dom";
import "./Employee.css";

class EmployeeForm extends Component {
  // Set initial state
  state = {
    name: "",
    phone: "",
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
  constructNewEmployee = evt => {
    evt.preventDefault()
    if (this.state.employee === "") {
      window.alert("Please select a caretaker")
    } else {
      const employee = {
        name: this.state.employeeName,
        phone: this.state.phone,
        key: 1,
      }

      // Create the animal and redirect user to animal list
      this.props.addEmployee(employee)
      // .then(data => this.props.stop())
      // this.props.stop
      // .then(() => this.returnToAnimals())
    }
  }

  render() {
    if (this.props.backToList) {
      return <Redirect to="/employees" />
    }
    return (
      <React.Fragment>
        <form className="employeeForm">
          <header>HIRE NEW EMPLOYEE</header>
          <div className="form-group">
            <label htmlFor="employeeName">Employee Name</label>
            <input type="text" required={true}
              className="employeeFormInput"
              onChange={this.handleFieldChange}
              id="employeeName"
              placeholder="Enter Employee Name" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" required={true}
              className="employeeFormInput"
              onChange={this.handleFieldChange}
              id="phone" placeholder="Enter Phone Number" />
          </div>
          <button type="submit" onClick={this.constructNewEmployee} className="button">Submit</button>
        </form>
        <button type="back" onClick={this.props.stop} className="button">Back</button>
      </React.Fragment>
    )
  }
}

export default EmployeeForm