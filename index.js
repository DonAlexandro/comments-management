require('dotenv').config()

const express = require('express')
const app = express()
const eWs = require('express-ws')(app)
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
const MONGO_URI = process.env.NONGO_URI

async function start() {
	try {
		await mongoose.connect(MONGO_URI, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})

		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	} catch (e) {
		console.log('FATAL ERROR', e)
		process.exit(1)
	}
}

start()
