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

export default useStyles;
