import nc from 'next-connect'
import Order from '../../../../models/order'
import db from '../../../../utils/db'
import { NextApiRequest, NextApiResponse } from 'next'
import { isAuth } from '../../../../utils/auth'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.use(isAuth)

handler.get(async (req, res) => {
  await db.connect()
  const order = await Order.findById(req.query.id)
  await db.disconnect()
  res.send(order)
})

export default handler
