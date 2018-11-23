import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animals/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnersList from './owners/OwnersList'
import SearchPrint from './searchList'
import APITools from '../modules/APITools'
import AnimalDetail from './animals/AnimalDetail'
import OwnerDetail from "./owners/OwnerDetail";
import EmployeeDetail from "./employee/EmployeeDetail";
import LocationDetail from "./location/LocationDetail";
import AnimalForm from "./animals/AnimalForm";
import OwnerForm from "./owners/OwnerForm";
import EmployeeForm from "./employee/EmployeeForm";

export default class ApplicationViews extends Component {

  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: [],
    animalRedirectForm: false,
    animalBackToList: true,
    employeeRedirectForm: false,
    employeeBackToList: true,
    ownerRedirectForm: false,
    ownerBackToList: true
  }

  stopPetForm = () => {
    this.setState({animalRedirectForm: false, animalBackToList: true})
  }
  addPetForm = () => {
    this.setState({animalRedirectForm: true, animalBackToList: false})
  }
  addAnimal = (animal) => {
    APITools.post("animals", animal)
    .then(() => APITools.getAll("animals"))
    .then(animals => this.setState({animals: animals, animalRedirectForm: false, animalBackToList:true}))
  }

  stopOwnerForm = () => {
    this.setState({ownerRedirectForm: false, ownerBackToList: true})
  }
  addOwnerForm = () => {
    this.setState({ownerRedirectForm: true, ownerBackToList: false})
  }
  addOwner = (owner) => {
    APITools.post("owners", owner)
    .then(() => APITools.getAll("owners"))
    .then(owners => this.setState({owners: owners, ownerRedirectForm: false, ownerBackToList:true}))
  }

  stopEmployeeForm = () => {
    this.setState({employeeRedirectForm: false, employeeBackToList: true})
  }
  addEmployeeForm = () => {
    this.setState({employeeRedirectForm: true, employeeBackToList: false})
  }
  addEmployee = (employee) => {
    APITools.post("employees", employee)
    .then(() => APITools.getAll("employees"))
    .then(employees => this.setState({employees: employees, employeeRedirectForm: false, employeeBackToList:true}))
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    APITools.getAll("animals").then(animals => this.setState({animals: animals}))
      .then(() => APITools.getAll("owners")).then(owners => this.setState({owners: owners}))
      .then(() => APITools.getAll("employees")).then(employees => this.setState({employees: employees}))
      .then(() => APITools.getAll("locations")).then(locations => this.setState({locations: locations}))
  }


  render() {
    if (this.props.kennel.showSearch) {
      return <SearchPrint hide={this.props.hide} refresh={this.getData} deletedItem={this.props.refresh} reset={this.props.reset} kennel={this.props.kennel.results} />
    } else {
      return (
        <React.Fragment>
          <Route exact path="/" render={(props) => {
            return <LocationList locations={this.state.locations} refresh={this.getData}/>
          }} />
          <Route exact path="/animals" render={(props) => {
            return <AnimalList addForm={this.addPetForm} formBool={this.state.animalRedirectForm} animals={this.state.animals} owners={this.state.owners} refresh={this.getData}/>
          }} />
          <Route exact path="/animals/new"
          render={(props) => {
            return <AnimalForm addPet={this.addAnimal}
            backToList={this.state.animalBackToList}
            stop={this.stopPetForm}
            employees={this.state.employees} />
          }} />
          <Route exact path="/employees" render={(props) => {
            return <EmployeeList addForm={this.addEmployeeForm} formBool={this.state.employeeRedirectForm} employees={this.state.employees} refresh={this.getData}/>
          }} />
          <Route exact path="/employees/new"
          render={(props) => {
            return <EmployeeForm addEmployee={this.addEmployee}
            backToList={this.state.employeeBackToList}
            stop={this.stopEmployeeForm}
            employees={this.state.employees} />
          }} />
          <Route exact path="/owners" render={(props) => {
            return <OwnersList addForm={this.addOwnerForm} animals={this.state.animals} formBool={this.state.ownerRedirectForm} owners={this.state.owners} refresh={this.getData}/>
          }} />
          <Route exact path="/owners/new"
          render={(props) => {
            return <OwnerForm addOwner={this.addOwner}
            backToList={this.state.ownerBackToList}
            stop={this.stopOwnerForm}
            employees={this.state.employees} />
          }} />
          <Route path="/animals/:animalId(\d+)" render={(props) => {
            return <AnimalDetail {...props} animals={this.state.animals} refresh={this.getData}/>
          }} />
          <Route path="/owners/:ownerId(\d+)" render={(props) => {
            return <OwnerDetail {...props} owners={this.state.owners} refresh={this.getData}/>
          }} />
          <Route path="/employees/:employeeId(\d+)" render={(props) => {
            return <EmployeeDetail {...props} employees={this.state.employees} refresh={this.getData}/>
          }} />
          <Route path="/locations/:locationId(\d+)" render={(props) => {
            return <LocationDetail {...props} locations={this.state.locations} refresh={this.getData}/>
          }} />

        </React.Fragment>
      )
    }
  }


}