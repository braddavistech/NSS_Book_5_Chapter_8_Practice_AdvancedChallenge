import React, { Component } from "react";
import { Link } from "react-router-dom";
import APITools from "../../modules/APITools";
import "./OwnersList.css";

class OwnersList extends Component {
  render() {
    return (
      <div id="ApplicationView" >
        <header>ANIMAL OWNERS</header>
        {
          this.props.owners.map(owner =>
            < section className="owners" key={owner.id} >
              <h4>{owner.name}</h4>
              <Link to={`/owners/${owner.id}`}><button className="detailsOwner">Details</button></Link>
              <button id="deleteButton" href="#"
                onClick={() => APITools.deleteItem("owners", owner.id)
                  .then(() => this.props.refresh())}
                className="card-link">Remove</button>
            </section>
          )
        }
      </div >
    )
  }
}





export default OwnersList