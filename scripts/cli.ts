import inquirer from 'inquirer'

import { searchShows } from '../src/lib/tmdb'

async function promptForShowNameAndGetId() {
  const { showNameQuery } = await inquirer.prompt([
    {
      name: 'showNameQuery',
      type: 'input',
      message: 'Search for a TV show',
      validate: function (value) {
        if (value.length) {
          return true
        } else {
          return 'Search for a TV show'
        }
      },
    },
  ])

  const shows = await searchShows(showNameQuery)
  const choices = shows.reduce(
    (
      choices: Record<string, Record<string, any>>,
      show: Record<string, any>
    ) => ({
      ...choices,
      [show.name]: show,
    }),
    {}
  )

  const { showSelection } = await inquirer.prompt([
    {
      name: 'showSelection',
      type: 'list',
      message: 'Select from the results',
      choices: Object.keys(choices),
    },
  ])

  return choices[showSelection].id
}
