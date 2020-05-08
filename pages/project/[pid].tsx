import React, { useState } from 'react';
import { NextPage } from 'next';
import Error from 'next/error';
import Router from 'next/router';
import { Avatar, Typography, IconButton, Link, Button } from '@material-ui/core';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import withNavbar from 'components/Navbar';
import BasicData from 'components/project/BasicData';
import ProjectContracts from 'components/project/ProjectContracts';
import useStyles from 'public/static/styles/project';
import { BE_ADDR, FE_ADDR, callApi, redirectPage } from 'utils';
import { Project, Contract } from 'types';

const MODES = {
  MAIN: 0,
  EDIT: 1,
  MANAGE: 2,
};

type ContentProps = {
  mode: number;
  project: Project;
  contracts: Contract[];
};

const ProjectPageContent: NextPage<ContentProps> = ({ mode, project, contracts }) => {
  return mode === MODES.MANAGE ? (
    <ProjectContracts contracts={contracts} />
  ) : (
    <BasicData project={project} edit={mode === MODES.EDIT} />
  );
};

type ButtonProps = {
  relationship: string;
  projectId: number;
  project: Project;
  mode: number;
  setMode(m: number): void;
};

const ProjectActionButton: NextPage<ButtonProps> = ({ relationship, projectId, project, mode, setMode }) => {
  const classes = useStyles();
  const [rel, setRel] = useState(relationship);

  const handleJoin = async (): Promise<void> => {
    const res = await fetch(`${FE_ADDR}/api/contract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ projectId }),
    });

    if (res.ok) setRel('Pending');
  };

  const handleDoneEdit = async (): Promise<void> => {
    if (mode === MODES.EDIT) {
      const res = await fetch(`${BE_ADDR}/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(project),
      });

      if (!res.ok) return;
    }

    setMode(MODES.MAIN);
  };

  switch (rel) {
    case 'Owner':
      return mode === MODES.MAIN ? (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              aria-label="Edit"
              variant="contained"
              color="primary"
              className={classes.actionButton}
              onClick={(): void => setMode(MODES.EDIT)}
            >
              Edit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              aria-label="Manage"
              variant="contained"
              color="primary"
              className={classes.actionButton}
              onClick={(): void => setMode(MODES.MANAGE)}
            >
              Manage
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Button
          fullWidth
          aria-label="Done"
          variant="contained"
          color="primary"
          className={classes.actionButton}
          onClick={handleDoneEdit}
        >
          Done
        </Button>
      );
    case '':
      return (
        <Button
          fullWidth
          aria-label="Join"
          variant="contained"
          color="primary"
          className={classes.actionButton}
          onClick={handleJoin}
        >
          Join
        </Button>
      );
    default:
      return (
        <Button
          fullWidth
          aria-label="Relationship"
          variant="contained"
          color="primary"
          className={classes.actionButton}
          disabled
        >
          {rel}
        </Button>
      );
  }
};

type PageProps = {
  project?: Project;
  projectId: number;
  relationship: string;
  contracts: Contract[];
};

const ProjectPage: NextPage<PageProps> = ({ project, projectId, relationship, contracts }) => {
  const classes = useStyles();
  const [mode, setMode] = useState(MODES.MAIN);

  if (!project) return <Error statusCode={404} />;
  const { details } = project;
  const { owner } = details;

  return (
    <Container component="main" maxWidth="xs" className={classes.projectOuter}>
      <Grid container className={classes.projectNav}>
        <Grid item container xs={3} justify="center">
          <IconButton aria-label="Back" onClick={(): void => Router.back()}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>

      <Paper className={classes.projectPaper}>
        <Box className={classes.projectMain}>
          <Grid container justify="space-between">
            <Avatar className={classes.projectPic} variant="rounded" alt="Project Picture" src={''} />

            <Grid item xs={8} container justify="flex-end" alignItems="flex-end">
              <Typography color="textSecondary">{details.status.toUpperCase()}</Typography>
            </Grid>
          </Grid>

          <Grid container alignItems="center" className={classes.projectBasic}>
            <Grid item xs={12} container direction="column">
              <Typography component="h1" variant="h5">
                {details.title}
              </Typography>
              <Typography color="textSecondary">{details.duration}</Typography>
              <Typography>
                <Link href={`/user/${owner.user.username}`} color="inherit" style={{ fontWeight: 'bold' }}>
                  {owner.firstName} {owner.lastName}
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <ProjectActionButton
            relationship={relationship}
            projectId={projectId}
            project={project}
            mode={mode}
            setMode={(m): void => setMode(m)}
          />
        </Box>
      </Paper>

      <ProjectPageContent mode={mode} project={project} contracts={contracts} />
    </Container>
  );
};

ProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { pid } = ctx.query;
    const props: PageProps = await callApi(ctx, `${FE_ADDR}/api/project/${pid}`);
    return props;
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default withNavbar(ProjectPage);
