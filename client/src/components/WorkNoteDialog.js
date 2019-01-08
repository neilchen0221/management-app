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

const style = {
  dollarLabel: { position: 'absolute', bottom: 0, fontSize: 20, margin: 10, fontWeight: 'bold' }
};

class WorkNoteDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
              autoFocus
              margin="dense"
              id="date"
              defaultValue={moment().format('YYYY-MM-DD')}
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
            />
            <TextField id="note" label="Note" multiline rows="4" margin="normal" fullWidth />
            <div className="position-relative">
              <TextField id="materialExpense" label="Material Expense" type="number" margin="normal" />
              <span style={style.dollarLabel}>$</span>
            </div>
            <div className="position-relative">
              <TextField id="petrolExpense" label="Petrol Expense" type="number" margin="normal" />
              <span style={style.dollarLabel}>$</span>
            </div>
            <div className="position-relative">
              <TextField id="otherExpense" label="Other Expense" type="number" margin="normal" />
              <span style={style.dollarLabel}>$</span>
            </div>
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
