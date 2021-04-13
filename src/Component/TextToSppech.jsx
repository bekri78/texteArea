import React, { useState, useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import { makeStyles } from '@material-ui/core/styles';
import { AccessAlarm } from '@material-ui/icons';
import { Box, TextField, Typography, CardContent, Card } from '@material-ui/core';

import Espace from './Espace';
import Couleur from './Couleur';
import Voyelles from './Voyelles';
import Police from './Police';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
    '& > *': {
      margin: theme.spacing(1),
    },
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
  const [modifiedValue, setModifiedValue] = useState([]);
  const { speak } = useSpeechSynthesis();

  const handleValueChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const handleTextModifier = useCallback((newText) => {
    setModifiedValue(newText);
  });

  return (
    <>
      <div>{modifiedValue.map((letter) => letter)}</div>

      <div className={classes.color}>
        <Espace />
        <Couleur />
        <Voyelles textModifier={handleTextModifier} value={value} />
        <Police />
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
          />

          <div style={{ wordBreak: 'break-all' }}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Couleur voyelles
                </Typography>
                <Typography variant="h5" component="h2">
                  {modifiedValue.map((letter) => letter)}
                </Typography>
              </CardContent>
            </Card>
          </div>
        </Box>

        <AccessAlarm onClick={() => speak({ text: value })} />
      </div>
    </>
  );
}

export default TextToSpeech;
