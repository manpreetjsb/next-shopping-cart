import nc from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'
import db from '../../../utils/db'
import Product from '../../../models/Product'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  await db.connect()
  const products = await Product.find({})
  await db.disconnect()
  res.send(products)
})

export default handler
