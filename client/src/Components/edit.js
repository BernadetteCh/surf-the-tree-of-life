import React, { useState, useEffect } from "react";
import Table from "../Components/table";

const fetchData = async (dataSetter) => {
  return fetch("http://localhost:8080/api/species/formdata")
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      dataSetter(data);
    });
};

function Edit() {
  const [inputData, setInputData] = useState([]);

  useEffect(() => {
    fetchData(setInputData);
  }, []);

  const updateInputData = (data) => {
    console.log(data);
    setInputData(data);
  };
  console.log(inputData);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>Description:</td>
            <td>Date</td>
            <td>SelectedSpecies</td>
          </tr>
        </thead>
        <tbody>
          {inputData.map((data, index) => {
            return (
              <Table
                data={data}
                id={data._id}
                key={index}
                inputdata={inputData}
                updateInputData={updateInputData}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Edit;
