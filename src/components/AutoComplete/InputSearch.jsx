/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import usePlacesAutocomplete from '@atomap/use-places-autocomplete';
const key = 'AIzaSyAURsom7c-jmbNERN0wVqb4OzVten2Hy24'; // clef google map api
export default function PredictionsOnInputChange(props) {
  const [selectedPrediction, setSelectedPrediction] = useState(null); // etape1 format adresse : etape 2 conversion en lat  lng
  const [searchValue, setSearchValue] = useState('');
  const { predictions, error } = usePlacesAutocomplete(searchValue);
  const [coordonnateLat, setCoordonateLat] = useState(null);
  const [coordonnateLng, setCoordonateLng] = useState(null);

  useEffect(() => {
    const presentLocation = selectedPrediction !== null;

    if (presentLocation) {
      resquestApi();
    }
  }, [selectedPrediction]);

  useEffect(() => {
    const presentCoords = coordonnateLat !== null && coordonnateLng !== null;

    if (presentCoords) {
      props.newLat(coordonnateLat);
      props.newLng(coordonnateLng);
    }
  }, [coordonnateLat, coordonnateLng]);

  if (error) {
    console.error(error);
  }

  const handlePredictionSelection = (e, prediction) => {
    e.preventDefault();
    console.log(prediction.description);
    setSelectedPrediction(prediction.description); //adresse
  };

  const resquestApi = async () => {
    console.log(selectedPrediction);
    const cors = 'https://api.allorigins.win/get?url=';
    const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${selectedPrediction}&key=${key}`;
    const encodedEndpoint = encodeURIComponent(endpoint);
    try {
      const resquest = await fetch(`${cors}${encodedEndpoint}`);
      const json = await resquest.json();
      const { results } = JSON.parse(json.contents);
      console.log(results);
      setCoordonateLat(results[0].geometry.location.lat);
      setCoordonateLng(results[0].geometry.location.lng);
      console.log(coordonnateLat, coordonnateLat);
    } catch (e) {
      console.log(`Error : ${e}.`);
    }
  };

  return (
    <>
      <form>
        <input name="predictionSearch" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <ul>
          {predictions?.map((prediction) => (
            <li key={prediction.place_id}>
              <button onClick={(e) => handlePredictionSelection(e, prediction)}>{prediction.description || 'Not found'}</button>
            </li>
          ))}
        </ul>

        <h3>You selected: {selectedPrediction || 'None'}</h3>
      </form>
      {/* <button onClick={(() => props.newLat(coordonnateLat), props.newLng(coordonnateLng))} /> */}
    </>
  );
}
