import React, { useState, useEffect } from "react";
import Option from "../Components/option-list";

const fetchSpecies = (dataSetter) => {
  return fetch("http://localhost:8080/api/species/").then((res) =>
    res.json().then((data) => dataSetter(data))
  );
};

const fetchDangerLevels = (dataSetter) => {
  return fetch("http://localhost:8080/api/species/dangerLevel")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      dataSetter(data);
    });
};

function Form() {
  const [species, setSpecies] = useState();
  const [dangerLevelData, setDangerLevelData] = useState();
  const [inputData, setInputData] = useState({
    name: "",
    option: "",
    date: "",
    description: "",
  });
  const [dangerLevel, setDangerLevel] = useState("");

  useEffect(() => {
    fetchSpecies(setSpecies);
    fetchDangerLevels(setDangerLevelData);
  }, []);

  const saveValue = (e) => {
    console.log(e.target.name);
    setInputData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const selectDangerLevel = (e) => {
    setDangerLevel(e.target.value);
  };

  const saveData = async (e) => {
    const response = await fetch(
      "http://localhost:8080/api/species/create/post/field",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ inputData, dangerLevel: dangerLevel }),
      }
    );

    if (!response.ok) {
      console.log(`Error: ${response.status}`);
    }

    if (saveData !== "") {
      setInputData({
        name: "",
        option: "",
        date: "",
        description: "",
      });
    }
  };
  console.log(dangerLevelData);
  return (
    <div>
      <h1>Species Form</h1>
      <form>
        <label>Name:</label>
        <input
          value={inputData.name}
          name="name"
          type="text"
          onChange={saveValue}
        ></input>
        <br />
        <select name="option" id="record" onChange={saveValue}>
          <option defaultValue="select">Select</option>
          {species !== undefined
            ? species.map((species) => {
                // console.log(species);
                return (
                  <Option
                    value={species.name}
                    name={species.name}
                    key={species._id}
                  />
                );
              })
            : console.log("...loading")}
        </select>
        <h2>DangerLevels</h2>
        <select name="dangerLeveloption" onChange={selectDangerLevel}>
          <option defaultValue="select">Select</option>
          {dangerLevelData !== undefined
            ? dangerLevelData.map((dangerLevel) => {
                return (
                  <Option
                    value={dangerLevel.name}
                    name={dangerLevel.name}
                    key={dangerLevel.level}
                  />
                );
              })
            : console.log("...loading")}
        </select>
        <br />
        <input
          value={inputData.date}
          name="date"
          type="date"
          onChange={saveValue}
        ></input>
        <br />
        <textarea
          value={inputData.description}
          name="description"
          onChange={saveValue}
        ></textarea>
      </form>
      <button type="submit" onClick={saveData}>
        Save
      </button>
    </div>
  );
}

export default Form;
