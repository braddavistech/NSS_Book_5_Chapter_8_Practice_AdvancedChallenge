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

export default class ApplicationViews extends Component {

  state = {
    employees: [],
    locations: [],
    animals: [],
    owners: []
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
            return <AnimalList  animals={this.state.animals} owners={this.state.owners} refresh={this.getData}/>
          }} />
          <Route path="/animals/new" render={(props) => {
            return <AnimalForm {...props}
                       addAnimal={this.addAnimal}
                       employees={this.state.employees} />
          }} />
          <Route exact path="/employees" render={(props) => {
            return <EmployeeList employees={this.state.employees} refresh={this.getData}/>
          }} />
          <Route exact path="/owners" render={(props) => {
            return <OwnersList animals={this.state.animals} owners={this.state.owners} refresh={this.getData}/>
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