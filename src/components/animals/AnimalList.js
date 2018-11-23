import React, { Component } from 'react';
import { Link } from "react-router-dom";
import APITools from "../../modules/APITools";
import "./AnimalList.css";
import dog from "./DogIcon.png"


class AnimalList extends Component {
  render() {

    return (
      <div id="ApplicationView">
        <header>CURRENT ANIMALS</header>
        <div className="animalButton">
          <button type="button"
            className="btn btn-success"
            onClick={() => {
              this.props.history.push("/animals/new")
            }
            }>
            Admit Animal
                    </button>
        </div>
        {
          this.props.animals.map(animal =>
            <div key={animal.id} className="animalCard">
              <div className="card-body">
                <h5 >
                  <img src={dog} className="icon--dog" alt="Dog Icon" />
                  <Link className="nav-link" to={`/animals/${animal.id}`}><button className="detailsAnimal">Details</button></Link>
                  <button id="deleteAnimal" href="#"
                    onClick={() => APITools.deleteItem("animals", animal.id)
                      .then(() => this.props.refresh())}
                    className="card-link">Checked Out</button>
                </h5>
                <h4>{animal.name}</h4>
                <h5>{animal.breed}</h5>
              </div>
            </div>
          )
        }
      </div>
    )
  }


}


export default AnimalList