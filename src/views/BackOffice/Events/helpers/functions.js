async function getDecks () {
  try {
    const result = await this.axios.get(`/decks?currentOnly=false&sorters=CREATED_AT`)
    const res = result.data
    this.collection_decks = res.data
  } catch (e) {
    this.hadError = 'Não foi possível carregar as informações.'
  }
}

/*
 * getLocations: This method will fire a GET request and then
 * assign the response data into the state property: form
 */
async function getLocations () {
  try {
    const result = await this.axios.get(`/locations?bringAll=true`)
    return result.data
  } catch (e) {
    this.hadError = 'Não foi possível carregar as informações.'
  }
}

/*
 * getOrganizers: This method will fire a GET request and then
 * assign the response data into the state property: form
 */
async function getOrganizers () {
  try {
    const result = await this.axios.get(`/organizers?sorters=CREATED_AT`)
    const res = result.data
    this.organizers = res.data
  } catch (e) {
    this.hadError = 'Não foi possível carregar as informações.'
  }
}

async function getClassifications () {
  try {
    // this.axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.TOKEN}`;
    const result = await this.axios.get(`/party_events/classifications`)
    this.classifications = result
  } catch (e) {
    this.hadError = 'Não foi possível carregar as informações.'
  }
}

/*
 *  getSponsors: This method will fire a GET request and then
 * assign the response data into the state property: form.
 */
async function getSponsors () {
  try {
    const result = await this.axios.get(`/sponsors`)
    const res = result.data
    this.sponsors = res.data
  } catch (e) {
    this.hadError = 'Não foi possível carregar as informações.'
  }
}

export { getDecks, getLocations, getOrganizers, getClassifications, getSponsors }
