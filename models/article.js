const mongoose = require('mongoose');

const schema = new mongoose({
	title: {
		type: String,
		required: true,
		minLength: 1,
		maxLength: 256,
	},
	category: String,
	wordCount: Number,
	content: {
		type: String,
		validate: {
			validator: (val) => {
				return this.wordCount > val.split(' ').length + 10;
			},
			message: `Current Word-count: ${this.wordCount}, Required: ${val}`,
		},
	},
	status: {
		type: String,
		required: true,
		enum: ['PENDING', 'PROCESSING', 'APPROVED', 'REJECTED'],
		default: 'PENDING',
	},
});

const Article = mongoose.model('Article', schema);

module.exports = Article;
