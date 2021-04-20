import React, { useEffect, useState } from 'react';
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
    if (navigator.geolocation) {
      // appel de la function  getCoordinate si ok sinon appel de handleLocationError
      navigator.geolocation.getCurrentPosition(getCoordinate, handleLocationError);

      /*todo : SI La geoloc est refusé :
        1) modal  bootstrap ou material ui ( geolococ refusé )
        2) proposer input pour entrer adresse
        3) proposer de passer carte centrer part default sur paris:
        lat:48.856614
        lng:2.3522219
        */
    }

    //appel de ma function pour requete api
    // ne fonctionne pas encore correctement
  }, []);

  const getCoordinate = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
    requeteApiLocation();
  };
  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert('User denied the request for Geolocation.');
        break;
      case error.POSITION_UNAVAILABLE:
        alert('Location information is unavailable.');
        break;
      case error.TIMEOUT:
        alert('The request to get user location timed out.');
        break;
      case error.UNKNOWN_ERROR:
        alert('An unknown error occurred.');
        break;
    }
  };
  const requeteApiLocation = () => {
    console.log(lat, lng);
    // requete api : lat et lgn ne sont pas encore initialisé au demarrage faire correctif pour avoir la bonne valeur
    const requetesAPi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=orthophoniste&location=${lat},${lng}&radius=5000&keyword=cruise&key=${key}`;
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(requetesAPi)}`)
      .then((response) => response.json(), console.log('envoyer'))
      .then((data) => {
        let recuperationData = JSON.parse(data.contents);
        console.log(recuperationData.results);
        // envoie des données au tableau
        setDataPLace(recuperationData.results);
      })
      .catch(function (error) {
        console.log("Il y a eu un problème avec l'opération fetch: " + error.message);
      });
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
            dataPlace.map((el, index) => (
              <Marker
                key={index}
                lat={el.geometry.location.lat} // POSiTION
                lng={el.geometry.location.lng} // POSTION
                color="blue"
              />
            ))}
        </GoogleMapReact>
      </div>
      <Row>
        {dataPlace.map((el, index) => (
          <Card key={index} title={el.name.charAt(0)} name={el.name} adresse={el.formatted_address} etoile={el.rating} />
        ))}
      </Row>
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
