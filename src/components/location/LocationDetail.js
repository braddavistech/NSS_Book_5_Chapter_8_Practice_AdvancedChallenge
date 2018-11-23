import React, { Component } from "react";
import APITools from "../../modules/APITools";
import "./LocationDetail.css"

export default class LocationDetail extends Component {
  render() {

    const location = this.props.locations.find(a => a.id === parseInt(this.props.match.params.locationId)) || {}

    return (
      <section className="indiv-location">
        <div key={location.id} className="indiv-locationCard">
          <h4 className="indiv-locationName">{location.name}</h4>
          <h6 className="indiv-locationBreed">{location.address}</h6>
          <h6 className="indiv-locationBreed">{location.city}, {location.state} {location.zip}</h6>
          <h6 className="indiv-locationBreed">{location.phone}</h6>
          <button id="locationDeleteButton" href="#"
            onClick={() => APITools.deleteItem("locations", location.id)
              .then(() => this.props.history.push("/locations"))
              .then(() => this.props.refresh())}
            className="indiv-card-link">Delete</button>
        </div>
      </section>
    )
  }
}