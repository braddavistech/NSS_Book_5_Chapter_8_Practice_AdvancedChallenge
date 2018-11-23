import React, { Component } from "react";
import { Link } from "react-router-dom";
import APITools from "../../modules/APITools";
import "./LocationList.css";


class LocationList extends Component {
  render() {
    return (
      <div id="ApplicationView">
        <header>KENNEL LOCATIONS</header>
        {
          this.props.locations.map(location =>
            <section className="address" key={location.id}>
              <h4>{location.name}</h4>
              <Link to={`/locations/${location.id}`}><button className="detailsLocation">Details</button></Link>
              <button id="deleteLocation" href="#"
                onClick={() => APITools.deleteItem("locations", location.id)
                  .then(() => this.props.refresh())}
                className="card-link">Delete</button>
            </section>)
        }
      </div>
    )
  }
}

export default LocationList