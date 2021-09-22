const Cookie = require('cookie')
const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Profile = require('../models/profile')
const { ProfileValidation } = require('../helpers/validators/profileValidate')

/*
 *HANDLE OF PROFILE USER AND OF THE ONLINE STORE
 * Index
 */
router.get('/:username', async (req, res) => {
   //checking if a user is sign in
   const __Token__ = req.headers['auth_token']
   if (!__Token__)
      return res
         .status(401)
         .send('Authentication is required to access the resource.')

   // Found the current profile
   const currentProfile = await User.findOne({ username: req.params.username })
   if (!currentProfile)
      return res.status(404).send('This profile is not found...')

   //Identify the user connected
   const { payload } = jwt.decode(__Token__, { complete: true })
   const ownerProfile = currentProfile._id === payload._id ? true : false

   try {
      res.send({ owner: currentProfile, ownerProfile })
   } catch (error) {
      res.send('An error occured ! ...')
   }
})

/*
 *HANDLE OF PROFILE USER AND OF THE ONLINE STORE
 * Updated
 */
router.post('/update', async (req, res) => {
   //checking if a user is sign in
   const cookies = Cookie.parse(req.headers.cookie || '')
   const __Token__ = cookies['auth_token']
   if (!__Token__)
      return res
         .status(401)
         .send('Authentication is required to access the resource.')

   //Identify the user connected
   const { payload } = jwt.decode(__Token__, { complete: true })
   const { error } = await ProfileValidation(req.body)
   if (error)
      return res.status(422).send({
         error: {
            label: error.details[0].context.label,
            message: error.details[0].message,
         },
      })

   // Found and update the current profile
   const filter = { _id_user: payload._id }
   const updateProfile = await Profile.findOneAndUpdate(filter, updateProfile, {
      new: true,
   })

   try {
      res.status(201).send({ updateProfile })
   } catch (error) {
      res.status(400).send('An error occured ! ...')
   }
})

module.exports = router
