import React from "react";

function Option({ value, name, selectedOption }) {
  return <option value={value}>{name}</option>;
}

export default Option;
