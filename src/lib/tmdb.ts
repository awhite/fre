import http from './httpClient'

export async function searchShows(query: string) {
  const { data }: { data: Record<string, any> } = await http.get('/search/tv', {
    params: {
      page: '1',
      query,
      include_adult: 'false',
    },
  })

  return data.results
}

export async function getShowDetails(showId: number) {
  const { data } = await http.get(`/tv/${showId}`, {
    params: {},
  })

  return data
}

export async function getRandomEpisodeForShow(showId: number) {
  const showDetails = (await getShowDetails(showId)) as Record<string, any>

  const randomEpisodeNum =
    Math.floor(Math.random() * showDetails.number_of_episodes) + 1
  let episodeNum = randomEpisodeNum
  let seasonIndex = 0
  while (true) {
    const season = showDetails.seasons[seasonIndex]
    if (episodeNum <= season.episode_count) break
    episodeNum -= season.episode_count
    seasonIndex++
  }

  const seasonNum = showDetails.seasons[seasonIndex].season_number
  return await getEpisodeForShow(showId, seasonNum, episodeNum)
}

export async function getEpisodeForShow(
  showId: number,
  seasonNum: number,
  episodeNum: number
) {
  try {
    const { data } = (await http.get(
      `/tv/${showId}/season/${seasonNum}/episode/${episodeNum}`
    )) as Record<string, any>
    return {
      title: data.name,
      code: `Season ${data.season_number}, Episode ${data.episode_number}`,
    }
  } catch (err) {
    console.error(err)
    console.log(showId, seasonNum, episodeNum)
  }
}
