import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdFavorite } from "react-icons/md";
import styled from "styled-components";

const FavouriteItem = ({ item, onClick, rest }) => {
  const [film, setFilm] = useState([]);
  const [space, setSpace] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [planet, setPlanet] = useState([]);

  useEffect(() => {
    fetchPlanet();
    // eslint-disable-next-line
  }, []);

  const fetchPlanet = async () => {
    try {
      const { data } = await axios.get(`${item.homeworld}`);
      setPlanet(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilm = async () => {
    try {
      const response = await Promise.all(
        item.films.map((url) => axios.get(url).then((res) => res.data))
      );
      setFilm(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpace = async () => {
    try {
      const response = await Promise.all(
        item.starships.map((url) => axios.get(url).then((res) => res.data))
      );
      setSpace(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVehicle = async () => {
    try {
      const response = await Promise.all(
        item.vehicles.map((url) => axios.get(url).then((res) => res.data))
      );
      setVehicle(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <FavouriteWrapper {...rest}>
      <div> name: {item.name}</div>
      <div> height: {item.height}</div>
      <div> mass: {item.mass}</div>
      <div> skin color: {item.skin_color}</div>
      <div> birth year: {item.birth_year}</div>
      <div> Planet: {planet && planet.name}</div>
      <div> eye color: {item.eye_color}</div>
      <div> hair color: {item.hair_color}</div>
      <Details onClick={() => fetchFilm()}>
        <summary>movie</summary>
        {film && film.map((item, index) => <p key={index}>{item.title}</p>)}
      </Details>
      <Details onClick={() => fetchSpace()}>
        <summary>spaceship</summary>
        {space && space.map((item, index) => <p key={index}>{item.name}</p>)}
      </Details>
      <Details onClick={() => fetchVehicle()}>
        <summary>vehicle</summary>
        {vehicle &&
          vehicle.map((item, index) => <p key={index}>{item.name}</p>)}
      </Details>
      <Favourite onClick={onClick}>
        <MdFavorite color="red" />
      </Favourite>
    </FavouriteWrapper>
  );
};

export default FavouriteItem;

const FavouriteWrapper = styled.div`
  min-height: 200px;
  background: #333;
  margin: 1rem;
  border-radius: 0.5rem;
  width: 250px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  position: relative;

  div {
    margin-bottom: 0.5rem;
  }
`;

const Favourite = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  bottom: 0;
  cursor: pointer;
  height: 0;

  :hover {
    opacity: 0.4;
  }
`;

const Details = styled.details`
  cursor: pointer;
`;
