import jwt from 'jsonwebtoken'

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error('There is no JWT seed. Please review environment variables in your .env file')
  }

  return jwt.sign({ _id, email }, process.env.JWT_SECRET_SEED, { expiresIn: '30m' })
}
