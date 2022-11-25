import React, { useState } from "react";

function ComListRow({ species }) {
  const [displayDetails, setDisplayDetails] = useState(false);
  const [details, setDetails] = useState({});

  const fetchDetailsData = async (id) => {
    const response = await fetch(`http://localhost:8080/api/species/${id}`);
    const data = await response.json();
    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
    setDetails(data);
  };

  const showDetails = (e) => {
    setDisplayDetails(true, fetchDetailsData(species.parent));
  };

  return (
    <div onClick={showDetails}>
      {displayDetails === true
        ? species.name +
          "," +
          details.name +
          "," +
          species.extinct.toString() +
          "," +
          species._id
        : species.name}
    </div>
  );
}

export default ComListRow;
