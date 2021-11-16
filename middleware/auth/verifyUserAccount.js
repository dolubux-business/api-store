/** @format */

const { response } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

const verifyUserAccount = async (req, res = response, next) => {
  //Get user who create product
  const __Token__ = jwt.decode(req.headers['auth_token'], {
    complete: true,
  })

  const __ID_TOKEN__ = __Token__.payload._id
  const __USER__ = await User.findOne({ _id: __ID_TOKEN__ })

  if (__ID_TOKEN__ != __USER__._id)
    return res.status(401).send({ message: 'Acces Denid', satut_code: 401 })

  next()
}

module.exports = verifyUserAccount
