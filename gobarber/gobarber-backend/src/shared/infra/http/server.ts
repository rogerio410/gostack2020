import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import routes from './routes'
import cors from 'cors'
import uploadConfig from '@config/upload'
import '@shared/infra/typeorm'
import '@shared/container'
import AppError from '@shared/errors/AppError'

const app = express()

app.use(express.json())
app.use(cors())

// static files
app.use('/files', express.static(uploadConfig.directory))

app.use(routes)

// Global Error Handler middleware
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

app.listen(3333, () => {
  console.log('🚀 App started on port 3333')
})
