import path from 'path'
import multer, { StorageEngine } from 'multer'
import crypto from 'crypto'

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  driver: 's3' | 'disk'

  tempFolder: string
  uploadFolder: string

  multer: {
    storage: StorageEngine
  }
  config: {
    disk: any
    aws: {
      bucket: string
    }
  }
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tempFolder,
  uploadFolder: path.resolve(tempFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const filename = `${fileHash}-${file.originalname}`
        return callback(null, filename)
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'app-gobarber-2',
    },
  },
} as IUploadConfig
