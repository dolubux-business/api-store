/** @format */

const { response, request } = require('express')

//Utils

//Model
const Profile = require('../models/Profile')
const User = require('../models/User')

//Controlers

//Services & Helpers
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
  const profile = await Profile.findOne({
    username: req.params.username,
  })
  const user = await user.findOne({ _id: profile.id_user })

  try {
    const data = {
      id: profile._id,
      owner: user,
      first_name: profile.first_name,
      last_name: profile.last_name,
      avatar: profile.avatar,
      preference: profile.preference,
      created_at: profile.created_at,
      modify_at: profile.modify_at,
    }

    res.status(201).send({ data })
  } catch (error) {
    console.log(error)
    res.send({
      error: {
        message: 'an error occurred impossible to recover the products..',
        satut_code: 500,
      },
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

  req.body.avatar = req.file.path

  try {
    const imageProfile = new User({
      _id: user._id,
      avatar: req.body.avatar,
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
const Create = async (user) => {
  const profile = new Profile({
    id_user: user._id,
  })
  return { profile }
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
  const initPro = req.body

  try {
    const UpdateProfile = await Profile.findOneAndUpdate(
      { id_user: user.id_user },
      {
        first_name: initPro.first_name,
        last_name: initPro.last_name,
        preference: initPro.preference,
        modify_at: moment.utc(),
      },
      { new: true }
    )

    const savedUpdateProfile = await UpdateProfile.save()

    res.status(201).send({
      error: null,
      data: savedUpdateProfile,
      satut_code: 201,
    })
  } catch (error) {
    console.log(error)
    res.send({
      error: true,
      message: 'an error occurred impossible to update this profile..',
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
 * Delete the account of user
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Destory = async (req = request, res = response) => {}

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
  Destory,
}
