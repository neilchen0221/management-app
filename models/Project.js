const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WorkNoteSchema = new Schema({
	date: {
		type: Date,
		required: true
	},
	note: {
		type: String,
		required: true
	},
	duration: Number,
	labourExpense: [{ resource: Schema.Types.ObjectId, expense: Number }],
	materialExpense: Number,
	petrolExpense: Number,
	otherExpense: Number
});

const ProjectSchema = new Schema({
	address: {
		type: String,
		required: true
	},
	description: String,
	estimateIncome: Number,
	estimateExpense: Number,
	workNotes: [WorkNoteSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);
