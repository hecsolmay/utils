const jwt = require('jsonwebtoken')

const jwt = require('jsonwebtoken')
const { secret, expires } = require('../config')

const tokenSign = data => jwt.sign(data, secret, { expiresIn: expires })

const tokenVerify = token => jwt.verify(token, secret)

const tokenDecode = token => jwt.decode(token)

module.exports = {
  tokenSign,
  tokenDecode,
  tokenVerify
}
