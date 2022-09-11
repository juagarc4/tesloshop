import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable'
import fs from 'fs'

type Data = {
  message: string
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return uploadFile(req, res)

    default:
      res.status(400).json({ message: 'Bad Request' })
  }
}

const uploadFile = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await parseFile(req)
}

const saveFile = async (file: formidable.File) => {
  const data = fs.readFileSync(file.filepath)
  fs.writeFileSync(`./public/${file.originalFilename}`, data)
  fs.unlinkSync(file.filepath)
  return
}
const parseFile = async (req: NextApiRequest) => {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm()

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      await saveFile(files.file as formidable.File)
      resolve(true)
    })
  })
}
