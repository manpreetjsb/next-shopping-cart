import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../utils/db'
import Product from '../../models/Product'
import data from '../../utils/data'
import User from '../../models/User'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  await db.connect()
  await User.deleteMany()
  await User.insertMany(data.users)
  await Product.deleteMany()
  await Product.insertMany(data.products)
  await db.disconnect()
  res.send({ message: 'inserted successfully' })
})

export default handler
