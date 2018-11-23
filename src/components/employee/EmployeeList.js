import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import APITools from "../../modules/APITools";
import "./EmployeeList.css";

class EmployeeList extends Component {
  render() {
    if (this.props.formBool) {
      return <Redirect to="/employees/new" />
    }
    return (
      <div id="ApplicationView">
        <header>CURRENT EMPLOYEES</header>
        <div className="employeeButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.addForm()
            }
            }>
            Hire Employee
                    </button>
        </div>
        {
          this.props.employees.map(employee =>
            <section className="employees" key={employee.id}>
              <div className="employeesName" >{employee.name}</div>
              <Link to={`/employees/${employee.id}`}><button className="detailsEmployee">Details</button></Link>
              <button id="deleteEmployee" href="#"
                onClick={() => APITools.deleteItem("employees", employee.id)
                  .then(() => this.props.refresh())}
              >Fire</button>
            </section>
          )
        }
      </div>
    );
  }
}

export default EmployeeList