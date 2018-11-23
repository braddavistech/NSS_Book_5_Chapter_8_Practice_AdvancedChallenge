import React, { Component } from "react";
import APITools from "../../modules/APITools";
import "./AnimalDetail.css"
import dog from "./DogIcon.png"


export default class AnimalDetail extends Component {
  render() {
    /*
        Using the route parameter, find the animal that the
        user clicked on by looking at the `this.props.animals`
        collection that was passed down from ApplicationViews
    */
    const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}

    return (
      <section className="indiv-animal">
        <div key={animal.id} className="indiv-animalCard">
          <img src={dog} className="indiv-icon--dog" alt="Dog Icon" />
          <h4 className="indiv-animalName">{animal.name}</h4>
          <h6 className="indiv-animalBreed">{animal.breed}</h6>
          <button id="animalDeleteButton" href="#"
            onClick={() => APITools.deleteItem("animals", animal.id)
              .then(() => this.props.history.push("/animals"))
              .then(() => this.props.refresh())}
            className="indiv-card-link">Checked Out</button>
        </div>
      </section>
    )
  }
}