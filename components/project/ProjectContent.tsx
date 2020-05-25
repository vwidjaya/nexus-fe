import React from 'react';
import { Typography, Grid, Chip } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  misc: {
    fontSize: FONT.MISC,
    color: COLORS.GRAY_C4,
  },
  title: {
    fontSize: FONT.HEADING,
  },
  interests: {
    fontSize: '.875rem',
    color: COLORS.GRAY_75,
  },
  desc: {
    fontSize: '.875rem',
  },
  roles: {
    color: COLORS.GRAY_75,
    marginBottom: theme.spacing(7),
    '& *': {
      fontSize: FONT.LABEL,
    },
  },

  rolesItem: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    whiteSpace: 'pre',
  },
  skills: {
    color: COLORS.GRAY_C4,
    marginBottom: theme.spacing(7),
    '& *': {
      fontSize: '.875rem',
    },
  },
  skillsItem: {
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: '5px',
    color: COLORS.GRAY_75,
    fontSize: '.875rem',
  },

  detailsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(5),
    marginBottom: theme.spacing(7),
  },
  detailsItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginRight: '8%',
  },
  detailsIcon: {
    float: 'left',
    marginRight: theme.spacing(1.5),
  },
  detailsText: {
    color: COLORS.GRAY_75,
    fontSize: FONT.MISC,
  },
}));

export default ({ project }): JSX.Element => {
  const classes = useStyles();

  const data = project.details;
  const daysAgo = Math.round((new Date().getTime() - new Date(data.updatedAt).getTime()) / (1000 * 60 * 60 * 24)) || 0;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <span className={classes.misc}>{data.status}</span>
        <span className={classes.misc}>{`Posted ${daysAgo} days ago`}</span>
      </Box>

      <Typography className={classes.title}>{data.title}</Typography>
      <Typography className={classes.interests}>{`Interests: ${project.interests.join(', ')}`}</Typography>

      <Box marginY="2rem">
        <Typography className={classes.desc}>{data.description}</Typography>
      </Box>

      <Box className={classes.roles}>
        {`Looking for `}
        {project.roles.length ? (
          project.roles.map((r, i) => (
            <span key={r}>
              {i > 0 ? <span style={{ color: COLORS.GRAY_C4 }}>{` | `}</span> : null}
              <span className={classes.rolesItem}>{r}</span>
            </span>
          ))
        ) : (
          <span className={classes.rolesItem}>any roles</span>
        )}
        {}
      </Box>

      <Box className={classes.skills}>
        <Box marginBottom=".4rem">
          <Typography>{`Preferred Skills:`}</Typography>
        </Box>
        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
          {project.skills.map((s) => (
            <Grid item key={s}>
              <Chip label={s} className={classes.skillsItem} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className={classes.detailsContainer}>
        <Box className={classes.detailsItem}>
          <img
            className={classes.detailsIcon}
            style={{ marginBottom: '1px' }}
            src="/static/assets/duration.svg"
            alt="duration"
          />
          <Typography className={classes.detailsText}>{data.duration}</Typography>
        </Box>
        <Box className={classes.detailsItem}>
          <img className={classes.detailsIcon} src="/static/assets/team_size.svg" alt="team size" />
          <Typography className={classes.detailsText}>{data.size}</Typography>
        </Box>
        <Box className={classes.detailsItem}>
          <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
          <Typography className={classes.detailsText}>{data.postal}</Typography>
        </Box>
      </Box>

      <Typography className={classes.misc}>This project requires a small exercise for screening.</Typography>
    </>
  );
};