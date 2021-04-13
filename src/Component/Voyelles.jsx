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
}));

export default function Voyelles() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Couleur Voyelles
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Selectionner </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}>
          <MenuItem value={'orange'}>
            {' '}
            <Avatar className={classes.gris}>Gi</Avatar>
          </MenuItem>
          <MenuItem value={'rouge'}>
            {' '}
            <Avatar className={classes.rouge}>Ro</Avatar>
          </MenuItem>
          <MenuItem value={'vert'}>
            {' '}
            <Avatar className={classes.vert}>Ve</Avatar>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
