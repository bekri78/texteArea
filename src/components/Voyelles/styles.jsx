import { makeStyles } from '@material-ui/core/styles';
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
    height: '29px',
    width: '29px',
  },
  rouge: {
    backgroundColor: '#8B0000',
    height: '29px',
    width: '29px',
  },
  gris: {
    backgroundColor: '#C0C0C0',
    height: '29px',
    width: '29px',
  },
  jaune: {
    backgroundColor: '#FFFF00',
    height: '29px',
    width: '29px',
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
  centrage: {
    textAlign: 'center',
  },
}));

export default useStyles;
