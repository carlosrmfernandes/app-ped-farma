/**
 * RemoveOrganizer: This method will fire a DELETE request and then
 * remove all organizers id
 */
async function RemoveLocation (ids = []) {
  this.isRequesting = true
  try {
    if (ids.length >= 1) {
      for (const id of ids) {
        await this.axios.delete(`/locations/${id}`)

        // Redirect to the Organizer views
        this.$router.go()
      }
    } else {
      // Redirect to the Organizer views
      await this.axios.delete(`/locations/${this.id}`)

      // Redirect to the Organizer views
      this.$router.go()
    }
  } catch (e) {
    this.hadError = 'Não foi possível efetuar esta operação.'
  }
  this.isRequesting = false
}

export { RemoveLocation }
