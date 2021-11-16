/** @format */

const router = require('express').Router()
const { response, request } = require('express')
const Profile = require('../models/Profile')
const Shop = require('../models/Shop')
const User = require('../models/User')
const { __USER__ } = require('../services/userService')

/*
 * *
 * *
 * *
 * *
 * *
 * Index
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Index = async (req = request, res = response) => {}

/*
 * *
 * *
 * *
 * *
 * *
 * Show
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Show = async (req = request, res = response) => {
  const __store = await Shop.findOne({
    name: req.params.store_name,
  })
  const _ = __store

  try {
    if (!_)
      return res.status(404).send({
        message: 'No products were found ! Thank you try again later...',
        satut_code: 404,
      })

    const user = await user.findOne({ _id: _.id_user })

    const data = {
      owner: user,
      profile: {
        first_name: _.first_name,
        last_name: _.last_name,
        avatar: _.avatar,
      },
      store: {
        name: _.store_name,
        logo: _.store_logo,
        order_contacts: _.store_order_contacts,
      },
      bio: _.bio,
    }

    res.status(201).send({ data })
  } catch (error) {
    console.log(error)
    res.send({
      message: 'an error occurred impossible to recover the products..',
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
 * Profile Change Avatar
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Store = async (req = request, res = response) => {
  const { user } = await __USER__(req, res)

  req.body.logo = req.file.path

  try {
    const imageProfile = new Shop({
      _id: user._id,
      avatar: req.body.logo,
    })

    const updateImageProfile = await User.findOneAndUpdate(
      { _id: user._id },
      imageProfile,
      { new: true }
    )

    if (!updateImageProfile)
      return res.send({
        message: 'the request was executed, but cannot upload this picture',
        satut_code: 400,
      })

    res.send(req.file)
  } catch (error) {
    console.log(error)
  }
}

/*
 * *
 * *
 * *
 * *
 * *
 * Created
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Create = async (user, crypto) => {
  let u = user._id
  const store = new Shop({
    id_user: user._id,
    name: `${Math.floor(Math.random() * 9925993399)}${u
      .toString()
      .substring(u.toString().length - 3, u.toString().length)}${crypto
      .randomBytes(16)
      .toString('hex')}:likidon`,
  })
  return { store }
}

/*
 * *
 * *
 * *
 * *
 * *
 * Updated
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Update = async (req = request, res = response) => {
  const { user } = __USER__(req, res)

  const UpdateProfile = await Profile.findOneAndUpdate({}, {}, { new: false })
}

/*
 * *
 * Export All Module
 * *
 */
module.exports = {
  Index,
  Show,
  Store,
  Create,
  Update,
}
