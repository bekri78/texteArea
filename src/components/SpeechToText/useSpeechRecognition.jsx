/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react';
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
    console.log(value);
  }, [value]);

  const onEnd = () => {
    console.log('finish');
    // You could do something here after listening has finished
  };

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

  return (
    <Container>
      <form id="speech-recognition-form">
        <h2>Speech Recognition</h2>
        {!supported && <p>Oh no, it looks like your browser doesn&#39;t support Speech Recognition.</p>}
        {supported && (
          <React.Fragment>
            <p>
              {`Click 'Listen' and start speaking.
               SpeechRecognition will provide a transcript of what you are saying.`}
            </p>
            <label htmlFor="language">Language</label>
            <select form="speech-recognition-form" id="language" value={lang} onChange={changeLang}>
              {languageOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button disabled={blocked} type="button" onClick={toggle}>
              {listening ? 'Stop' : 'Listen'}
            </button>
            {blocked && <p style={{ color: 'red' }}>The microphone is blocked for this site in your browser.</p>}
          </React.Fragment>
        )}
      </form>
    </Container>
  );
}

export default Example;
