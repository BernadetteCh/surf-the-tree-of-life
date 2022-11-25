import React from "react";
import ComListRow from "./com-list-row";

function ComListSpecies({ species }) {
  const listRender = (list) => {
    return list ? (
      list.map((item, index) => {
        return (
          <li key={index}>
            <ComListRow species={item} />
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
