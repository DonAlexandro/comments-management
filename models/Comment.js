const {Schema, model} = require('mongoose')

const commentSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	text: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: 'pending for review',
	},
})

module.exports = model('Comment', commentSchema)
