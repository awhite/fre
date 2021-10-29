import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'

import routes from './routes'

const app = express()
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(cors())

app.use('/', routes)

app.listen(process.env.API_PORT, () => {
  console.log(`Listening on port ${process.env.API_PORT}`)
})
