/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  vert: {
    backgroundColor: '#008000',
  },
  rouge: {
    backgroundColor: '#8B0000',
  },
  gris: {
    backgroundColor: '#C0C0C0',
  },
  jaune: {
    backgroundColor: '#FFFF00',
  },
}));

export default function Voyelles(props) {
  const classes = useStyles();
  const [colorValue, setColorValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const textValue = props.value;
  const handleChange = (e) => {
    setColorValue(e.target.value);

    let newArea = [];

    if (textValue) {
      const valueEntered = textValue.split('');
      for (let i = 0; i < valueEntered.length; i++) {
        if (['a', 'e', 'i', 'o', 'u'].includes(valueEntered[i])) {
          newArea.push(<span style={{ color: e.target.value }}>{valueEntered[i]}</span>);
        } else {
          newArea.push(valueEntered[i]);
        }
      }
    }

    return props.textModifier(newArea);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const config = [
    {
      id: 1,
      value: 'gray',
      class: 'gris',
      letter: 'G',
    },
    {
      id: 2,
      value: 'red',
      class: 'rouge',
      letter: 'R',
    },
    {
      id: 3,
      value: 'green',
      class: 'vert',
      letter: 'V',
    },
    {
      id: 4,
      value: 'yellow',
      class: 'jaune',
      letter: 'J',
    },
  ];

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Couleur Voyelles
      </Button>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Selectionner</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={colorValue}
          onChange={handleChange}>
          {config.map((item) => (
            <MenuItem value={item.value} key={item.id}>
              <Avatar className={classes[item.class]}>{item.letter}</Avatar>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
