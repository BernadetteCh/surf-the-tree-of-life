import React, { useEffect, useState } from "react";
import ComListSpecies from "../Components/com-list-species";

const fetchSpecies = (dataSetter) => {
  return fetch("http://localhost:8080/api/species/").then((res) =>
    res.json().then((data) => dataSetter(data))
  );
};

const sendInput = (search, setSpecies) => {
  return fetch("http://localhost:8080/api/species/search", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      search,
    }),
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      setSpecies(data);
    });
};

const PageHome = () => {
  const [species, setSpecies] = useState();
  const [search, setSearch] = useState("");
  // const [details, setDetails] = useState({});

  useEffect(() => {
    fetchSpecies(setSpecies);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      sendInput(search, setSpecies);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const searchSpecies = (e) => {
    setSearch(e.target.value);
  };

  // const fetchDetailsData = async (id) => {
  //   const response = await fetch(`http://localhost:8000/api/species/${id}`);
  //   const data = await response.json();
  //   if (!response.ok) {
  //     console.log(`Error: ${response.status}`);
  //   }

  //   setDisplayDetails(true, setDetails(data));
  // };

  return (
    <div>
      <h1>Welcome to Tree Of Life Project</h1>
      <input type="text" value={search} onChange={searchSpecies}></input>
      <ComListSpecies species={species}></ComListSpecies>
    </div>
  );
};

export default PageHome;

// import React, { useEffect, useState } from "react";
// import ComListSpecies from "../Components/com-list-species";

// const fetchSpecies = (dataSetter) => {
//   return fetch("http://localhost:8080/api/species/").then((res) =>
//     res
//       .json()
//       .then((data) => this.parseData(data))
//       .then((data) => {
//         dataSetter(data);
//       })
//   );
// };

// const sendInput = (search, setSpecies) => {
//   return fetch("http://localhost:8080/api/species/search", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       search,
//     }),
//   })
//     .then((result) => {
//       return result.json();
//     })
//     .then((data) => {
//       setSpecies(data);
//     });
// };

// const PageHome = () => {
//   const [species, setSpecies] = useState();
//   const [search, setSearch] = useState("");
//   // const [details, setDetails] = useState({});

//   useEffect(() => {
//     fetchSpecies(setSpecies);
//   }, []);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       sendInput(search, setSpecies);
//     }, 500);

//     return () => clearTimeout(timer);
//   }, [search]);

//   const searchSpecies = (e) => {
//     setSearch(e.target.value);
//   };

//   console.log(species);

//   return (
//     <div>
//       <h1>Welcome to Tree Of Life Project</h1>
//       <input type="text" value={search} onChange={searchSpecies}></input>
//       <ComListSpecies species={species}></ComListSpecies>
//     </div>
//   );
// };

// export default PageHome;
