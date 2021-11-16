/** @format */

const { response, request } = require('express')

//Utils
const { productValidate } = require('../utils/validators/AssocValidate')
const { error_catch } = require('../utils/error_500')

//Model
const Category = require('../models/Category')
const User = require('../models/User')
const Product = require('../models/Product')

//Controlers

//Services & Helpers
const { req_product } = require('../helpers/resquest_products')
const { __USER__, __DATA_PRODUCT__ } = require('../services/userService')

/*
 * *
 * *
 * *
 * *
 * *
 * Get all Products of current store
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Index = async (req = request, res = response) => {
  let __products
  let products = []

  //Get All products
  __products = await Product.find({ id_store: req.params.store })
  if (!__products)
    return res.status(404).send({
      message: 'No products were found !',
      satut_code: 404,
    })

  //If products is empty
  if (__products.length === 0) return res.status(201).send(products)

  try {
    for (let i = 0; i < __products.length; i++) {
      const _ = __products[i]

      await __DATA_PRODUCT__(User, Category, _, products)
    }

    res.send(products)
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
 * Get one Product of current store
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Show = async (req = request, res = response) => {
  const __product = await Product.findOne({ slug: req.params.slug })
  let product = []
  const _ = __product

  try {
    if (!__product)
      return res.status(404).send({
        message: 'No products were found ! Thank you try again later...',
        satut_code: 404,
      })

    await __DATA_PRODUCT__(User, Category, _, product)

    res.send(product)
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
 * Products upload image
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Store = async (req = request, res = response) => {
  //Verifed if the slug value exist in database
  const __PRODUCT__ = await Product.findOne({
    slug: req.params.slug,
  })

  console.log(__PRODUCT__)

  if (!__PRODUCT__) {
    return res.send({
      message: 'Sorry ! this page were not found...',
      satut_code: 404,
    })
  }

  try {
    req.body.images = req.files

    const newProduct = new Product({
      _id: __PRODUCT__._id,
      images: req.body.images,
    })

    const updateImageProfile = await Product.findOneAndUpdate(
      { _id: __PRODUCT__._id },
      newProduct,
      { new: true }
    )

    if (!updateImageProfile)
      return res.send({
        message: 'the request was executed, but cannot upload this picture',
        satut_code: 400,
      })

    res.send(req.files)
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
  const initProduct = req.body

  const category = await Category.findOne({ name: initProduct.id_category })
  if (!category) {
    return res.status(400).send({
      message:
        'Cannot create this product without associating it with a category.',
      satut_code: 400,
    })
  }

  //Verifed the validation of page feild
  const { error } = await productValidate(initProduct)
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  try {
    //Create a new instance of products
    const newProduct = new Product(await req_product(req, res, initProduct))
    const slug_exits = await Product.findOne({ slug: newProduct.slug })

    if (slug_exits) {
      return res.status(401).send({
        message: 'this slug already exists in the database',
        satut_code: 401,
      })
    }

    await newProduct.save() //Send product in database

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
  const initProduct = req.body

  //Verifed the validation of page feild
  const { error } = await productValidate(initProduct)
  if (error)
    return res.send({
      error: {
        message: error.details[0].message,
        path: error.details[0].context.label,
      },
    })

  //Verifed if the slug value exist in database
  const product = await Product.findOne({
    slug: req.params.slug,
  })

  if (!product) {
    return res.send({
      message: 'Sorry ! this page were not found...',
      satut_code: 404,
    })
  }

  const category = await Category.findOne({ name: initProduct.id_category })
  if (!category) {
    return res.status(404).send({
      message: 'this category not exists in the database.',
      satut_code: 404,
    })
  }

  try {
    //Create a new instance of products
    const newProduct = new Product(
      await req_product(req, res, initProduct, product._id)
    )

    //Send product in database
    const __updated__ = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      newProduct,
      { new: false }
    )
    // Handle any possible database errors
    if (!__updated__)
      return res.status(400).send({
        message: 'the request was executed, but cannot modify this product',
        satut_code: 400,
      })
    return res.status(201).send({
      message: 'successfull',
      statut_code: 201,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to modify a product...',
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
  //Verifed if the slug value exist in database
  const product = await Product.findOne({
    slug: req.params.slug,
  })

  if (!product) {
    return res.status(404).send({
      message: 'Sorry ! this page were not found...',
      satut_code: 404,
    })
  }

  try {
    const __destroy__ = await Product.findOneAndRemove({
      slug: req.params.slug,
    })

    if (!__destroy__)
      return res.status(400).send({
        message: 'the request was executed, but cannot remove this product',
        satut_code: 400,
      })
    return res.status(201).send({
      message: 'successfull',
      statut_code: 201,
    })
  } catch (error) {
    error_catch(
      res,
      error,
      'An error occured ! impossible to remove this product...'
    )
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
