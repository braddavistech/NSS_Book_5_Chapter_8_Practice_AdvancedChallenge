import React, { Component } from 'react';
import { Link } from "react-router-dom";
import dog from "../animals/DogIcon.png";
import APITools from "../../modules/APITools";
import "./SearchList.css";

export default class SearchPrint extends Component {
  state = {
    animals: [],
    owners: [],
    locations: [],
    employees: [],
    searchString: "",
  }

  animalTitle() {
    let animal = this.props.kennel[0].length;
    if (animal > 1) {
      return <div><h1 className="sectionTitles">ANIMAL RESULTS</h1><h1 className="numberOfResults">Showing {animal} results for animals.</h1></div>
    } else if (animal === 1) {
      return <div><h1 className="sectionTitles">ANIMAL RESULTS</h1><h1 className="numberOfResults">Showing {animal} result for animals.</h1></div>
    } else { return <div></div> }
  }

  ownerTitle() {
    let owner = this.props.kennel[1].length
    if (owner > 1) {
      return <div><h1 className="sectionTitles">OWNER RESULTS</h1><h1 className="numberOfResults">Showing {owner} results for owners.</h1></div>
    } else if (owner=== 1) {
      return <div><h1 className="sectionTitles">OWNER RESULTS</h1><h1 className="numberOfResults">Showing {owner} result for owners.</h1></div>
    } else { return <div></div> }
  }

  employeeTitle() {
    let employee = this.props.kennel[2].length
    if ( employee > 1) {
      return <div><h1 className="sectionTitles">EMPLOYEE RESULTS</h1><h1 className="numberOfResults">Showing {employee} results for employees.</h1></div>
    } else if (employee === 1) {
      return <div><h1 className="sectionTitles">EMPLOYEE RESULTS</h1><h1 className="numberOfResults">Showing {employee} result for employees.</h1></div>
    } else { return <div></div> }
  }

  locationTitle() {
    let location = this.props.kennel[3].length
    if (location > 1) {
      return <div><h1 className="sectionTitles">LOCATION RESULTS</h1><h1 className="numberOfResults">Showing {location} results for locations.</h1></div>
    } else if (location === 1) {
      return <div><h1 className="sectionTitles">LOCATION RESULTS</h1><h1 className="numberOfResults">Showing {location} result for locations.</h1></div>
    } else { return <div></div> }
  }

  render() {
    let searchString = sessionStorage.getItem("searchString")
    let animalString = this.animalTitle();
    let animals = this.props.kennel[0];
    let ownerString = this.ownerTitle();
    let owners = this.props.kennel[1];
    let employeeString = this.employeeTitle();
    let employees = this.props.kennel[2];
    let locationString = this.locationTitle();
    let locations = this.props.kennel[3];

    return (

      <div id="fullSearch">
        <header id="mainSearchTitle">SEARCH RESULTS</header>
        <h1 id="resultsTitle">Results for " {searchString} " </h1>
        {animalString}
        {
          animals.map(animal => (
            <div key={animal.id} id={`a${animal.id}`} className="animalCard">
              <img src={dog} className="icon--dog" alt="Dog Icon" />
              <h4 className="name">{animal.name}</h4>
              <Link to={`/animals/${animal.id}`}>
                <button className="detailsLink" onClick={this.props.hide}>Details</button>
              </Link>
              <button id="deleteButton" href="#"
                onClick={() => APITools.deleteItem("animals", animal.id)
                  .then(() => this.props.deletedItem())}
              >Delete</button>
            </div>
          ))
        }
        {ownerString}
        {
          owners.map(owner => (
            <div key={owner.id} id={`o${owner.id}`} className="otherCard">
              <h2 className="name">{owner.name}</h2>
              <Link to={`/owners/${owner.id}`}>
                <button className="detailsLink" onClick={this.props.hide}>Details</button>
              </Link>
              <button id="deleteButton" href="#"
                onClick={() => APITools.deleteItem("owners", owner.id)
                  .then(() => this.props.deletedItem())}
              >Delete</button>
            </div>
          ))
        }
        {employeeString}
        {
          employees.map(employee => (
            <div key={employee.id} id={`e${employee.id}`} className="otherCard">
              <h2 className="name">{employee.name}</h2>
              <Link to={`/employees/${employee.id}`}>
                <button className="detailsLink" onClick={this.props.hide}>Details</button>
              </Link>
              <button id="deleteButton" href="#"
                onClick={() => APITools.deleteItem("employees", employee.id)
                  .then(() => this.props.deletedItem())}
              >Delete</button>
            </div>
          ))
        }
        {locationString}
        {
          locations.map(location => (
            <div key={location.id} id={`l${location.id}`} className="otherCard">
              <h2 className="name">{location.name}</h2>
              <Link to={`/locations/${location.id}`}>
                <button className="detailsLink" onClick={this.props.hide}>Details</button>
              </Link>
              <button id="deleteButton" href="#"
                onClick={() => APITools.deleteItem("locations", location.id)
                  .then(() => this.props.deletedItem())}
              >Delete</button>
            </div>
          ))
        }
      </div>
    )
  }
}