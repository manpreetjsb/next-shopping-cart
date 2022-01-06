// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
//import db from '../../utils/db'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //await db.connect()
  //await db.disconnect()
  res.status(200).json({ name: 'John Doe' })
}
