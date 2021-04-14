import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function Espace(props) {
  const classes = useStyles();
  const [line, setLine] = React.useState('');
  const [openSelectLine, setOpenSelectLine] = React.useState(false);

  const handleChangeLineClick = (event) => {
    setLine(event.target.value);
    // eslint-disable-next-line react/prop-types
    props.onChangeLine(event.target.value);
  };

  const handleCloseSelectLine = () => {
    setOpenSelectLine(false);
  };

  const handleOpenSelectLine = () => {
    setOpenSelectLine(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpenSelectLine}>
        Interlignage
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="controlled-open-select-label">Interlignage</InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={openSelectLine}
          onClose={handleCloseSelectLine}
          onOpen={handleOpenSelectLine}
          value={line}
          onChange={handleChangeLineClick}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1.5}>1.5</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={2.5}>2.5</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
