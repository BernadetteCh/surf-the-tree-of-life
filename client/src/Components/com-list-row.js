import React, { useState } from "react";
import InputField from "../Components/inputfield";

function ComListRow({ species }) {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [details, setDetails] = useState({});
  const [comment, setComment] = useState({ comment: "" });

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

  const sayHi = (e) => {
    setComment((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const sendComment = async () => {
    const id = species._id;
    const response = await fetch(
      `http://localhost:8080/api/species/comment/${id}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          comment,
        }),
      }
    );
    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
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
          name="comment"
          onChange={sayHi}
        ></input>
        <button onClick={sendComment}>Add comment</button>
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