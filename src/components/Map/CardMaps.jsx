import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker.tsx';
import CardMaterialUi from '../Card/Card';
import './CardMaps.css';
import { Container, Row } from 'react-bootstrap';
const key = 'AIzaSyAURsom7c-jmbNERN0wVqb4OzVten2Hy24'; // clef google map api

function CardMaps() {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [error, setError] = useState('');
  const [dataPlace, setDataPlace] = useState([]);
  const center = { lat: lat, lng: lng };

  useEffect(() => {
    const presentLocation = lat !== null && lng !== null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(location, errorLocation);
    }
    if (presentLocation) {
      resquestApi();
    }
  }, [lat, lng]);

  const location = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };

  const errorLocation = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return setError('Géolocalisation refusée');
      case error.POSITION_UNAVAILABLE:
        return setError('Position inconnue');
      case error.TIMEOUT:
        return setError('Chargement de la positon expiré');
      case error.UNKNOWN_ERROR:
        return setError('Erreur inconnue');
      default:
        return setError('Erreur inconnue');
    }
  };

  const resquestApi = async () => {
    const cors = 'https://api.allorigins.win/get?url=';
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=orthophoniste&location=${lat},${lng}&radius=5000&keyword=cruise&key=${key}`;
    const encodedEndpoint = encodeURIComponent(endpoint);
    try {
      const resquest = await fetch(`${cors}${encodedEndpoint}`);
      const json = await resquest.json();
      const { results } = JSON.parse(json.contents);
      setDataPlace(results);
    } catch (e) {
      console.log(`Error : ${e}.`);
    }
  };
  console.log(dataPlace);
  return (
    <Container>
      <h1>Map</h1>
      <div id="map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAURsom7c-jmbNERN0wVqb4OzVten2Hy24',
          }}
          center={center}
          zoom={12}>
          <Marker lat={lat} lng={lng} color="red" text="my-marker" />
          {dataPlace &&
            dataPlace.map((data) => <Marker key={data.place_id} lat={data.geometry.location.lat} lng={data.geometry.location.lng} color="blue" />)}
        </GoogleMapReact>
        {error && <h1>{error}</h1>}
      </div>
      <Row>
        {dataPlace &&
          dataPlace.map((data) => (
            <CardMaterialUi
              key={data.place_id}
              name={data.name}
              adress={data.formatted_address}
              initiale={data.name.charAt(0)}
              starsRating={data.rating}
            />
          ))}
      </Row>
    </Container>
  );
}
export default CardMaps;
