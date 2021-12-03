import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import "./App.css";
import Card from "./components/Card";
import FavouriteItem from "./components/FavouriteItem";
import Search from "./components/Search";

function App() {
  const [state, setstate] = useState([]);
  const [search, setSearch] = useState("");
  let [favourite, setFavourite] = useState([]);

  useEffect(() => {
    fetchSWC();

    // eslint-disable-next-line
  }, []);

  const fetchSWC = async () => {
    try {
      const { data } = await axios.get(`https://swapi.dev/api/people`);
      setstate(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setSearch(value);
    const { data } = await axios.get(
      `https://swapi.dev/api/people/?search=${value}`
    );
    setstate(data.results);
  };

  useEffect(() => {
    let localFavourite = localStorage.getItem("favourite");
    localFavourite = JSON.parse(localFavourite);
    if (localFavourite) setFavourite(localFavourite);
  }, []);

  const addItem = (item) => {
    let favouriteCopy = [...favourite];

    let name = item;

    let existingItem = favouriteCopy.find((favouriteItem) => favouriteItem.name === name.name);

    if (existingItem) {
      alert("Character is already your favourite");
    } else {
      favouriteCopy.push(item);
    }

    setFavourite(favouriteCopy);

    let stringFavoutite = JSON.stringify(favouriteCopy);
    localStorage.setItem("favourite", stringFavoutite);
  };

  const removeItem = (item) => {
    let favouriteCopy = [...favourite];

    let name = item;

    favouriteCopy = favouriteCopy.filter((item) => item.name !== name.name);

    setFavourite(favouriteCopy);

    let favouriteString = JSON.stringify(favouriteCopy);
    localStorage.setItem("favourite", favouriteString);
  };

  return (
    <div className="App">
      <Search onChange={handleChange} value={search} />
      <main className="App-header">
        <div>
          <Title>Search Results({state.length})</Title>
          { state.length === 0 && ( <h5>no character found</h5>)}
          {state.map((item, index) => (
            <Card key={index} item={item} onClick={() => addItem(item)} />
          ))}
        </div>
        <div>
          <Title>Favourite({favourite.length})</Title>
          { favourite.length === 0 && ( <h5>no favourites</h5>)}
          {favourite &&
            favourite.map((item, index) => (
              <FavouriteItem
                key={index}
                item={item}
                onClick={() => removeItem(item)}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;

const Title = styled.h3`
  padding-left: 1rem;
`;
