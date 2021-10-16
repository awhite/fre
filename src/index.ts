import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app = express()
app.use(cookieParser())
app.use(morgan('tiny'))

app.get('/', async (req, res) => {
  console.log('Welcome to TS Node. Edit src/index.ts to get started.')
  res.send('Welcome to TS Node. Edit src/index.ts to get started.')
})

app.listen(8080, () => {
  console.log('hello world')
})
