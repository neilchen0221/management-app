import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@material-ui/core';
import moment from 'moment';
import uuid from 'uuid';
import axios from 'axios';

const style = {
	dollarLabel: { position: 'absolute', bottom: 0, fontSize: 20, margin: 10, fontWeight: 'bold', marginRight: 20 },
	labourExpense: { display: 'flex', alignItems: 'center', flexWrap: 'warp', marginTop: 10, marginBottom: 10 }
};

class WorkNoteDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: moment().format('YYYY-MM-DD'),
			note: '',
			employees: [
				{
					_id: uuid.v4(),
					firstName: '',
					lastName: ''
				}
			],
			labourExpense: [{ resource: '', expense: '' }]
		};
	}

	componentDidMount() {
		axios.get(`/employees`).then(response => this.setState({ employees: response.data }));
	}

	handleFieldChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSelectChange = (id, e) => {
		this.setState({
			labourExpense: this.state.labourExpense.map((item, index) => {
				if (index === id) item.resource = e.target.value;
				return item;
			})
		});
	};

	handleExpenseChange = (id, e) => {
		this.setState({
			labourExpense: this.state.labourExpense.map((item, index) => {
				if (index === id) item.expense = e.target.value;
				return item;
			})
		});
	};

	handleCreateNote = () => {
		this.setState({ labourExpense: [...this.state.labourExpense, { resource: '', expense: '' }] });
	};

	handleDeleteNote = id => {
		this.setState({ labourExpense: this.state.labourExpense.filter((item, index) => index !== id) });
	};

	render() {
		return (
			<Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby='form-dialog-title' fullScreen maxWidth='md'>
				<DialogTitle id='form-dialog-title'>Work Note</DialogTitle>
				<DialogContent>
					<DialogContentText>Work Note Detail:</DialogContentText>
					<form>
						<TextField
							value={this.state.date}
							onChange={this.handleFieldChange}
							autoFocus
							margin='dense'
							id='date'
							label='Date'
							type='date'
							InputLabelProps={{
								shrink: true
							}}
						/>
						<TextField id='note' onChange={this.handleFieldChange} label='Note' multiline rows='4' margin='normal' fullWidth />
						<div className='position-relative'>
							<TextField id='materialExpense' onChange={this.handleFieldChange} label='Material Expense' type='number' margin='normal' />
							<span style={style.dollarLabel}>$</span>
						</div>
						<div className='position-relative'>
							<TextField id='petrolExpense' onChange={this.handleFieldChange} label='Petrol Expense' type='number' margin='normal' />
							<span style={style.dollarLabel}>$</span>
						</div>
						<div className='position-relative'>
							<TextField id='otherExpense' onChange={this.handleFieldChange} label='Other Expense' type='number' margin='normal' />
							<span style={style.dollarLabel}>$</span>
						</div>
						<h4 style={{ marginTop: 20, marginBottom: 0 }}>Labour Expense:</h4>
						{this.state.labourExpense.map((labour, index) => {
							return (
								<div key={labour.resource} style={style.labourExpense}>
									<TextField
										select
										style={{ marginRight: 20, width: 150 }}
										label='Resource'
										value={labour.resource}
										onChange={this.handleSelectChange.bind(this, index)}
										margin='normal'
									>
										{this.state.employees.map(resource => {
											return (
												<option key={resource._id} value={resource._id}>
													{`${resource.firstName} ${resource.lastName}`}
												</option>
											);
										})}
									</TextField>
									<div className='position-relative'>
										<TextField
											value={labour.expense}
											type='number'
											margin='normal'
											label='Expense'
											onChange={this.handleExpenseChange.bind(this, index)}
										/>
										<span style={style.dollarLabel}>$</span>
									</div>
									<div className='ml-5'>
										{index > 0 && (
											<Button variant='contained' color='secondary' onClick={this.handleDeleteNote.bind(this, index)}>
												Delete
											</Button>
										)}
									</div>
								</div>
							);
						})}
						<Button variant='contained' color='primary' onClick={this.handleCreateNote}>
							New
						</Button>
					</form>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.props.handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={this.props.handleClose} color='primary'>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

export default WorkNoteDialog;
