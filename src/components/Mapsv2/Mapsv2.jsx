import React, { useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
// import ParlorForm from '../AutoComplete/googlePlace';
import { Container, Row } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker/Marker.tsx';
import MapSvg from './map.svg';

import Card from '../CardMaterialUi/Card';

import './Maps.css';
function Mapsv2() {
  const key = 'AIzaSyAURsom7c-jmbNERN0wVqb4OzVten2Hy24'; // clef gogle map api
  const [lat, setLat] = useState(null); // state latitude
  const [lng, setLng] = useState(null); // state longitude
  const [error, setError] = useState('');
  const [dataPlace, setDataPLace] = useState([]); // tableau recuperation des données de l'api

  /*if (navigator.geolocation) { 
    // recuperation coordoner lat - lng depuis le navigateur
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);

      /*todo : SI La geoloc est refusé :
      1) modal  bootstrap ou material ui ( geolococ refusé )
      2) proposer input pour entrer adresse
      3) proposer de passer carte centrer part default sur paris:
      lat:48.856614
      lng:2.3522219
      
    });
  }*/

  useEffect(() => {
    const hasPosition = lat !== null && lng !== null;

    if (navigator.geolocation) {
      // appel de la function  setCoordinates si ok sinon appel de handleLocationError
      navigator.geolocation.getCurrentPosition(setCoordinates, handleLocationError);

      /*todo : SI La geoloc est refusé :
        1) modal  bootstrap ou material ui ( geolococ refusé )
        2) proposer input pour entrer adresse
        3) proposer de passer carte centrer part default sur paris:
        lat:48.856614
        lng:2.3522219
        */
    }

    if (hasPosition) {
      requeteApiLocation();
    }
  }, [lat, lng]);

  const setCoordinates = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return setError('User denied the request for Geolocation.');
      case error.POSITION_UNAVAILABLE:
        return setError('Location information is unavailable.');
      case error.TIMEOUT:
        return setError('The request to get user location timed out.');
      case error.UNKNOWN_ERROR:
        return setError('An unknown error occurred.');
      default:
        return setError('Unknown error');
    }
  };

  // const requeteApiLocation = () => {
  //   console.log(lat, lng);
  //   // requete api : lat et lgn ne sont pas encore initialisé au demarrage faire correctif pour avoir la bonne valeur
  //   const requetesAPi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=orthophoniste&location=${lat},${lng}&radius=5000&keyword=cruise&key=${key}`;
  //   fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(requetesAPi)}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const recuperationData = JSON.parse(data.contents);
  //       console.log(recuperationData.results);
  //       // envoie des données au tableau
  //       setDataPLace(recuperationData.results);
  //     })
  //     .catch(function (error) {
  //       console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
  //     });
  // };

  const requeteApiLocation = async () => {
    const cors = 'https://api.allorigins.win/get?url=';
    const endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=orthophoniste&location=${lat},${lng}&radius=5000&keyword=cruise&key=${key}`;
    const encodedEndpoint = encodeURIComponent(endpoint);

    try {
      const request = await fetch(`${cors}${encodedEndpoint}`);
      const json = await request.json();
      const { results } = JSON.parse(json.contents);

      setDataPLace(results);
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  const center = {
    lat: lat, // POSITION maison
    lng: lng, // POSITION maison
  };

  const onMarkerDragEnd = (e) => {
    // recuperation  nouvelle latitude et longitude marker qui se deplace
    let newLat = e.latLng.lat();
    let newLng = e.latLng.lng();
    console.log(newLat, newLng);
  };

  return (
    <Container>
      <div>{/* <ParlorForm /> */}</div>
      <div className="intromap">
        <img id="mapsvg" src={MapSvg} alt="map" />
      </div>

      <div id="maps">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyAURsom7c-jmbNERN0wVqb4OzVten2Hy24',
          }}
          center={center}
          zoom={12}
          options={{ draggableCursor: 'crosshair' }}>
          <Marker lat={lat} lng={lng} color="red" text="My Marker" draggable={true} onDragend={onMarkerDragEnd} />
          {dataPlace &&
            dataPlace.map((el) => (
              <Marker
                key={el.place_id}
                lat={el.geometry.location.lat} // POSiTION
                lng={el.geometry.location.lng} // POSTION
                color="blue"
              />
            ))}
        </GoogleMapReact>
      </div>

      <Row>
        {dataPlace.map((el) => (
          <Card key={el.place_id} title={el.name.charAt(0)} name={el.name} adresse={el.formatted_address} etoile={el.rating} />
        ))}
      </Row>

      {error && <Dialog>{error}</Dialog>}
    </Container>
  );
}

export default Mapsv2;

// (error) => {
//   const requetesAPiSansGeoloc = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=48.8534,2.3488&radius=2000&type=orthophoniste&keyword=cruise&key=${key}`;
//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       alert('vous avez refuser la Geolocation, Carte sur Paris par default');
//       // coordonnees de paris
//       setLat(48.8534);
//       setLng(2.3488);

//       fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(requetesAPiSansGeoloc)}`)
//         .then((response) => response.json())
//         .then((data) => {
//           let recuperationData = JSON.parse(data.contents);
//           setDataPLace(recuperationData.results);
//         }); // jassigne mes donnes a mes tableau
//       break;
//     case error.POSITION_UNAVAILABLE:
//       alert(' Les informations de localisation ne sont pas disponibles.');
//       break;
//     case error.TIMEOUT:
//       alert("la demande d'obtention de votre localisation est trop longue.");
//       break;
//     case error.UNKNOWN_ERROR:
//       alert('Une erreur inconnue est survenued.');
//       break;

//     default:
//       alert('Une erreur inconnue est survenue.');
//   }
// };
