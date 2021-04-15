/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { ExpandMore } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: '50%',
    padding: '24px',
    backgroundColor: '#f5f5f5',
    marginBottom: '100px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  question: {
    display: 'flex',

    justifyContent: 'center',
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.question}>
        <img src="https://svgshare.com/i/WDb.svg" alt="quest" />
      </div>

      <div className={classes.root}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography className={classes.heading}>Entrer son texte</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Modifier son texte</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>{' '}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Ecouter son texte</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography className={classes.heading}>Recuperer son texte</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
