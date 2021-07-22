const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	type: {
		type: String,
		enum: ['Illustration', 'Article'],
		required: true,
	},
	added: {
		type: Date,
		required: true,
		default: Date.now,
	},
	confirmed: {
		type: Date,
	},
	deadline: {
		type: Date,
	},
	instructions: String,
	status: {
		type: String,
		enum: ['Submitted', 'In-review', 'Assigned'],
	},
	assigned: {
		type: Date,
	},
	assignedTo: mongoose.Schema.Types.ObjectId,
	cost: Number,
	submissions: mongoose.Schema.Types.ObjectId,
	reviewed: Date,
	reviewedBy: mongoose.Schema.Types.ObjectId,
});

const Order = mongoose.model('Order', schema);

module.exports = Order;
