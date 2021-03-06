import React from 'react';
import { Typography, Button, Paper, TextField, List, ListItem } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import WorkNoteDialog from './WorkNoteDialog';
import axios from 'axios';
import moment from 'moment';

class ProjectDetail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			project: {},
			isDialogOpen: false,
			isLoading: true
		};
	}

	componentDidMount() {
		axios.get(`/projects/${this.props.match.params.id}`).then(response => {
			console.log(response.data);
			this.setState({ project: response.data, isLoading: false });
		});
	}

	handleDialogOpen = () => {
		this.setState({ isDialogOpen: true });
	};

	handleDialogClose = () => {
		this.setState({ isDialogOpen: false });
	};

	handleDeleteWorkNote = id => {
		this.setState({
			...this.state,
			project: {
				...this.state.project,
				workNotes: this.state.project.workNotes.filter(workNote => workNote._id !== id)
			}
		});
	};

	renderWorkNotes() {
		return (
			<div className='container-fluid'>
				<div className='row'>
					{this.state.project.workNotes.map(workNote => {
						return (
							<div key={workNote._id} className='col-lg-6'>
								<Paper style={{ padding: 20, marginBottom: 20 }}>
									<div className='container-fluid'>
										<div className='row'>
											<div className='col-md-5'>
												<Typography variant='h5' className='my-2'>
													Date: {moment(workNote.date).format('DD-MM-YYYY')}
												</Typography>
												<div className='my-2'>
													<Button variant='contained' color='primary' className='mr-3'>
														Edit
													</Button>
													<Button variant='contained' color='secondary' onClick={this.handleDeleteWorkNote.bind(this, workNote._id)}>
														Delete
													</Button>
												</div>
												<Typography variant='body1' className='my-3'>
													{workNote.note}
												</Typography>
											</div>
											<div className='col-md-7'>
												<List>
													{/* <ListItem>Total Expense: {workNote.totalExpense}</ListItem> */}
													{/* <ListItem>Labour Expense: {workNote.labourExpense}</ListItem> */}
													<ListItem>Material Expense: {workNote.materialExpense}</ListItem>
													<ListItem>Petrol Expense: {workNote.petrolExpense}</ListItem>
													<ListItem>Other Expense: {workNote.otherExpense}</ListItem>
												</List>
											</div>
										</div>
									</div>
								</Paper>
							</div>
						);
					})}
					<div className='col-md-6 text-center'>
						<div style={{ padding: 80 }}>
							<Button onClick={this.handleDialogOpen}>
								<AddCircle style={{ fontSize: 120, margin: 'auto' }} color='primary' variant='contained' />
							</Button>
							<WorkNoteDialog open={this.state.isDialogOpen} handleClose={this.handleDialogClose} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				{this.state.isLoading && (
					<Typography variant='h4' className='my-3'>
						Project Summary
					</Typography>
				)}
				{!this.state.isLoading && (
					<div>
						<Typography variant='h4' className='my-3'>
							Project Summary
						</Typography>
						<Paper style={{ padding: 20 }}>
							<div className='container-fluid'>
								<div className='row'>
									<div className='col-md-6 mt-3'>
										<form>
											<TextField
												id='address'
												label='Address'
												value={this.state.project.address}
												margin='normal'
												className='mx-3'
												variant='outlined'
												fullWidth
											/>
											<TextField
												id='estimateIncome'
												label='Estimate Income'
												value={this.state.project.estimateIncome}
												margin='normal'
												variant='outlined'
												className='mx-3'
											/>
											<TextField
												id='estimateExpense'
												label='Estimate Expense'
												value={this.state.project.estimateExpense}
												margin='normal'
												variant='outlined'
												className='mx-3'
											/>
											<Button variant='contained' color='primary' className='d-block m-3'>
												Save
											</Button>
										</form>
									</div>
									<div className='col-md-6 mt-3'>
										<List>
											<ListItem>Total Expense: {this.state.project.statistics.totalExpense}</ListItem>
											<ListItem>Total Labour Expense: {this.state.project.statistics.totalLabourExpense}</ListItem>
											<ListItem>Total Material Expense: {this.state.project.statistics.totalMaterialExpense}</ListItem>
											<ListItem>Total Petrol Expense: {this.state.project.statistics.totalPetrolExpense}</ListItem>
											<ListItem>Total Other Expense: {this.state.project.statistics.totalOtherExpense}</ListItem>
										</List>
									</div>
								</div>
							</div>
						</Paper>
						<Typography variant='h4' className='my-3'>
							Work Notes
						</Typography>
						{this.renderWorkNotes()}
					</div>
				)}
			</React.Fragment>
		);
	}
}

export default ProjectDetail;
