import { db } from 'database'
import { User } from 'models'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
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
    case 'POST':
      return registerUser(req, res)

    default:
      res.status(400).json({ message: 'Bad request' })
      break
  }
}
const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { email = '', password = '', name = '' } = req.body as { email: string; password: string; name: string }

  if (password.trim().length < 6) {
    return res.status(400).json({ message: 'Password must have at least 6 characters' })
  }
  if (name.trim().length < 3) {
    return res.status(400).json({ message: 'Name must have at least 2 characters' })
  }
  //TODO: Validate E-Mail

  await db.connect()
  const user = await User.findOne({ email })

  if (user) {
    await db.disconnect()
    return res.status(400).json({ message: 'User not valid - Exists' })
  }

  const newUser = new User({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password: bcrypt.hashSync(password.trim()),
    role: 'client',
  })
  try {
    await newUser.save({ validateBeforeSave: true })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Review server logs' })
  }
  const { _id, role } = newUser
  const token = jwt.signToken(_id, email)
  return res.status(200).json({
    token,
    user: {
      email,
      name,
      role,
    },
  })
}
