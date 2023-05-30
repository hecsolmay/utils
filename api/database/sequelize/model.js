// Crear un model para sequelize con un Id UUID crear un usuario y encryptar su contraseña

const { DataTypes } = require('sequelize')
const bcrypt = require('bcryptjs')

const { db } = require('../database')

const User = db.define(
  'users',
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING({ length: 100 }),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING({ length: 100 }),
      defaultValue: ''
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'fullname'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      default: null,
      field: 'phone_number'
    },
    rememberToken: {
      type: DataTypes.STRING,
      default: null,
      field: 'remember_token'
    }
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(user.password, salt)
        user.fullname = `${user.name} ${user.lastname}`.trim()
      },
      beforeUpdate: async function (user) {
        console.log(user.name)
        console.log(user.lastname)
        user.set('fullname', `${user.name} ${user.lastname}`.trim())
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hash(user.password, salt)
        }
      }
    }
  }
)

User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

module.exports = User
