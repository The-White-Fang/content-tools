const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	docPath: {
		type: String,
		requried: true,
	},
	format: {
		type: String,
		required: true,
		enum: ['PSD', 'AI', 'PNG', 'SVG'],
	},
	status: {
		type: String,
		required: true,
		enum: ['PENDING', 'PROCESSING', 'APPROVED', 'REJECTED'],
		default: 'PENDING',
	},
});

const Illustration = mongoose.model('Illustration', schema);

module.exports = Illustration;
