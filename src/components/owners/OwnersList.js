import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import APITools from "../../modules/APITools";
import "./OwnersList.css";

class OwnersList extends Component {
  render() {
    if (this.props.formBool) {
      return <Redirect to="/owners/new" />
    }
    return (
      <div id="ApplicationView" >
        <header>ANIMAL OWNERS</header>
        <div className="ownerButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.addForm()
            }
            }>
            Register Owner
                    </button>
        </div>
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