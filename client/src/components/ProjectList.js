import React from "react";
import { Typography, Grid, Card, CardActionArea, CardContent, Button } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

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
		this.state = { projects: [] };
	}

	componentDidMount() {
		axios.get("/projects").then(response => {
			console.log(response.data);
			this.setState({ projects: response.data });
		});
	}

	render() {
		return (
			<div>
				<Typography variant="h4">Project List</Typography>
				<Button variant="contained" color="primary" style={style.button}>
					New Project
				</Button>
				<Grid container>
					{this.state.projects.map(project => {
						return (
							<Grid key={project._id} item md>
								<Link to={`/projects/${project._id}`} style={{ textDecoration: "none" }}>
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
								</Link>
							</Grid>
						);
					})}
				</Grid>
			</div>
		);
	}
}

export default ProjectList;
