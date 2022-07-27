import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from 'database'
import { User } from 'models'
import { jwt } from 'utils'

type Data =
  | {
      message: string
    }
  | {
      token: string
      user: {
        email: string
        name: string
        role: string
      }
    }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return checkJWT(req, res)

    default:
      res.status(400).json({ message: 'Bad request' })
      break
  }
}
const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = '' } = req.cookies
  let userId = ''

  try {
    userId = await jwt.isValidToken(token)
  } catch (error) {
    return res.status(401).json({ message: 'Auth token is not valid' } as any)
  }
  await db.connect()
  const user = await User.findById(userId).lean()
  await db.disconnect()

  if (!user) {
    res.status(400).json({ message: 'User not valid - EMAIL' })
  }

  const { _id, email, role, name } = user

  return res.status(200).json({
    token: jwt.signToken(_id, email),
    user: {
      email,
      role,
      name,
    },
  })
}
