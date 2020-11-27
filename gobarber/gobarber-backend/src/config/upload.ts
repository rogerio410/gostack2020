import path from 'path'
import multer from 'multer'
import crypto from 'crypto'

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp')

export default {
  tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}-${file.originalname}`
      return callback(null, filename)
    },
  }),
}
