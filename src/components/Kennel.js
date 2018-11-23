import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import APITools from "../modules/APITools";
import "./Kennel.css";
import "bootstrap/dist/css/bootstrap.min.css"

class Kennel extends Component {
  state = {
    showSearch: false,
    newSearch: false,
    results: [[], [], [], []]
  }

  searchResult = (searchList) => {
    this.setState({
      results: searchList
    })
    this.saveSearchResults()
  }

  refreshDelete = () => {
    let searchString = sessionStorage.getItem("searchString")
    let type = ["animals", "owners", "employees", "locations"]
    let promises = []
    type.forEach(entity => {
      promises.push(APITools.searchApiInput(searchString, entity).then(data => {
        return data
      }))
      return promises
    })
    Promise.all(promises).then(newResults => {
        this.setState({
          results: newResults
        })
      })
  }

  resetSearch = () => {
    this.setState({ newSearch: false })
  }

  saveSearchResults = () => {
    this.setState({
      showSearch: true,
      newSearch: true
    })
  }

  hideSearchValue = () => {
    this.setState({ showSearch: false })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar hide={this.hideSearchValue} search={this.saveSearchResults} save={this.searchResult} />
        <ApplicationViews kennel={this.state} hide={this.hideSearchValue} reset={this.resetSearch} refresh={this.refreshDelete}/>
      </React.Fragment>
    )
  }
}

export default Kennel