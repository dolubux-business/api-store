/** @format */

const express = require('express')
const router = express.Router()

//Controllers
const authController = require('../controllers/authController')
const productController = require('../controllers/productController')
const categoryController = require('../controllers/categoryController')
const profileController = require('../controllers/profileController')
const subController = require('../controllers/subController')

//Mail
const authMailler = require('../maillers/authMailler')

//Middleware
const verifyToken = require('../middleware/auth/verifyToken')
const verifyUserAccount = require('../middleware/auth/verifyUserAccount')
const {
  oneUploadFile,
  multipleUploadFiles,
} = require('../services/ImageService')

/*
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Routes = (app) => {
  //auth
  router.post('/auth/sign-up', authController.SignUp)
  router.post('/auth/sign-in', authController.SignIn)
  router.get('/auth/sign-out', authController.SignOut)
  router.post('/auth/sign-forget-password', authController.SignForgetPassword)
  router.post('/auth/sign-change-password', authController.SignChangePassword)

  //Mailer
  router.post('/mailler/auth', authMailler.__ALL__)

  //Profile
  router.post(
    '/profile/:username',
    verifyToken,
    verifyUserAccount,
    profileController.Show
  )
  router.post(
    '/profile/update',
    verifyToken,
    verifyUserAccount,
    profileController.Update
  )
  router.post(
    '/profile/upload/avatar',
    verifyToken,
    verifyUserAccount,
    oneUploadFile,
    profileController.Store,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message })
    }
  )

  //Products
  router.get(
    '/product/',
    verifyToken,
    verifyUserAccount,
    productController.Index
  )
  router.get(
    '/product/show/:slug',
    verifyToken,
    verifyUserAccount,
    productController.Show
  )
  router.post(
    '/product/storage/image/:slug',
    verifyToken,
    verifyUserAccount,
    multipleUploadFiles,
    productController.Store,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message })
    }
  )
  router.post(
    '/product/create',
    verifyToken,
    verifyUserAccount,
    productController.Create
  )
  router.patch(
    '/product/update/:slug',
    verifyToken,
    verifyUserAccount,
    productController.Update
  )
  router.delete(
    '/product/destroy/:slug',
    verifyToken,
    productController.Destory
  )

  //Category
  router.get(
    '/category/',
    verifyToken,
    verifyUserAccount,
    categoryController.Index
  )
  router.get(
    '/category/show/:name',
    verifyToken,
    verifyUserAccount,
    categoryController.Show
  )
  router.post(
    '/category/uplaod/image/:name',
    verifyToken,
    verifyUserAccount,
    oneUploadFile,
    categoryController.Store,
    (error, req, res, next) => {
      res.status(400).send({ error: error.message })
    }
  )
  router.post(
    '/category/create',
    verifyToken,
    verifyUserAccount,
    categoryController.Create
  )
  router.patch(
    '/category/update/:name',
    verifyToken,
    verifyUserAccount,
    categoryController.Update
  )
  router.delete(
    '/category/destroy/:name',
    verifyToken,
    verifyUserAccount,
    categoryController.Destory
  )

  //Subscription
  // router.get("/Subscription/freemiun", SubscriptionController);
  router.post(
    '/Subscription/premiun',
    verifyToken,
    verifyUserAccount,
    subController.Premiun_NewClientSub
  )

  //Return All routes
  app.use('/api/', router)
}

module.exports = Routes
