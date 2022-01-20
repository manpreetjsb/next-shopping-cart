import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils/db'
import Order from '../../../models/order'
import { onError } from '../../../utils/error'
import { isAuth } from '../../../utils/auth'

const handler = nc<NextApiRequest, NextApiResponse>({ onError })

handler.use(isAuth)

handler.get(async (req, res) => {
  await db.connect()
  const orders = await Order.find({ user: req.user._id })

  res.send(orders)
})

export default handler
