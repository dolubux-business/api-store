/** @format */

const jwt = require('jsonwebtoken')
const slug = require('slug')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Profile = require('../models/Profile')
const Shop = require('../models/Shop')
const User = require('../models/User')
const { __USER__ } = require('../services/userService')

module.exports.req_product = async (
  req,
  res,
  initProduct,
  uid_product = null
) => {
  //Get user who create product
  const { user } = await __USER__(req, res)

  let product = await Product.find()
  let category = await Category.findOne({ name: initProduct.id_category })
  let store = await Shop.findOne({ id_user: user._id })

  const len_product = uid_product === null ? product.length + 1 : product.length

  const data = {
    id_owner: user._id,
    id_category: category._id,
    id_store: store._id,
    slug: `${slug(`${initProduct.name}`)}-${len_product}@${
      user.username
    }:likidon-dolubux`,
    name: initProduct.name,
    description: initProduct.description,
    unit_stock: initProduct.unit_stock,
    unit_price: initProduct.unit_price,
    size: initProduct.size,
    color: initProduct.color,
    images: initProduct.images,
    available: initProduct.available,
    available_discount: initProduct.available_discount,
    discounts: initProduct.discounts,
  }

  uid_product != null ? (data._id = uid_product._id) : false
  uid_product === null ? (data.store = req.params.store) : false
  return data
}
