import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import moment from 'moment';
import uuid from 'uuid';

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
          name: 'Ping Zhang'
        },
        {
          _id: uuid.v4(),
          name: 'Lao Huang'
        }
      ],
      labourExpense: [{ _id: uuid.v4(), resource: '', expense: '' }]
    };
  }

  handleFieldChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSelectChange = id => {};

  handleExpenseChange = id => {};
  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">Work Note</DialogTitle>
        <DialogContent>
          <DialogContentText>Work Note Detail:</DialogContentText>
          <form>
            <TextField
              value={this.state.date}
              onChange={this.handleFieldChange}
              autoFocus
              margin="dense"
              id="date"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField
              id="note"
              onChange={this.handleFieldChange}
              label="Note"
              multiline
              rows="4"
              margin="normal"
              fullWidth
            />
            <div className="position-relative">
              <TextField
                id="materialExpense"
                onChange={this.handleFieldChange}
                label="Material Expense"
                type="number"
                margin="normal"
              />
              <span style={style.dollarLabel}>$</span>
            </div>
            <div className="position-relative">
              <TextField
                id="petrolExpense"
                onChange={this.handleFieldChange}
                label="Petrol Expense"
                type="number"
                margin="normal"
              />
              <span style={style.dollarLabel}>$</span>
            </div>
            <div className="position-relative">
              <TextField
                id="otherExpense"
                onChange={this.handleFieldChange}
                label="Other Expense"
                type="number"
                margin="normal"
              />
              <span style={style.dollarLabel}>$</span>
            </div>

            <h4 style={{ marginTop: 20, marginBottom: 0 }}>Labour Expense:</h4>

            {this.state.labourExpense.map((labour, index) => {
              return (
                <React.Fragment>
                  <div key={labour._id} style={style.labourExpense}>
                    <TextField
                      select
                      style={{ marginRight: 20, width: 150 }}
                      label="Resource"
                      value={labour.resource}
                      onChange={this.handleSelectChange.bind(this, labour._id)}
                      margin="normal"
                    >
                      {this.state.employees.map(resource => {
                        return (
                          <option key={resource._id} value={resource.name}>
                            {resource.name}
                          </option>
                        );
                      })}
                    </TextField>
                    <div className="position-relative">
                      <TextField
                        value={labour.expense}
                        type="number"
                        margin="normal"
                        label="Expense"
                        onChange={this.handleExpenseChange.bind(this, labour._id)}
                      />
                      <span style={style.dollarLabel}>$</span>
                    </div>

                    {index > 0 && (
                      <Button variant="contained" color="secondary">
                        Delete
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              );
            })}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default WorkNoteDialog;
