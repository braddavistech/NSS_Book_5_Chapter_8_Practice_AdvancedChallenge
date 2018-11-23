import React, { Component } from "react";
// import APITools from "../../modules/APITools";
import { Redirect } from "react-router-dom";
import "./Animal.css";

class AnimalForm extends Component {
    // Set initial state
    state = {
        animalName: "",
        breed: "",
        employee: ""
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
    constructNewAnimal = evt => {
        evt.preventDefault()
        if (this.state.animal === "") {
            window.alert("Please select a caretaker")
        } else {
            const animal = {
                name: this.state.animalName,
                breed: this.state.breed,
                key: 3,
                employeeId: this.props.employees.find(e => e.name === this.state.employee).id
            }

            // Create the animal and redirect user to animal list
            this.props.addPet(animal)
            // .then(data => this.props.stop())
            // this.props.stop
            // .then(() => this.returnToAnimals())
        }
    }

    render() {
        if (this.props.backToList) {
          return <Redirect to="/animals" />
        }
        return (
            <React.Fragment>
                <form className="animalForm">
                    <header>ADMIT NEW ANIMAL</header>
                    <div className="form-group">
                        <label htmlFor="animalName">Animal Name</label>
                        <input type="text" required={true}
                               className="animalFormInput"
                               onChange={this.handleFieldChange}
                               id="animalName"
                               placeholder="Enter Animal Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="breed">Breed</label>
                        <input type="text" required={true}
                               className="animalFormInput"
                               onChange={this.handleFieldChange}
                               id="breed" placeholder="Enter Animal Breed" />
                    </div>
                    <div className="selectCaretaker">
                        <label htmlFor="employee">Assign to caretaker</label>
                        <select defaultValue="" name="employee" id="employee"
                                onChange={this.handleFieldChange}>
                            <option value="">Select an employee</option>
                        {
                            this.props.employees.map(e => <option key={e.id} id={e.id}>{e.name}</option>)
                        }
                        </select>
                    </div>
                    <button type="submit" onClick={this.constructNewAnimal} className="button">Submit</button>
                </form>
                <button type="back" onClick={this.props.stop} className="button">Back</button>
            </React.Fragment>
        )
    }
}

export default AnimalForm