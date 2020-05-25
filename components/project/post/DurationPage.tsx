import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import RadioForm from 'components/RadioForm';
import { FONT } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));

export default ({ project, choices }): JSX.Element => {
  const classes = useStyles();
  const [duration, setDuration] = useState(project.details.duration);
  project.details.duration = duration;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`I was expecting my team to commit a full academic years for the project.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>{`Estimated Project Duration`}</Typography>
        <RadioForm value={duration} setValue={setDuration} choices={choices} />
      </Box>
    </Box>
  );
};