// Creando una conneccion a la base de datos de mongodb con mongoose

const mongoose = require('mongoose')
const Config = require('../config/config')

mongoose.set('strictQuery', false)

const connect = async () => {
  await mongoose.connect(Config.mongoUri, {})
  console.log('connected to database')
  const db = mongoose.connection
  db.once('connected', () => {
    console.log('Mongoose connection opened.')
  })
}

connect().catch(err => {
  console.error(err)
})
