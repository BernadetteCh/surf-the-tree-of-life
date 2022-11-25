import React, { useState } from "react";

function ComListSpecies({ species, fetchDetails }) {
  const listRender = (list) => {
    return list ? (
      list.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              fetchDetails(item._id);
            }}
          >
            {item.name}
          </li>
        );
      })
    ) : (
      <p> loading</p>
    );
  };

  return <div>{listRender(species)}</div>;
}

export default ComListSpecies;
