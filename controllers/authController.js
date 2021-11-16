/** @format */

const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { default: axios } = require('axios')
const crypto = require('crypto')
const moment = require('moment')

//Models
const User = require('../models/User')
const RestPassword = require('../models/RestPassword')

//Controller
const profileController = require('../controllers/profileController')
const storeController = require('./shopController')

//Validate
const {
  SignUpValidation,
  SignInValidation,
  SignForgetPasswordValidation,
  SignChangePasswordValidation,
} = require('../utils/validators/authValidate')
const Subscription = require('../models/Subscription')

/*
 * *
 * *
 * *
 * *
 * *
 * HANDLE : SIGN UP
 * *
 * *
 * *
 * *
 * *
 * *
 */
const SignUp = async (req, res) => {
  const initUp = req.body

  //Check if the data contains an error
  const { error } = await SignUpValidation(initUp)
  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  //Checking if usename exist in the database
  const usernameExist = await User.findOne({ username: initUp.email })
  if (usernameExist)
    return res.status(401).send({
      error: {
        message: 'This username is already taken',
        path: 'username',
      },
    })

  //Checking if email exist in the database
  const emailExist = await User.findOne({ email: initUp.email })
  if (emailExist)
    return res.send({
      error: {
        message: 'This email is already taken',
        path: 'email',
      },
    })

  //Hash the password with bcrypt
  const salt = await bcrypt.genSalt(10)
  const HashPassword = await bcrypt.hash(req.body.password, salt)

  //Creating a new user
  const user = new User({
    username: req.body.username.trim().toLowerCase(),
    email: req.body.email,
    password: HashPassword,
  })

  //Creating a new profile
  const { profile } = await profileController.Create(user)

  //Creating a new profile
  const { store } = await storeController.Create(user, crypto)

  //Creating a new profile
  const restPassword = new RestPassword({
    id_user: user._id,
  })

  //Creating a new profile
  const subFreemiun = new Subscription.Freemiun({
    id_user: user._id,
  })

  try {
    const savedUser = await user.save() //Insert user in database
    const savedProfile = await profile.save() //Insert profile in database
    const savedRestPassword = await restPassword.save() //Insert profile in database
    const savedSubFreemiun = await subFreemiun.save()
    let savedStore

    if (savedUser.role === 'store') {
      savedStore = await Shop.save() //Insert store in database

      return res.status(201).send({
        success: {
          savedUser,
          savedProfile,
          savedRestPassword,
          savedStore,
          savedSubFreemiun,
        },
        error: null,
      })
    }

    res.status(201).send({
      success: { savedUser, savedProfile, savedRestPassword },
      error: null,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to created user...',
      satut_code: 500,
    })
  }
}

/*
 * *
 * *
 * *
 * *
 * *
 * HANDLE : SIGN IN
 * *
 * *
 * *
 * *
 * *
 * *
 */

const SignIn = async (req = request, res = response) => {
  //Check if the data contains an error
  const initIn = req.body
  const { error } = await SignInValidation(initIn)
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  const user = await User.findOne({ email: initIn.email })

  //Checking if password is not valid
  const isvalidPass = await bcrypt.compare(req.body.password, user.password)
  if (!isvalidPass)
    return res.send({
      error: {
        message: 'Email or password is wrong',
        path: ['email'],
      },
    })

  try {
    //Generate a new token and sign current user
    const __Token__ = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: '24h',
    })
    res.header('auth_token', __Token__).send(__Token__)
  } catch (error) {
    res.send('An error occured ! impossible to connected...')
  }
}

/*
 * *
 * *
 * *
 * *
 * *
 * HANDLE : SIGN OUT
 * *
 * *
 * *
 * *
 * *
 * *
 */
const SignOut = async (req, res) => {
  //Delete the current token for deconnected user!

  try {
    res.header('auth_token', '').send('Sign out with sucessfull')
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to deconnexion...',
      satut_code: 500,
    })
  }
}

/*
 * *
 * *
 * *
 * *
 * *
 * HANDLE : FORGET PASSWORD
 * *
 * *
 * *
 * *
 * *
 * *
 */
const SignForgetPassword = async (req, res) => {
  //Check if the data contains an error
  const initFo = req.body
  const { error } = await SignForgetPasswordValidation(initFo)
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  try {
    const user = await User.findOne({ email: initFo.email })
    //Checking if password is not valid
    if (!user)
      return res.send({
        error: {
          message: 'Email or password is wrong',
          path: ['email'],
        },
      })

    token = crypto.randomBytes(32).toString('hex')

    axios.post('http://localhost:3000/api/mailler/auth', {
      nameClient: user.username,
      emailClient: user.email,
      subClient: 'Forget Password',
      msgClient: `http://localhost:3000/password/change?id_user=${user._id}&token=${token}`,
    })

    console.log(
      `http://localhost:3000/password/change?id_user=${user._id}&token=${token}`
    )

    const mailler = await RestPassword.findOneAndUpdate(
      { id_user: user._id },
      {
        restPasswordToken: token,
        expire: moment.utc().add(1, 'day'),
      },
      { new: true }
    )

    res.status(201).send(mailler)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to rest password...',
      satut_code: 500,
    })
  }
}

/*
 * *
 * *
 * *
 * *
 * *
 * HANDLE : CHANGE PASSWORD
 * *
 * *
 * *
 * *
 * *
 * *
 */
const SignChangePassword = async (req = request, res = response) => {
  //Check if the data contains an error
  const initCh = req.body

  const { id_user, token } = req.query

  const restPassword = await RestPassword.findOne({
    restPasswordToken: token,
  })

  if (!restPassword) {
    return res.status(404).send({
      message: 'this user not exists in the database.',
      satut_code: 404,
    })
  }

  let dnow = moment.utc().toDate()
  const isafter = moment(dnow).isAfter(restPassword.expire)

  if (isafter === true) {
    return res.status(401).send({
      message: 'The token to have expired',
      satut_code: 401,
    })
  }

  const { error } = await SignChangePasswordValidation(initCh)
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  try {
    //Hash the password with bcrypt
    const salt = await bcrypt.genSalt(10)
    const HashNewPassword = await bcrypt.hash(initCh.new_password, salt)

    //Updating the password
    const newPassword = await User.findOneAndUpdate(
      { _id: id_user },
      {
        password: HashNewPassword,
      },
      { new: false }
    )

    const SavedNewPassword = await newPassword.save()

    res.status(201).send({ SavedNewPassword })
  } catch (error) {}
}

module.exports = {
  SignUp,
  SignIn,
  SignOut,
  SignForgetPassword,
  SignChangePassword,
}
