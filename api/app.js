const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.use('/api/auth', require('./routes/auth.routes'))

module.exports = app
