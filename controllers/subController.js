/** @format */

const { response, request } = require('express')
const { Premiun } = require('../models/Subscription')

//Model
const User = require('../models/User')
const { __USER__ } = require('../services/userService')

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
const Freemiun = async (req = request, res = response) => {
  const { user } = await __USER__(req, res)

  try {
    const freemiun = await Freemiun.findOneAndUpdate(
      {
        id_user: user._id,
      },
      {
        id_user: user._id,
      },
      { new: true }
    )
  } catch (error) {}
}

/*
 * *
 * *
 * *
 * *
 * *
 * New Client sub
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Premiun_NewClientSub = async (req = request, res = response) => {
  const { user } = await __USER__(req, res)

  try {
    const newClientSub = new Premiun({
      id_user: user._id,
      n_product: 100,
      n_category: 10,
      sub_expire: moment.utc().add(29, 'day'),
      sub_month: 1,
    })
    const newClientSubSaved = newClientSub.save()

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        ispremiun: true,
      },
      { new: false }
    )

    res.status(201).send({
      error: null,
      success: true,
      data: newClientSubSaved,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to create a user premiun...',
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
 * Client renew the sub
 * *
 * *
 * *
 * *
 * *
 * *
 */
const Premiun_RenewSub = async (req = request, res = response) => {
  const { user, user_sub_premiun } = await __USER__(req, res)
  try {
    const premiun = await Premiun.findOneAndUpdate(
      { user_id: user._id },
      {
        id_user: user._id,
        n_product: 100,
        n_category: 10,
        sub_expire: moment().utc().add(29, 'day'),
        sub_month: user_sub_premiun.sub_month + 1,
      },
      { new: false }
    )

    await User.findOneAndUpdate(
      { _id: user._id },
      {
        ispremiun: true,
      },
      { new: false }
    )

    const isExpired = moment(premiun.created_at).isAfter(premiun.sub_expire)
    if (premiun.sub_month > 1 && isExpired === true) {
      await Premiun.findOneAndUpdate(
        { user_id: user._id },
        {
          sub_month: premiun.sub_month - 1,
        },
        { new: true }
      )
    } else if (premiun.sub_month > 1 && isExpired === false) {
      await Premiun.findOneAndUpdate(
        { user_id: user._id },
        {
          sub_month: premiun.sub_month + 1,
        },
        { new: true }
      )
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'An error occured ! impossible to renew the subscription...',
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
  Premiun_NewClientSub,
  Premiun_RenewSub,
}
