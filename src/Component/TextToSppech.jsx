import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';
import Espace from './Espace';
import Couleur from './Couleur';
import Voyelles from './Voyelles';
import Police from './Police';
import { makeStyles } from '@material-ui/core/styles';
import { AccessAlarm } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';

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
    height: 100,
  },
  color: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function TextToSpeech() {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();

  return (
    <>
      <div className={classes.color}>
        <Espace />
        <Couleur />
        <Voyelles />
        <Police />
      </div>
      <div className={classes.root}>
        <TextField
          id="filled-full-width"
          label="AlphaB"
          style={{ margin: 8 }}
          placeholder="Entrer votre texte"
          helperText="Facilitons la lecture !"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            className: classes.input,
          }}
          variant="filled"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <AccessAlarm onClick={() => speak({ text: value })} />
      </div>
    </>
  );
}

export default TextToSpeech;
