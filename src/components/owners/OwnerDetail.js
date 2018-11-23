import React, { Component } from "react";
import APITools from "../../modules/APITools";
import "./OwnerDetail.css";

export default class OwnerDetail extends Component {
  render() {

    const owner = this.props.owners.find(a => a.id === parseInt(this.props.match.params.ownerId)) || {}

    return (
      <section className="indiv-owner">
        <div key={owner.id} className="indiv-ownerCard">
          <h4 className="indiv-ownerName">{owner.name}</h4>
          <h6 className="indiv-ownerBreed">{owner.phone}</h6>
          <button id="ownerDeleteButton" href="#"
            onClick={() => APITools.deleteItem("owners", owner.id)
              .then(() => this.props.history.push("/owners"))
              .then(() => this.props.refresh())}
            className="indiv-card-link">Remove</button>
        </div>
      </section>
    )
  }
}