import React from "react";

function Table({ data, id, updateInputData }) {
  const deleteInput = async (e) => {
    const response = await fetch(
      `http://localhost:8080/api/species/formdata/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    if (!response.ok) {
      console.log(`Error${response.status}`);
    }

    const newData = data.filter((dat) => {
      if (dat._id !== id) {
        return true;
      } else {
        return false;
      }
    });
    updateInputData(newData);
  };
  return (
    <tr>
      <td>{data.name}</td>
      <td>{data.description}</td>
      <td>{data.date}</td>
      <td>{data.option}</td>
      <button onClick={deleteInput}>Delete</button>
    </tr>
  );
}
export default Table;
