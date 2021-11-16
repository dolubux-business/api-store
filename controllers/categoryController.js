/** @format */

const router = require('express').Router()
const { response, request } = require('express')
const jwt = require('jsonwebtoken')

//Utils
const { categoryValidate } = require('../utils/validators/AssocValidate')

//Model
const Category = require('../models/Category')
const Product = require('../models/Product')

//Services
const { __USER__ } = require('../services/userService')

/*
 * *
 * *
 * *
 * *
 * *
 * Get All Category of current store
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Index = async (req = request, res = response) => {
  let __category = await Category.find()
  let categories = []

  try {
    if (!__category)
      return res.status(404).send({
        message: 'No category were found...',
        satut_code: 404,
      })

    for (let i = 0; i < __category.length; i++) {
      const _ = __category[i]

      const category = {
        _id: _._id,
        name: _.name,
        description: _.description,
        picture: _.picture,
        actived: _.actived,
        add_at: _.add_at,
      }

      categories.push(category)
    }

    res.send(categories)
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
 * Get One Category of current store
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Show = async (req = request, res = response) => {
  let __category
  let categories = []

  //Get All products
  __category = await Category.find({ id_user: req.params.store })
  if (!__category)
    return res.status(404).send({
      message: 'No products were found !',
      satut_code: 404,
    })

  //If products is empty
  if (__products.length === 0) return res.status(201).send(categories)

  try {
    for (let i = 0; i < __category.length; i++) {
      const _ = __category[i]

      const category = {
        _id: _._id,
        name: _.name,
        description: _.description,
        picture: _.picture,
        actived: _.actived,
        add_at: _.add_at,
      }

      categories.push(category)
    }

    res.send(categories)
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
 * Uplaod Category Image in current store
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Store = async (req = request, res = response) => {
  const category = await Category.findOne({ name: req.params.name })

  if (!category)
    return res.send({
      message: 'this category is not exists in the database',
      satut_code: 404,
    })

  if (!req.file) {
    return res.send({
      message: 'No files ',
      satut_code: 404,
    })
  }

  try {
    console.log(req.file.path)
    req.body.picture = req.file.filename

    const newCategoryImage = new Category({
      _id: category._id,
      picture: req.body.picture,
    })

    console.log(image)

    const updateImage = await Category.findOneAndUpdate(
      { _id: category._id },
      newCategoryImage,
      { new: true }
    )

    if (!updateImage)
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
const Create = async (req = request, res = response) => {
  const initCaty = req.body

  //Verifed the validation of page feild
  const { error } = await categoryValidate({
    name: initCaty.name,
    description: initCaty.description,
  })

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  const verify_if_caty_name_exist = await Category.findOne({
    name: initCaty.name,
  })
  console.log(verify_if_caty_name_exist)
  if (verify_if_caty_name_exist)
    return res.status(401).send({
      message: 'this category exists already in the database',
      satut_code: 401,
    })

  const token = jwt.decode(req.headers['auth_token'], {
    complete: true,
  })

  try {
    const newCategory = new Category({
      id_user: token.payload._id,
      name: initCaty.name,
      description: initCaty.description,
    })
    newCategory.save()

    res.status(201).send({ message: 'successfull', statut_code: 201 })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to create a product...',
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
 * Updated
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Update = async (req = request, res = response) => {
  const initCaty = req.body

  //Verifed the validation of page feild
  const { error } = await categoryValidate({
    name: initCaty.name,
    description: initCaty.description,
  })

  if (error)
    return res.status(400).send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  const category = await Category.findOne({ name: req.params.name })
  if (!category)
    return res.status(404).send({
      message: 'this category not exists in the database',
      satut_code: 404,
    })
  try {
    const newCategory = new Category({
      _id: category._id,
      name: initCaty.name,
      description: initCaty.description,
    })

    await Category.findOneAndUpdate({ name: category.name }, newCategory)

    res.status(201).send({ message: 'successfull', statut_code: 201 })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! unable to update this product...',
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
 * Destory
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Destory = async (req = request, res = response) => {
  const category = await Category.findOne({ name: req.params.name })
  if (!category)
    return res.status(404).send({
      message: 'this category not exists in the database',
      satut_code: 404,
    })

  try {
    await Category.findOneAndRemove({ name: req.params.name })

    const ALL_PRODUCT_ASSOCIED_CATEGORY = await Product.find({
      id_category: category._id,
    })
    console.log(ALL_PRODUCT_ASSOCIED_CATEGORY)
    for (let i = 0; i < ALL_PRODUCT_ASSOCIED_CATEGORY.length; i++) {
      const el = ALL_PRODUCT_ASSOCIED_CATEGORY[i]
      await Product.findOneAndRemove({ id_category: el.id_category })
    }

    res.status(201).send({ message: 'successfull', statut_code: 201 })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! unable to remove this product...',
      satut_code: 500,
    })
  }
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
  Destory,
}
