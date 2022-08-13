import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { Grain } from '@mui/icons-material'
import { IPaypal } from 'interfaces'
import { db } from 'database'
import { Order } from 'models'

type Data = {
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res)

    default:
      return res.status(400).json({ message: 'Bad request' })
  }
}
const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const body = new URLSearchParams('grant_type=client_credentials')
  const base64Token = Buffer.from(`${PAYPAL_CLIENT}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL || '', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${base64Token}`,
      },
    })
    return data.access_token
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data as { message: string })
    } else {
      console.log(error)
    }
    return null
  }
}

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  //TODO: Validate user session
  //TODO: Validate MongoId
  const payPalBearerToken = await getPaypalBearerToken()
  if (!payPalBearerToken) {
    return res.status(400).json({ message: 'Paypal token could not be confirmed' })
  }

  const { transactionId = '', orderId = '' } = req.body

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${payPalBearerToken}`,
      },
    }
  )

  if (data.status !== 'COMPLETED') {
    return res.status(400).json({ message: 'Unknown Order' })
  }

  await db.connect()
  const dbOrder = await Order.findById(orderId)
  if (!dbOrder) {
    await db.disconnect()
    return res.status(400).json({ message: 'Unknown Order in our DB' })
  }

  if (dbOrder.isPaid) {
    await db.disconnect()
    return res.status(400).json({ message: 'Order already paid' })
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect()
    return res.status(400).json({ message: 'Order amount differs from amount paid on PayPal' })
  }

  dbOrder.transactionId = transactionId
  dbOrder.isPaid = true
  dbOrder.save()
  await db.disconnect()

  return res.status(200).json({ message: 'Order paid' })
}
