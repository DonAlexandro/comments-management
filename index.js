require('dotenv').config()

const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const socketio = require('socket.io')

const Comment = require('./models/Comment')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const MONGO_URI = process.env.NONGO_URI

app.use('/comments', require('./routes/comments'))

io.on('connection', socket => {
	socket.on('createComment', async ({name: username, text}, callback) => {
		if (!username || !text) {
			callback({error: 'You should enter your name and text of the comment'})
		}

		try {
			const comment = await Comment.create({username, text})

			io.emit('newComment', comment)
		} catch (e) {
			callback({error: 'Something went wrong during comment adding'})
		}
	})

	socket.on('approveComment', async (id, callback) => {
		try {
			const comment = await Comment.findOne({_id: id})

			comment.status = 'approved'

			await comment.save()

			io.emit('approveComment', comment)
		} catch (e) {
			callback({error: 'Something went wrong during comment approving'})
		}
	})

	socket.on('deleteComment', async (id, callback) => {
		try {
			await Comment.deleteOne({_id: id})

			io.emit('deleteComment')
		} catch (e) {
			callback({error: 'Something went wrong during comment deleting'})
		}
	})

	io.on('disconnect', () => {
		console.log('You have disconnected from socket server')
	})
})

async function start() {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})

		server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	} catch (e) {
		console.log('FATAL ERROR', e)
		process.exit(1)
	}
}

start()
