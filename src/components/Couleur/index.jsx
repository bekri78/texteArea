import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  blue: {
    backgroundColor: '#0000FF',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function Couleur(props) {
  const classes = useStyles();
  const [couleur, setCouleur] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setCouleur(event.target.value);
    props.colorModifier(event.target.value);
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
        Couleur Texte
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Selectionner </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={couleur}
          onChange={handleChange}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'orange'}>
            {' '}
            <Avatar className={classes.orange}>Or</Avatar>
          </MenuItem>
          <MenuItem value={'blue'}>
            {' '}
            <Avatar className={classes.blue}>Ja</Avatar>
          </MenuItem>
          <MenuItem value={'purple'}>
            {' '}
            <Avatar className={classes.purple}>Vi</Avatar>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
