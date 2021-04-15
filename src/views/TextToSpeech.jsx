import React, { useState, useCallback, Fragment } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { makeStyles } from '@material-ui/core/styles';
import { AccessAlarm } from '@material-ui/icons';
import { Box, TextField, Typography, CardContent, Card } from '@material-ui/core';
import Interlignage from '../components/Interlignage';
import WordSpacing from '../components/Intermot';
import Couleur from '../components/Couleur';
import Voyelles from '../components/Voyelles';
import Police from '../components/Police';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '200px',
    padding: '27px 12px 10px',
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
    marginBottom: '-10px',
  },
  containerWrapper: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: '10px',
  },
}));

function TextToSpeech() {
  const classes = useStyles();
  const [value, setValue] = useState();
  const [modifiedValue, setModifiedValue] = useState([]); // creation d'un state array pour contenir le texte tranformer de voyelles.jsx
  const [currentPolice, setCurrentPolice] = useState('');
  const [currentLineHeight, setCurrentLineHeight] = useState(''); //useState pour modifier interlignage
  const [currentWordSpace, setCurrentWordSpace] = useState(''); //useState pour modifier inter-mot
  const { speak } = useSpeechSynthesis();
  // Callback avec array vide permet de ne pas re rendre la déclaration d'une function
  const handleValueChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  // Callback avec array vide permet de ne pas re rendre la déclaration d'une function
  const handleTextModifier = useCallback((newText) => {
    setModifiedValue(newText);
  });

  return (
    <>
      <div className={classes.color}>
        <Interlignage onChangeLine={(newLineHeight) => setCurrentLineHeight(newLineHeight)} />
        <WordSpacing onChangeLine={(newWordSpace) => setCurrentWordSpace(newWordSpace)} />
        <Couleur />
        {/* recupération props " textModifier " enfant to parents */}
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
            rows={20}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={value}
            className={classes.input}
            onChange={handleValueChange}
            inputProps={{
              style: { fontFamily: currentPolice, lineHeight: currentLineHeight, wordSpacing: currentWordSpace },
            }}
          />
          {/* wordBreak: 'break-all'  = retour a la ligne du text automatique*/}
          <div style={{ wordBreak: 'break-all' }}>
            {/* utilisation d'une card car textarea ne supporte pas le html */}
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Vos Modifications
                </Typography>
                <Typography
                  style={{ fontFamily: currentPolice, lineHeight: currentLineHeight, wordSpacing: currentWordSpace }}
                  variant="h5"
                  component="h2">
                  {/* parcours mon tableau et affiche les lettres avec les span colorier */}
                  {/*fragment = <> utilisé pour englober letter et mettre une key  */}
                  {modifiedValue.map((letter, index) => (
                    <Fragment key={index}>{letter}</Fragment>
                  ))}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Box>
        {/* librairie text to speach */}
        <AccessAlarm onClick={() => speak({ text: value })} />
      </div>
    </>
  );
}

export default TextToSpeech;
