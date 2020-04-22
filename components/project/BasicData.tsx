import React, { useState } from 'react';
import { Paper, Grid, Typography, TextField } from '@material-ui/core';

import ArrayForm from '../ArrayForm';
import useStyles from 'public/static/styles/project';

export default ({ project, edit }): JSX.Element => {
  const classes = useStyles();

  const [details, setDetails] = useState({ ...project.details });
  const [skills, setSkills] = useState([...project.skills]);
  const [interests, setIntersts] = useState([...project.interests]);

  project.details = details;
  project.skills = skills;
  project.interests = interests;

  const handleProjectDesc = async (event): Promise<void> => {
    setDetails({
      ...details,
      description: event.target.value,
    });
  };

  return (
    <>
      <Paper className={classes.projectPaper}>
        <Typography component="h2" variant="h6">
          Description
        </Typography>
        <Grid item xs={12}>
          {edit ? (
            <TextField
              variant="outlined"
              size="small"
              id="desc"
              name="desc"
              value={details.description}
              fullWidth
              onChange={handleProjectDesc}
            />
          ) : (
            details.description || 'N/A'
          )}
        </Grid>
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component="h2" variant="h6">
          Skills Required
        </Typography>
        <ArrayForm label="Skill" items={skills} setItems={setSkills} allowEdit={edit} />
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component="h2" variant="h6">
          Fields of Interest
        </Typography>
        <ArrayForm label="Field" items={interests} setItems={setIntersts} allowEdit={edit} />
      </Paper>
    </>
  );
};
