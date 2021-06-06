const {Router} = require('express')
const createError = require('http-errors')

const Comment = require('../models/Comment')

const router = Router()

// Get list of all comments
router.get('/', async (req, res) => {
	try {
		const {filter} = req.query

		const comments = await Comment.find(filter && {status: filter})
		const commentsCount = await Comment.find({status: 'pending for review'}).countDocuments()

		res.json({comments, commentsCount})
	} catch (e) {
		return createError(500, 'Something went wrong during comments fetching')
	}
})

// router.post('/edit', async )

module.exports = router
