import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  inputLabel: {
    fontSize: '16px',
  },
  menuItem: {
    fontSize: '16px',
  },
  select: {
    fontSize: '16px',
  },
}));

export default function WordSpacing(props) {
  const classes = useStyles();
  const [wordSpace, setWordSpace] = React.useState('');
  const [openSelectWord, setOpenSelectWord] = React.useState(false);

  const handleChangeWordSpaceClick = (event) => {
    setWordSpace(event.target.value);
    // eslint-disable-next-line react/prop-types
    props.onChangeLine(event.target.value);
  };

  const handleCloseSelectLine = () => {
    setOpenSelectWord(false);
  };

  const handleOpenSelectLine = () => {
    setOpenSelectWord(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.inputLabel} id="controlled-open-select-label">
          Inter-mot
        </InputLabel>
        <Select
          className={classes.select}
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={openSelectWord}
          onClose={handleCloseSelectLine}
          onOpen={handleOpenSelectLine}
          value={wordSpace}
          onChange={handleChangeWordSpaceClick}>
          <MenuItem className={classes.menuItem} value="">
            <em>None</em>
          </MenuItem>
          <MenuItem className={classes.menuItem} value={3}>
            3 pt
          </MenuItem>
          <MenuItem className={classes.menuItem} value={6}>
            6 pt
          </MenuItem>
          <MenuItem className={classes.menuItem} value={9}>
            9 pt
          </MenuItem>
          <MenuItem className={classes.menuItem} value={15}>
            12 pt
          </MenuItem>
          <MenuItem className={classes.menuItem} value={20}>
            15 pt
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
