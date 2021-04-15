/* eslint-disable react/prop-types */
import React from 'react';
import COLOR_OPTIONS from '../../constants/colorOptions';
import useStyles from './styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';

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

  return (
    <div>
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
          {COLOR_OPTIONS.map((item) => (
            <MenuItem value={item.value} key={item.id}>
              <Avatar className={classes[item.class]}>{item.letter}</Avatar>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
