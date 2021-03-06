import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
  },
  inner: {
    minHeight: '80%',
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
  },
  title: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.text.primary,
  },
}));

export default ({ student, options }): JSX.Element => {
  const classes = useStyles();
  const [roles, setRoles] = useState(student.roles);
  student.roles = roles;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          My role is a product designer but also a UX designer. What about you? :)
        </Typography>
      </Box>
      <Box className={classes.inner}>
        <Typography className={classes.title}>
          <span style={{ fontWeight: 'bold' }}>Roles</span>
          <span style={{ color: COLORS.GRAY_BB }}> that you would take in your projects</span>
        </Typography>
        <ArrayForm label="Titles" items={roles} setItems={setRoles} options={options} />
      </Box>
    </Box>
  );
};
