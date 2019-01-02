import React from 'react';
import { Typography, Grid, Card, CardActionArea, CardContent, Button } from '@material-ui/core';

const style = {
  card: {
    margin: 20
  },
  button: {
    margin: 10
  }
};

class ProjectList extends React.Component {
  constructor() {
    super();
    this.state = {
      projects: [
        {
          address: '273-277 Burwood Rd',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
        },
        {
          address: '273-277 Burwood Rd',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
        },
        {
          address: '273-277 Burwood Rd',
          description:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
        }
      ]
    };
  }

  render() {
    return (
      <div>
        <Typography variant="h4">Project List</Typography>
        <Button variant="contained" color="primary" style={style.button}>
          New Project
        </Button>
        <Grid container>
          {this.state.projects.map((project, index) => {
            return (
              <Grid key={index} item md>
                <Card style={style.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.address}
                      </Typography>
                      <Typography component="p">{project.description}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default ProjectList;
