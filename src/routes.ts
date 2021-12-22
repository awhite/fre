import { Router } from 'express'

const router = Router()

import { getRandomEpisodeForShow, searchShows } from './lib/tmdb'

router.get('/', async (req, res) => {
  console.log('Welcome to TS Node. Edit src/index.ts to get started.')
  res.send('Welcome to TS Node. Edit src/index.ts to get started.')
})

router.get('/search', async (req, res) => {
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

router.get('/show/:showId/episode/random', async (req, res) => {
  const { showId } = req.params
  const randomEpisode = await getRandomEpisodeForShow(parseInt(showId))

  res.json(randomEpisode)
})

export default router
