import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'

import { getRandomEpisodeForShow, searchShows } from './lib/tmdb'

const app = express()
app.use(cookieParser())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', async (req, res) => {
  console.log('Welcome to TS Node. Edit src/index.ts to get started.')
  res.send('Welcome to TS Node. Edit src/index.ts to get started.')
})

app.get('/search', async (req, res) => {
  if (typeof req.query.query !== 'string') {
    res.sendStatus(400)
    return
  }
  const resultsList = await searchShows(req.query.query)
  const showSelections = resultsList.map(
    ({ name, id }: { name: string; id: number }) => ({ name, id })
  )
  res.json(showSelections)
})

app.get('/show/:showId/episode/random', async (req, res) => {
  const { showId } = req.params
  const randomEpisode = await getRandomEpisodeForShow(parseInt(showId))

  res.json(randomEpisode)
})

app.listen(8080, () => {
  console.log('hello world')
})
