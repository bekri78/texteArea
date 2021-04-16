/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useSpeechRecognition } from '../../ReactSpech';
import { Container } from '../shared';

const languageOptions = [
  { label: 'Cambodian', value: 'km-KH' },
  { label: 'Deutsch', value: 'de-DE' },
  { label: 'English', value: 'en-AU' },
  { label: 'Farsi', value: 'fa-IR' },
  { label: 'Français', value: 'fr-FR' },
  { label: 'Italiano', value: 'it-IT' },
  { label: '普通话 (中国大陆) - Mandarin', value: 'zh' },
  { label: 'Portuguese', value: 'pt-BR' },
  { label: 'Español', value: 'es-MX' },
  { label: 'Svenska - Swedish', value: 'sv-SE' },
];

function Example(props) {
  const [lang, setLang] = useState('fr-FR');
  const [value, setValue] = useState('');
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    props.vocaleTexte(value);
  }, [value]);

  const onEnd = () => {};

  const onResult = (result) => {
    setValue(result);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === 'not-allowed') {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen({ lang });
      };
  const erreurMic = {
    color: 'red',
  };
  const pBotom = {
    marginBottom: '0px',
  };

  return (
    <Container>
      <form id="speech-recognition-form">
        <h2>Reconnaisse vocale</h2>
        {!supported && <p>Quelle dommage il semble que vous ne puissiez utilisez cette fonctionnalitée</p>}
        {supported && (
          <React.Fragment>
            <p>{`Par ce que faciliter l'acces a la lecture est notre priorité, nous avons mis en place une reconnaissance vocale. .`}</p>
            <p>{` Comment l'utilisez ? rien de plus simple , clicker sur le bouton et parler d'une voix claire en articulant les mots..`}</p>
            <p style={pBotom}>{`  Une fois votre message terminer rappuyez sur le bouton afin de couper l'enregistrement.`}</p>

            <label htmlFor="language">Langue</label>
            <select form="speech-recognition-form" id="language" value={lang} onChange={changeLang}>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Button variant="contained" color="primary" disabled={blocked} onClick={toggle}>
              {listening ? 'Stop' : 'Parler'}
            </Button>

            {blocked && <p style={erreurMic}>Le micro est bloqué sur ce navigateur verifiez vos parametres</p>}
          </React.Fragment>
        )}
      </form>
    </Container>
  );
}

export default Example;
