import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidObjectId } from 'mongoose'
import { db } from 'database'
import { User } from 'models'
import { IUser } from 'interfaces'

type Data =
  | {
      message: string
    }
  | IUser[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res)

    case 'PUT':
      return updateUser(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect()
  const users = await User.find().select('-password').lean()
  await db.disconnect()

  return res.status(200).json(users)
}

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId = '', role = '' } = req.body

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ message: 'User does not exist' })
  }
  const validRoles = ['admin', 'super-user', 'SEO', 'client']
  if (!validRoles.includes(role)) {
    return res
      .status(400)
      .json({ message: `Role not allowed ${role} does not exist. Allowed roles: ${validRoles.join(',')}` })
  }

  await db.connect()
  const user = await User.findById(userId)
  if (!user) {
    await db.disconnect()
    return res.status(400).json({ message: 'User does not exist' })
  }

  user.role = role
  await user.save()
  await db.disconnect()
  return res.status(200).json({ message: 'User updated' })
}
