import React, { useState, useCallback, Fragment, useEffect } from 'react';
import SpeechSynthesisExample from '../components/SpeechToText/useSpeechSynthesis';
import SpeechRecognitionExample from '../components/SpeechToText/useSpeechRecognition';
import { makeStyles } from '@material-ui/core/styles';

//import PDF from '../components/Pdf/pdf';

import { Box, TextField, Typography, CardContent, Card } from '@material-ui/core';
import Espace from '../components/Espace';
import Couleur from '../components/Couleur';
import Voyelles from '../components/Voyelles';
import Police from '../components/Police';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '27px 12px 10px',
  },
  root2: {
    boxShadow: '0 0px 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    minHeight: '227px',
    maxHeight: '227px',
    overflow: 'auto',
    margin: '8px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  input: {
    height: 300,
    margin: 8,
  },
  color: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px',
  },
  botom: {
    margin: '10px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function TextToSpeech() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [modifiedValue, setModifiedValue] = useState([]); // creation d'un state array pour contenir le texte tranformer de voyelles.jsx
  const [currentPolice, setCurrentPolice] = useState(''); //
  const [letterSpacing, setLetterSpacing] = useState('');
  const [colorText, setColorText] = useState('');

  useEffect(
    () => {
      console.log('je suis la', value);
    },
    { value },
  );
  // Callback avec array vide permet de ne pas re rendre la déclaration d'une function
  const handleValueChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleTextModifier = useCallback((newText) => {
    setModifiedValue(newText);
    console.log(newText);
  });

  const handleColorModifier = useCallback((newColor) => {
    setColorText(newColor);
  });

  return (
    <>
      <div className={classes.color}>
        {/* recupration props value  enfant to parent */}
        <Espace letterSpacingModifier={(newEspace) => setLetterSpacing(newEspace)} />
        <Couleur colorModifier={handleColorModifier} />
        <Voyelles textModifier={handleTextModifier} value={value} />
        <Police onChangePolice={(newPolice) => setCurrentPolice(newPolice)} />
      </div>

      <div className={classes.root}>
        <Box className={classes.containerWrapper}>
          <TextField
            id="filled-full-width"
            label="AlphaB"
            placeholder="Entrer votre texte..."
            helperText="Facilitons la lecture !"
            multiline
            rows={10}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            value={value}
            className={classes.input}
            onChange={handleValueChange}
            InputProps={{
              style: {
                fontFamily: currentPolice,
                letterSpacing: letterSpacing,
                color: colorText,
                boxShadow: '0 0 10px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
              },
            }}
          />
          {/* wordBreak: 'break-all'  = retour a la ligne du text automatique*/}
          <div style={{ wordBreak: 'break-all' }}>
            {/* utilisation d'une card car textarea ne supporte pas le html */}
            <Card className={classes.root2}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Vos Modifications
                </Typography>
                <Typography style={{ fontFamily: currentPolice, letterSpacing: letterSpacing, color: colorText }} variant="h5" component="h2">
                  {/* parcpour mon tableau et affiche les lettres avec les span colorier */}
                  {/*fragment = <> utilisé pour englober letter et mettre une key  */}
                  {modifiedValue.map((letter, index) => (
                    <Fragment key={index}>{letter}</Fragment>
                  ))}
                </Typography>
              </CardContent>
            </Card>
            {/* <div className={classes.botom}>
             <PDF content={value} /> 
              <GetApp />
            </div> */}
          </div>
        </Box>
        {/* librairie text to speach */}
      </div>
      <SpeechSynthesisExample text={value} />
      <SpeechRecognitionExample vocaleTexte={(mots) => setValue(mots)} />
    </>
  );
}

export default TextToSpeech;
