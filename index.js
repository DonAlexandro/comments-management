const express = require('express')
const app = express()
const eWs = require('express-ws')(app)
const cors = require('cors')

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
