/**
 * removeOrganizer: This method will fire a DELETE request and then
 * remove all organizers id
 */
async function removeDeck (ids = []) {
  this.isRequesting = true
  try {
    if (ids.length >= 1) {
      for (const id of ids) {
        await this.axios.delete(`/decks/${id}`)

        // Redirect to the Organizer views
        this.$router.go()
      }
    } else {
      // Redirect to the Organizer views
      await this.axios.delete(`/decks/${this.id}`)

      // Redirect to the Organizer views
      this.$router.go()
    }
  } catch (e) {
    this.hadError = 'Não foi possível efetuar esta operação.'
  }
  this.isRequesting = false
}

/**
 * GetDecks: This method will fire a GET request and then
 * assign the response data into the state property: form
 */
async function getAllDecks () {
  this.isRequesting = true
  let query = 'pageNumber=' + 100

  try {
    const result = await this.axios.get(`/decks?${query}`)
    const res = result.data
    this.decks = res.data
  } catch (e) {
    this.hadError = 'Não foi possível carregar as informações.'
  }
  this.isRequesting = false
}

function removeSettings (index) {
  this.settings.splice(index, 1)
}

function addNewSettings () {
  this.settings.push({ status: '', deck_ids: {} })
}

export { removeDeck, removeSettings, addNewSettings, getAllDecks }
