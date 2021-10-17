import { getShowDetails, getEpisodeForShow } from './tmdb'

describe('tmdb', () => {
  it('should get random i think you should leave', async () => {
    const showId = 88728
    const showDetails = (await getShowDetails(showId)) as Record<string, any>

    const randomEpisodeNum = Math.floor(
      Math.random() * showDetails.number_of_episodes
    )
    console.log(randomEpisodeNum)
    let episodeNum = randomEpisodeNum
    let seasonIndex = 0
    while (true) {
      const season = showDetails.seasons[seasonIndex]
      if (episodeNum < season.episode_count) break
      episodeNum -= season.episode_count
      seasonIndex++
    }

    const seasonNum = showDetails.seasons[seasonIndex].season_number
    console.log(seasonNum, episodeNum)
    console.log(await getEpisodeForShow(showId, seasonNum, episodeNum))
  })

  it('should get i think you should leave s01e04', async () => {
    const showId = 88728
    console.log(await getEpisodeForShow(showId, 1, 4))
  })
})
