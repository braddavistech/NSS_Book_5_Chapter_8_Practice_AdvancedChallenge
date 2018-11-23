import React, { Component } from "react"
import { Link } from "react-router-dom";
import $ from "jquery";
import APITools from "../../modules/APITools";
import SearchSuggestions from "../../modules/SearchSuggestions";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

class NavBar extends Component {
  state = {
    searchString: "",
    searchReturns: []
  }

  handleChange = () => {
    $("#navbarSearchResults").show()
    this.setState({
      searchString: this.searchInput.value
    }, () => {
      let type = ["animals", "owners", "employees", "locations"]
      let promises = []
      type.forEach(entity => {
        promises.push(APITools.searchApiInput(this.state.searchString, entity).then(data => {
          return data
        }))
      })
      Promise.all(promises)
        .then(results => {
          this.setState({
            searchReturns: results
          })
          // this.props.save(results);
        })
        .then(() => {
          return (this.state.searchReturns)
        })
    })
  }

  handleSubmit = (event) => {
    if (event.keyCode === 13) {
      sessionStorage.setItem("searchString", this.state.searchString);
      $("#navbarSearchResults").hide();
      this.props.save(this.state.searchReturns);
      // this.props.search();
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills">
          <li className="nav-item" onClick={this.props.hide}>
            <Link className="nav-link" to="/">Locations</Link>
          </li>
          <li className="nav-item" onClick={this.props.hide}>
            <Link className="nav-link" to="/animals">Animals</Link>
          </li>
          <li className="nav-item" onClick={this.props.hide}>
            <Link className="nav-link" to="/employees">Employees</Link>
          </li>
          <li className="nav-item" onClick={this.props.hide}>
            <Link className="nav-link" to="/owners">Owners</Link>
          </li>
          <li className="nav-item">
            <article id="searchInput" onKeyUp={this.handleSubmit}>
              <input type="text" id="searchText" onKeyUp={this.handleSubmit} ref={input => this.searchInput = input} onChange={this.handleChange} placeholder="Enter Search"></input>
              <SearchSuggestions searchReturns={this.state.searchReturns} />
            </article>

          </li>
        </ul>
      </nav>
    )
  }

}

export default NavBar