import data from './teams.json'

export default {
  fetchTeams: () => Promise.resolve({ body: data }),
}
