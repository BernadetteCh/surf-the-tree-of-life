import React, { useState } from "react";
import InputField from "../Components/inputfield";

function ComListRow({ species }) {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [details, setDetails] = useState({});

  const fetchDetailsData = async (id) => {
    if (id !== undefined) {
      const response = await fetch(`http://localhost:8080/api/species/${id}`);
      const data = await response.json();
      if (!response.ok) {
        console.log(`Error: ${response.status}`);
      }
      setDetails(data);
    }
  };

  const showDetails = (e) => {
    setDisplayDetails(
      (displayDetails) => !displayDetails,
      fetchDetailsData(species.parent)
    );
  };
  const sayHi = () => {
    console.log("Hi");
  };
  const showSpeciesDetails = () => {
    return (
      <div>
        {details.name === undefined
          ? "No parent"
          : "Parent is :" +
            details.name +
            "," +
            species.extinct.toString() +
            "," +
            species._id}
        <input
          type="textarea"
          placeholder="add information to species"
          autoFocus
          onChange={sayHi}
        ></input>
      </div>
    );
  };
  return (
    <div onClick={showDetails}>
      {displayDetails === true ? showSpeciesDetails() : species.name}
    </div>
  );
}

export default ComListRow;
