// ## Para usar sequelize debemos instalar
// npm i sequelize
// npm i mysql2

const { Sequelize } = require('sequelize')
const config = require('../config')

const db = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql'
})

function createTables () {
  const User = require('../models/Users')
  const UserTypes = require('../models/Types')

  // 1:N UserTypes has many users and a User has one UserType

  UserTypes.hasMany(User, {
    as: 'users',
    foreignKey: { allowNull: false, name: 'typeId', field: 'type_id' }
  })
  User.belongsTo(UserTypes, {
    as: 'rol',
    foreignKey: { allowNull: false, name: 'typeId', field: 'type_id' }
  })

  //   N:M un usario pertecene a varios Test y un Test puede tener varios Usuarios
  User.belongsToMany(Test, {
    through: TestUsers,
    foreignKey: { allowNull: false, name: 'userId', field: 'user_id' }
  })
  Test.belongsToMany(User, {
    through: TestUsers,
    foreignKey: { allowNull: false, name: 'testId', field: 'test_id' }
  })
}

async function startConnection () {
  try {
    await db.authenticate()
    createTables()
    await db.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startConnection()

module.exports = {
  db
}
