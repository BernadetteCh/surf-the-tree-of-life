import React, { useState, useEffect } from "react";
import Option from "../Components/option-list";

const fetchSpecies = (dataSetter) => {
  return fetch("http://localhost:8080/api/species/").then((res) =>
    res.json().then((data) => dataSetter(data))
  );
};

function Form() {
  const [species, setSpecies] = useState();
  const [inputData, setInputData] = useState({
    name: "",
    option: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    fetchSpecies(setSpecies);
  }, []);

  const saveValue = (e) => {
    console.log(e.target.name);
    setInputData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const saveData = async () => {
    const response = await fetch(
      "http://localhost:8080/api/species/create/post/field",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(inputData),
      }
    );

    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }
    setInputData({
      name: "",
      option: "",
      date: "",
      description: "",
    });
  };

  return (
    <div>
      <h1>Species Form</h1>
      <form>
        <label>Name:</label>
        <input name="name" type="text" onChange={saveValue}></input>
        <br />
        <select name="option" id="record" onChange={saveValue}>
          <option defaultValue="select">Select</option>
          {species !== undefined
            ? species.map((species) => {
                return <Option value={species.name} name={species.name} />;
              })
            : console.log("...loading")}
        </select>
        <br />
        <input name="date" type="date" onChange={saveValue}></input>
        <br />
        <textarea name="description" onChange={saveValue}></textarea>
      </form>
      <button type="submit" onClick={saveData}>
        Save
      </button>
    </div>
  );
}

export default Form;
